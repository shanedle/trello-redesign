import { useEffect } from "react";
import { useRouter } from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Card from "@/components/card";
import CardBuilder from "@/components/card-builder";
import Navbar from "@/components/navbar/boards";

import { useAuth } from "@/lib/use-auth";
import useBoardStore from "@/lib/store";

import { Cards } from "@/types/interfaces";

const Board = () => {
  const { user } = useAuth();
  const router = useRouter();
  const board = useBoardStore();
  const { uid, id } = router.query;

  // Fetching data (once)
  useEffect(() => {
    if (router.isReady) {
      board.initializeBoard(uid as string, id as string, user?.uid || "");
    }
    return () => board.setStatus(0);
  }, [router]);

  useEffect(() => {
    if (board.status > 200) router.push("/" + board.status);
  }, [board.status]);

  if (board.status === 200)
    return (
      <main className="flex flex-col ">
        <Navbar />
        <div className="container mx-auto flex flex-wrap items-start justify-center gap-5 p-5 py-10 sm:flex-nowrap ">
          <DragDropContext onDragEnd={board.DragAndDrop}>
            {/* Columns map */}
            {board.order.map((columnID: string) => {
              const column = board.columns[columnID];
              if (column)
                return (
                  <Droppable droppableId={columnID} key={columnID}>
                    {(provided, snapshot) => (
                      <div className={`${snapshot.isDraggingOver ? "bg-slate-500/70" : "bg-white"} flex w-full shrink-0 flex-col gap-3 rounded-xl p-3 transition duration-300 sm:w-1/3`}>
                        <header className="flex items-center justify-between">
                          <h1 className="ml-1 text-2xl font-semibold">{column.name}</h1>
                          <button
                            onClick={() => board.deleteAllColumnCards(columnID)}
                            className={`rounded bg-white px-3 py-1 hover:bg-slate-300  ${column.cards.length > 2 ? "opacity-100" : "opacity-0"}`}
                          >
                            Clear all
                          </button>
                        </header>
                        <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-3">
                          {/* Cards map */}
                          {column.cards.map((id, index) => {
                            const card = board.cards[id as keyof Cards];
                            if (card)
                              return (
                                <Draggable key={id} draggableId={id} index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`${snapshot.isDragging ? "bg-slate-300" : "bg-white"} group flex items-center justify-between overflow-hidden rounded-xl p-3 px-4 hover:bg-slate-300`}
                                    >
                                      <Card card={card} update={(name) => board.editCard(id, name)} remove={() => board.deleteCard(columnID, id)} />
                                    </div>
                                  )}
                                </Draggable>
                              );
                          })}
                          {provided.placeholder}
                        </div>

                        {/* Add card button */}
                        <CardBuilder columnID={columnID} />
                      </div>
                    )}
                  </Droppable>
                );
            })}
          </DragDropContext>
        </div>
      </main>
    );
};

export default Board;
