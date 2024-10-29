import { useRouter } from "next/router";

import Modal from "./modal";

import useBoardStore from "@/lib/store";

interface DeleteBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteBoardModal = ({ isOpen, onClose }: DeleteBoardModalProps) => {
  const deleteBoard = useBoardStore((state) => state.deleteBoard);
  const router = useRouter();

  const handleDelete = async () => {
    await deleteBoard();
    router.push("/board");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-md space-y-5 rounded-lg bg-white p-6 shadow-md md:max-w-lg">
        <header className="flex w-full items-center justify-between">
          <h2 className="text-xl font-medium">
            Are you sure you want to delete this board?
          </h2>
          <button
            onClick={onClose}
            className="bi bi-x-lg hover:opacity-70"
            aria-label="Close modal"
          />
        </header>

        <p className="text-justify text-base md:text-lg">
          This action is irreversible, and all associated data will be
          permanently removed.
        </p>

        <div className="flex w-full items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn border-2 border-black bg-white text-black hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="btn border-2 border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBoardModal;
