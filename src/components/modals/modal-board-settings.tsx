import { FormEvent, useReducer } from "react";

import Modal from "./modal";

import useBoardStore from "@/lib/store";
import { Board } from "@/types/interfaces";

interface BoardSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BoardSettingsForm {
  name: string;
  description: string;
  public: boolean;
}

type BoardSettingsAction = Partial<BoardSettingsForm>;

const defaultFormState: BoardSettingsForm = {
  name: "",
  description: "",
  public: false,
};

const BoardSettingsModal = ({ isOpen, onClose }: BoardSettingsModalProps) => {
  const { board, updateBoard } = useBoardStore();

  const initialState: BoardSettingsForm = board
    ? {
        name: board.name,
        description: board.description,
        public: board.public,
      }
    : defaultFormState;

  const [draft, setDraft] = useReducer(
    (state: BoardSettingsForm, action: BoardSettingsAction) => ({
      ...state,
      ...action,
    }),
    initialState
  );

  const handleSave = (event: FormEvent) => {
    event.preventDefault();

    const updatePayload: Partial<Board> = {
      name: draft.name,
      description: draft.description,
      public: draft.public,
    };

    updateBoard(updatePayload);
    onClose();
  };

  if (!board) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-md rounded-lg bg-white px-8 py-4 shadow-md md:max-w-lg">
        <header className="mb-5 flex w-full items-center justify-between">
          <h2 className="text-xl font-medium">Board Settings</h2>
          <button
            onClick={onClose}
            className="bi bi-x-lg hover:opacity-70"
            aria-label="Close modal"
          />
        </header>

        <form onSubmit={handleSave} className="flex flex-col gap-5 p-3">
          <div className="board-settings-form">
            <label htmlFor="boardName">Rename board</label>
            <input
              id="boardName"
              type="text"
              maxLength={15}
              value={draft.name}
              onChange={(e) => setDraft({ name: e.target.value })}
              className="board-settings-form-input"
              placeholder="Board name"
            />
          </div>

          <div className="board-settings-form">
            <label htmlFor="boardDescription">Description</label>
            <input
              id="boardDescription"
              type="text"
              maxLength={30}
              value={draft.description}
              onChange={(e) => setDraft({ description: e.target.value })}
              className="board-settings-form-input"
              placeholder="Board description"
            />
          </div>

          <button
            type="button"
            onClick={() => setDraft({ public: !draft.public })}
            className="mt-4 flex gap-2 items-center"
          >
            Security:{" "}
            <span className="font-semibold">
              {draft.public ? "Public" : "Private"}
            </span>
            <i className={`bi bi-${draft.public ? "unlock" : "lock"}`} />
          </button>

          <div className="flex w-full items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn border-2 border-black bg-white text-black hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn border-2 border-primary-600 bg-primary-600 text-white hover:border-primary-700 hover:bg-primary-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BoardSettingsModal;
