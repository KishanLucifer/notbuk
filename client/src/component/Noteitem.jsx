import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { SpotlightCard } from "../components/aceternity/SpotlightCard";
import { Badge } from "../components/ui/Badge";
import { Pin, PinOff, Pencil, Trash2, Calendar } from "lucide-react";

const COLOR_MAP = {
  default: "border-l-border",
  red: "border-l-note-red",
  orange: "border-l-note-orange",
  yellow: "border-l-note-yellow",
  green: "border-l-note-green",
  blue: "border-l-note-blue",
  purple: "border-l-note-purple",
};

const PRIORITY_BADGE = {
  low: { variant: "success", label: "Low" },
  medium: { variant: "warning", label: "Medium" },
  high: { variant: "destructive", label: "High" },
};

const Noteitem = ({ note, updateNote }) => {
  const { deleteNote, togglePin } = useContext(noteContext);
  const tags = note.tag ? note.tag.split(/[\s,]+/).filter(Boolean) : [];
  const colorClass = COLOR_MAP[note.color] || COLOR_MAP.default;
  const priority = PRIORITY_BADGE[note.priority] || PRIORITY_BADGE.low;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const handleDelete = () => {
    toast.info(
      <div>
        <p className="font-medium mb-2">Delete this note?</p>
        <div className="flex gap-2">
          <button
            className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors"
            onClick={() => {
              deleteNote(note._id);
              toast.dismiss();
              toast.success("Note deleted");
            }}
          >
            Delete
          </button>
          <button
            className="px-3 py-1.5 bg-secondary text-foreground rounded-lg text-xs font-medium hover:bg-secondary/80 transition-colors"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false, draggable: false }
    );
  };

  const handlePin = () => {
    togglePin(note._id);
    toast.success(note.isPinned ? "Note unpinned" : "Note pinned");
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <SpotlightCard
        className={`h-full border-l-4 ${colorClass} group`}
        spotlightColor={
          note.color === "default"
            ? "hsl(263 70% 58% / 0.08)"
            : undefined
        }
      >
        <div className="p-5 flex flex-col h-full min-h-[200px]">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-semibold text-foreground text-base leading-tight line-clamp-2 flex-1">
              {note.isPinned && (
                <Pin className="w-3.5 h-3.5 inline-block mr-1.5 text-primary -mt-0.5" />
              )}
              {note.title}
            </h3>
            <Badge variant={priority.variant} className="shrink-0 text-[10px]">
              {priority.label}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 flex-1 mb-4">
            {note.description}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/8 text-primary/70 text-[11px] font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border/30">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {formatDate(note.createdAt)}
            </div>

            {/* Action buttons — visible on hover */}
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handlePin}
                className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                title={note.isPinned ? "Unpin" : "Pin"}
                id={`note-pin-${note._id}`}
              >
                {note.isPinned ? (
                  <PinOff className="w-3.5 h-3.5" />
                ) : (
                  <Pin className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                onClick={() => updateNote(note)}
                className="p-1.5 rounded-lg hover:bg-blue-500/10 text-muted-foreground hover:text-blue-400 transition-colors"
                title="Edit"
                id={`note-edit-${note._id}`}
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors"
                title="Delete"
                id={`note-delete-${note._id}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default Noteitem;
