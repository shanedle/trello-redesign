import { useState } from "react";

interface Props {
  card: {
    name: string;
  };
  update: (name: string) => void;
  remove: () => void;
}

const Card = ({ card, update, remove }: Props) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(card.name);
  const [showIcons, setShowIcons] = useState(false);

  return (
    <div
      className="group/card flex w-full items-center justify-between"
      onMouseEnter={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
    >
      <div className="flex w-full items-center justify-start gap-2">
        {edit ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border-blue-200 bg-blue-50 px-2 py-1 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
            autoFocus
          />
        ) : (
          <p className="text-gray-700" style={{ wordBreak: "break-word" }}>
            {card.name}
          </p>
        )}
      </div>
      <div className="flex items-center justify-end gap-2 ml-2">
        {edit ? (
          <>
            <button
              onClick={() => {
                update(name);
                setEdit(false);
              }}
              className="rounded-md p-1 text-green-500 hover:bg-green-50"
            >
              <i className="bi bi-check-lg text-lg"></i>
            </button>
            <button
              onClick={() => {
                setEdit(false);
                setName(card.name);
              }}
              className="rounded-md p-1 text-red-500 hover:bg-red-50"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </>
        ) : (
          <div
            className={`flex gap-1 transition-opacity duration-200 ${showIcons ? "opacity-100" : "opacity-0"}`}
          >
            <button
              onClick={() => setEdit(true)}
              className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-yellow-500"
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button
              onClick={remove}
              className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
