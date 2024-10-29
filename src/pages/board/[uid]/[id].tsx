import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableCard from "@/components/card/sortable-card";
import CardBuilder from "@/components/card-builder/card-builder";
import Navbar from "@/components/navbars/navbar-boards";

import { useAuth } from "@/lib/use-auth";
import useBoardStore from "@/lib/store";

const DroppableColumn = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: {
      columnId: id,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-[50px] flex-col gap-3 rounded-lg p-2 transition-colors duration-200
        ${isOver ? "bg-blue-50 ring-2 ring-blue-200 ring-inset" : ""}`}
    >
      {children}
      {/* Visual indicator for empty columns */}
      {Array.isArray(children) && children.length === 0 && isOver && (
        <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-blue-200 bg-blue-50">
          <div className="flex items-center gap-2 text-blue-500">
            <i className="bi bi-plus-circle"></i>
            <p className="text-sm">Drop card here</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Board = () => {
  const { user } = useAuth();
  const router = useRouter();
  const board = useBoardStore();
  const { uid, id } = router.query;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    if (router.isReady && !board.isLoading) {
      board.initializeBoard(uid as string, id as string, user?.uid || "");
    }
  }, [router.isReady, uid, id, user?.uid]); // Remove board from dependencies

  useEffect(() => {
    const status = board.status;
    if (status > 200) {
      router.push(`/${status}`);
    }
    return () => {
      if (status > 200) {
        board.setStatus(0);
      }
    };
  }, [board.status, router]);

  if (board.status === 200)
    return (
      <main className="flex min-h-screen flex-col">
        <Navbar />
        <div className="container mx-auto flex flex-wrap items-start justify-center gap-5 p-5 py-10 sm:flex-nowrap">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={board.DragAndDrop}
          >
            {board.order.map((columnID: string) => {
              const column = board.columns[columnID];
              if (!column) return null;

              return (
                <div
                  key={columnID}
                  className="flex w-full shrink-0 flex-col gap-3 rounded-xl bg-white p-3 shadow-md transition duration-300 hover:shadow-lg sm:w-1/3"
                >
                  <header className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-semibold text-gray-700">
                        {column.name}
                      </h1>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-sm text-gray-500">
                        {column.cards.length}
                      </span>
                    </div>
                    <button
                      onClick={() => board.deleteAllColumnCards(columnID)}
                      className={`rounded-md bg-white px-3 py-1.5 text-sm text-gray-500 transition-all hover:bg-red-50 hover:text-red-500 
                        ${column.cards.length > 2 ? "opacity-100" : "opacity-0"}`}
                    >
                      <i className="bi bi-trash me-1"></i>
                      Clear all
                    </button>
                  </header>

                  <SortableContext
                    items={column.cards}
                    strategy={verticalListSortingStrategy}
                  >
                    <DroppableColumn id={columnID}>
                      {column.cards.map((cardId: string) => {
                        const card = board.cards[cardId];
                        if (!card) return null;

                        return (
                          <SortableCard
                            key={cardId}
                            id={cardId}
                            columnId={columnID}
                            card={card}
                            onEdit={(name) => board.editCard(cardId, name)}
                            onRemove={() => board.deleteCard(columnID, cardId)}
                          />
                        );
                      })}
                    </DroppableColumn>
                  </SortableContext>

                  <CardBuilder columnID={columnID} />
                </div>
              );
            })}

            <DragOverlay>{/* Custom drag preview styling */}</DragOverlay>
          </DndContext>
        </div>
      </main>
    );

  return null;
};

export default Board;
