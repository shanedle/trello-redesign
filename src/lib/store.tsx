import { create } from "zustand";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  collection,
  DocumentReference,
  DocumentData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  Query,
  FieldValue,
} from "firebase/firestore";
import { uuidv4 as uuid } from "@firebase/util";

import { database } from "@/lib/firebase";
import { Cards, Columns, Builder, Board, Snapshot } from "@/types/interfaces";

type DragData = {
  columnId: string;
};

type State = {
  path: string;
  order: string[];
  cards: Cards;
  board: Board | null;
  columns: Columns;
  builder: Builder;
  status: number;
  ownerID: string;
  boardID: string;
  userID: string | null;
};

type Actions = {
  boardDocRef: (pathSegments?: string[]) => DocumentReference;
  boardCollectionRef: (pathSegments?: string[]) => Query<DocumentData>;
  updateBuilder: (payload: Partial<Builder>) => void;
  setStatus: (payload: number) => void;
  addCard: (column: string) => void;
  editCard: (id: string, name: string) => void;
  deleteCard: (columnID: string, ID: string) => void;
  deleteAllColumnCards: (columnID: string) => void;
  updateBoard: (payload: Partial<Board>) => void;
  deleteBoard: () => void;
  fetchBoard: () => Promise<void>;
  fetchCards: () => Promise<void>;
  fetchColumns: () => Promise<void>;
  initializeBoard: (ownerID: string, boardID: string, userID: string) => void;
  DragAndDrop: (event: DragEndEvent) => void;
};

type Store = State & Actions;

