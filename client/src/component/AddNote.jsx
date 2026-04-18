import { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { Plus, X, Tag, Palette, Flag, Send } from "lucide-react";

const NOTE_COLORS = [
  { value: "default", bg: "bg-card", ring: "ring-border" },
  { value: "red", bg: "bg-red-500", ring: "ring-red-500" },
  { value: "orange", bg: "bg-orange-500", ring: "ring-orange-500" },
  { value: "yellow", bg: "bg-yellow-500", ring: "ring-yellow-500" },
  { value: "green", bg: "bg-green-500", ring: "ring-green-500" },
  { value: "blue", bg: "bg-blue-500", ring: "ring-blue-500" },
  { value: "purple", bg: "bg-purple-500", ring: "ring-purple-500" },
];

const PRIORITIES = [
  { value: "low", label: "Low", color: "text-emerald-400" },
  { value: "medium", label: "Medium", color: "text-amber-400" },
  { value: "high", label: "High", color: "text-red-400" },
];

const AddNote = () => {
  const { addNote } = useContext(noteContext);
  const [expanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
    color: "default",
    priority: "low",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (note.title.trim().length < 1) {
      return toast.error("Title is required");
    }
    if (note.description.trim().length < 1) {
      return toast.error("Description is required");
    }

    setLoading(true);
    const success = await addNote(
      note.title,
      note.description,
      note.tag || "General",
      note.color,
      note.priority
    );

    if (success) {
      setNote({ title: "", description: "", tag: "", color: "default", priority: "low" });
      setExpanded(false);
      toast.success("Note created!");
    }
    setLoading(false);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-8">
      <AnimatePresence>
        {!expanded ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setExpanded(true)}
              className="w-full glass rounded-2xl p-4 flex items-center gap-3 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300 group"
              id="add-note-expand"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Plus className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium">Create a new note...</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass-strong rounded-2xl p-6 shadow-xl shadow-black/10">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold">New Note</h3>
                <button
                  onClick={() => setExpanded(false)}
                  className="p-1.5 rounded-lg hover:bg-secondary/60 transition-colors text-muted-foreground hover:text-foreground"
                  id="add-note-collapse"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="title"
                    type="text"
                    placeholder="Note title"
                    value={note.title}
                    onChange={onChange}
                    id="add-note-title"
                    className="text-base font-medium"
                  />
                </div>

                <div>
                  <Textarea
                    name="description"
                    placeholder="Write your thoughts..."
                    value={note.description}
                    onChange={onChange}
                    id="add-note-description"
                    rows={4}
                  />
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-muted-foreground">
                      {note.description.length}/5000
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {/* Tag */}
                  <div className="flex items-center gap-2 flex-1 min-w-[150px]">
                    <Tag className="w-4 h-4 text-muted-foreground shrink-0" />
                    <Input
                      name="tag"
                      type="text"
                      placeholder="Tag (e.g. Work, Ideas)"
                      value={note.tag}
                      onChange={onChange}
                      id="add-note-tag"
                      className="h-9 text-xs"
                    />
                  </div>

                  {/* Color picker */}
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-muted-foreground" />
                    <div className="flex gap-1.5">
                      {NOTE_COLORS.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setNote({ ...note, color: c.value })}
                          className={`w-6 h-6 rounded-full ${c.bg} transition-all duration-200 ${
                            note.color === c.value
                              ? `ring-2 ${c.ring} ring-offset-2 ring-offset-background scale-110`
                              : "hover:scale-110 opacity-60 hover:opacity-100"
                          }`}
                          id={`add-note-color-${c.value}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Priority */}
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-muted-foreground" />
                    <div className="flex gap-1">
                      {PRIORITIES.map((p) => (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() => setNote({ ...note, priority: p.value })}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                            note.priority === p.value
                              ? `${p.color} bg-secondary`
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                          }`}
                          id={`add-note-priority-${p.value}`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    variant="glow"
                    loading={loading}
                    id="add-note-submit"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddNote;
