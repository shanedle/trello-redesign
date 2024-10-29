import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "./card";

interface Props {
  id: string;
  columnId: string;
  card: {
    name: string;
  };
  onEdit: (name: string) => void;
  onRemove: () => void;
}

const SortableCard = ({ id, columnId, card, onEdit, onRemove }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      columnId,
    } as const,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`group relative cursor-grab rounded-lg border bg-white p-3 px-4 shadow-sm transition-all duration-200
        ${
          isDragging
            ? "rotate-3 scale-105 shadow-xl ring-2 ring-blue-400 ring-offset-2"
            : "hover:shadow-md hover:ring-1 hover:ring-blue-200"
        }`}
    >
      {/* Add a visual handle */}
      <div className="absolute -left-0.5 top-0 bottom-0 w-1.5 rounded-l-lg bg-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />

      <Card card={card} update={onEdit} remove={onRemove} />

      {/* Drag indicator */}
      <div className="absolute right-2 top-2 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
        <i className="bi bi-grip-vertical"></i>
      </div>
    </div>
  );
};

export default SortableCard;