const useBoardStore = create<Store>((set, get) => ({
  path: "",
  order: [],
  cards: {},
  board: null,
  columns: {},
  builder: {},
  status: 0,
  ownerID: "",
  boardID: "",
  userID: null,

  boardDocRef: (pathSegments?: string[]) =>
    doc(database, get().path, ...(pathSegments?.length ? pathSegments : [])),

  boardCollectionRef: (pathSegments?: string[]) =>
    collection(
      database,
      get().path,
      ...(pathSegments?.length ? pathSegments : [])
    ),

  updateBuilder: (payload: Partial<Builder>) =>
    set((state) => {
      const newBuilder = { ...state.builder };
      Object.keys(payload).forEach((key) => {
        if (payload[key]) {
          newBuilder[key] = {
            state: payload[key]?.state ?? false,
            value: payload[key]?.value ?? "",
          };
        }
      });
      return { ...state, builder: newBuilder };
    }),

  setStatus: (payload: number) => set({ status: payload }),

  addCard: (column: string) => {
    if (!get().builder[column].value) return;
    const id = uuid();
    const card = { [id]: { name: get().builder[column].value } };
    const columnCards = [...get().columns[column].cards, id];

    set({ cards: { ...get().cards, ...card } });
    set({
      columns: {
        ...get().columns,
        [column]: { ...get().columns[column], cards: columnCards },
      },
    });
    updateDoc(get().boardDocRef(["columns", column]), {
      cards: columnCards as unknown as FieldValue[],
    });
    setDoc(get().boardDocRef(["cards", id]), card[id]);
    get().updateBuilder({ [column]: { state: false, value: "" } });
  },

  editCard: (id: string, name: string) => {
    set({
      cards: { ...get().cards, [id]: { ...get().cards[id], name: name } },
    });
    updateDoc(get().boardDocRef(["cards", id]), { name: name });
  },

  deleteCard: async (columnID: string, ID: string) => {
    const columnCards = get().columns[columnID].cards.filter(
      (card) => card !== ID
    );
    await deleteDoc(get().boardDocRef(["cards", ID]));
    await updateDoc(get().boardDocRef(["columns", columnID]), {
      cards: columnCards as unknown as FieldValue[],
    });

    set((state) => ({
      columns: {
        ...state.columns,
        [columnID]: {
          ...state.columns[columnID],
          cards: [...columnCards],
        },
      },
    }));
  },

  deleteAllColumnCards: async (columnID: string) => {
    const cards = { ...get().cards };
    const columnCards = [...get().columns[columnID].cards];
    await updateDoc(get().boardDocRef(["columns", columnID]), { cards: [] });
    columnCards.forEach((cardID) => {
      deleteDoc(get().boardDocRef(["cards", cardID]));
      delete cards[cardID];
    });
    set((state) => ({
      columns: {
        ...state.columns,
        [columnID]: {
          ...state.columns[columnID],
          cards: [],
        },
      },
      cards,
    }));
  },

  updateBoard: async (payload: Partial<Board>) => {
    if (get().userID !== get().ownerID) return;
    await updateDoc(get().boardDocRef(), payload);
    set({ board: { ...get().board, ...payload } as Board });
  },

  deleteBoard: async () => {
    if (get().userID !== get().ownerID) return;
    await deleteDoc(get().boardDocRef());
  },

  fetchBoard: async () => {
    const docSnap = await getDoc(get().boardDocRef());

    if (!docSnap.exists()) return set({ status: 404 });
    if (!docSnap.data().public && get().userID !== get().ownerID)
      return set({ status: 401 });

    set({
      order: docSnap.data().order,
      board: docSnap.data() as Board,
      status: 200,
    });
  },

  fetchColumns: async () => {
    const snapshot = await getDocs(get().boardCollectionRef(["columns"]));
    const snapColumns: Snapshot = {};
    const builder: Builder = {};

    snapshot.forEach((column) => {
      if (column.exists()) {
        snapColumns[column.id] = column.data();
        builder[column.id] = { state: false, value: "" };
      }
    });

    set({ columns: snapColumns as Columns, builder });
  },

  fetchCards: async () => {
    const snapshotCards = await getDocs(get().boardCollectionRef(["cards"]));
    const snapCards: Snapshot = {};

    snapshotCards.forEach((card) => {
      if (card.exists()) snapCards[card.id] = card.data();
    });

    set({ cards: snapCards as Cards });
  },

  initializeBoard: (ownerID: string, boardID: string, userID: string) => {
    if (!ownerID || !boardID) return set({ status: 404 });
    set({
      ownerID,
      boardID,
      userID,
      path: `users/${ownerID}/boards/${boardID}`,
    });
    get().fetchBoard();
    get().fetchCards();
    get().fetchColumns();
  },

  DragAndDrop: (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeData = active.data.current as DragData | undefined;
    const overData = over.data.current as DragData | undefined;

    // If over.id is the column id itself (empty column case)
    const overColumnId = overData?.columnId || (over.id as string);
    // Get the actual column id for the active item
    const activeColumnId = activeData?.columnId;

    if (!activeColumnId || !overColumnId) return;

    try {
      if (activeColumnId === overColumnId) {
        // Same column
        const column = get().columns[activeColumnId];
        const newCards = Array.from(column.cards);
        const oldIndex = newCards.indexOf(active.id as string);
        const newIndex =
          over.id === overColumnId
            ? newCards.length // If dropping on the column itself, move to end
            : newCards.indexOf(over.id as string);

        newCards.splice(oldIndex, 1);
        newCards.splice(newIndex, 0, active.id as string);

        const newColumn = {
          ...column,
          cards: newCards,
        };

        set((state) => ({
          columns: {
            ...state.columns,
            [activeColumnId]: newColumn,
          },
        }));

        updateDoc(get().boardDocRef(["columns", activeColumnId]), {
          cards: newCards as unknown as FieldValue[],
        });
      } else {
        // Different columns
        const sourceColumn = get().columns[activeColumnId];
        const destColumn = get().columns[overColumnId];
        const sourceCards = Array.from(sourceColumn.cards);
        const destCards = Array.from(destColumn.cards);

        const oldIndex = sourceCards.indexOf(active.id as string);

        // If dropping directly on the column, add to the end
        const newIndex =
          over.id === overColumnId
            ? destCards.length
            : destCards.indexOf(over.id as string);

        sourceCards.splice(oldIndex, 1);
        destCards.splice(
          newIndex >= 0 ? newIndex : destCards.length,
          0,
          active.id as string
        );

        set((state) => ({
          columns: {
            ...state.columns,
            [activeColumnId]: {
              ...sourceColumn,
              cards: sourceCards,
            },
            [overColumnId]: {
              ...destColumn,
              cards: destCards,
            },
          },
        }));

        updateDoc(get().boardDocRef(["columns", activeColumnId]), {
          cards: sourceCards as unknown as FieldValue[],
        });
        updateDoc(get().boardDocRef(["columns", overColumnId]), {
          cards: destCards as unknown as FieldValue[],
        });
      }
    } catch (error) {
      console.error("Error in DragAndDrop:", error);
    }
  },
}));

export default useBoardStore;
