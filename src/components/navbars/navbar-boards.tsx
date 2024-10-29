import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import ModalBoardSettings from "@/components/modals/modal-board-settings";
import DeleteBoardModal from "@/components/modals/modal-delete-board";
import useBoardStore from "@/lib/store";
import { useAuth } from "@/lib/use-auth";

type ModalType = "" | "settings" | "delete";

export default function BoardNavbar() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("");

  const board = useBoardStore(useCallback((state) => state.board, []));
  const ownerID = useBoardStore(useCallback((state) => state.ownerID, []));

  if (!board) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType("");

  return (
    <div className="w-full bg-white">
      <nav className="container mx-auto flex items-center justify-between p-2 py-5 text-lg sm:p-5">
        <section className="flex items-center gap-4 sm:gap-8">
          {user && (
            <Link
              href="/board"
              className="hover:text-blue-600 transition-colors"
            >
              <span
                aria-label="Go back"
                className="bi bi-chevron-left cursor-pointer"
              />
            </Link>
          )}
          <h1 className="truncate text-2xl font-medium">{board.name}</h1>
          <div className="hidden gap-1 rounded-full bg-primary-500 px-4 py-1 text-sm text-white sm:flex">
            <i
              className={`bi bi-${board.public ? "unlock" : "lock"}`}
              aria-hidden="true"
            />
            <span>{board.public ? "Public" : "Private"}</span>
          </div>
        </section>

        <ModalBoardSettings
          isOpen={modalType === "settings"}
          onClose={closeModal}
        />
        <DeleteBoardModal
          isOpen={modalType === "delete"}
          onClose={closeModal}
        />

        {user && (
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="bi bi-gear text-2xl hover:text-blue-600 transition-colors"
              aria-label="Open settings menu"
              aria-expanded={menuOpen}
              aria-haspopup="true"
              type="button"
            />
            {menuOpen && (
              <div
                className="absolute right-0 top-8 flex flex-col items-start gap-1 whitespace-nowrap rounded-b-lg bg-white p-3 text-base shadow-md"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="w-full" role="menuitem">
                  <button
                    onClick={() => openModal("settings")}
                    className="bi bi-pen board-menu-btn w-full text-left"
                    type="button"
                    disabled={user.uid !== ownerID}
                  >
                    Board Settings
                  </button>
                </div>
                <div className="w-full" role="menuitem">
                  <button
                    onClick={() => openModal("delete")}
                    className="bi bi-trash3 board-menu-btn w-full text-left hover:text-red-400"
                    type="button"
                    disabled={user.uid !== ownerID}
                  >
                    Delete This Board
                  </button>
                </div>
                <div className="w-full" role="menuitem">
                  <button
                    onClick={handleSignOut}
                    className="bi bi-box-arrow-right board-menu-btn w-full text-left"
                    type="button"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
