import { useContext, useEffect, useState, useCallback } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/Dialog";
import { Badge } from "./ui/Badge";
import {
  Search,
  StickyNote,
  Pin,
  Clock,
  Loader2,
  Inbox,
  Tag,
  Palette,
  Flag,
} from "lucide-react";

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

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, searchNotes, loading, stats } = context;
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
    ecolor: "default",
    epriority: "low",
  });

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      getNotes();
    } else {
      navigate("/signin");
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults(null);
      return;
    }

    const timeout = setTimeout(async () => {
      setSearchLoading(true);
      const results = await searchNotes(searchQuery);
      setSearchResults(results);
      setSearchLoading(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const displayNotes = searchResults !== null ? searchResults : notes;

  const updateNote = (currentNote) => {
    setModalOpen(true);
    setEditData({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
      ecolor: currentNote.color || "default",
      epriority: currentNote.priority || "low",
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (editData.etitle.trim().length < 1) {
      return toast.error("Title is required");
    }
    if (editData.edescription.trim().length < 1) {
      return toast.error("Description is required");
    }

    const success = await editNote(
      editData.id,
      editData.etitle,
      editData.edescription,
      editData.etag,
      editData.ecolor,
      editData.epriority,
    );

    if (success) {
      toast.success("Note updated!");
      setModalOpen(false);
    }
  };

  const onEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <StickyNote className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Total Notes</p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Pin className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.pinned}</p>
            <p className="text-xs text-muted-foreground">Pinned</p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {notes.length > 0
                ? new Date(notes[0]?.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "—"}
            </p>
            <p className="text-xs text-muted-foreground">Latest</p>
          </div>
        </div>
      </motion.div>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8"
      >
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search notes by title, content, or tag…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 rounded-xl bg-secondary/50 border border-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 backdrop-blur-sm"
            id="notes-search"
          />
          {searchLoading && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
          )}
        </div>
        {searchResults !== null && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {searchResults.length} result
              {searchResults.length !== 1 ? "s" : ""} for &quot;{searchQuery}
              &quot;
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                setSearchResults(null);
              }}
              className="text-xs text-primary hover:underline"
            >
              Clear
            </button>
          </div>
        )}
      </motion.div>

      {/* Add Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <AddNote />
      </motion.div>

      {/* Notes heading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-primary" />
          {searchResults !== null ? "Search Results" : "Your Notes"}
        </h2>
      </motion.div>

      {/* Loading */}
      {loading && !searchResults && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {/* Empty state */}
      {!loading && displayNotes.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-secondary/60 flex items-center justify-center mb-6">
            <Inbox className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {searchResults !== null ? "No notes found" : "No notes yet"}
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            {searchResults !== null
              ? "Try a different search term"
              : "Create your first note by clicking the button above. Your ideas deserve a beautiful home."}
          </p>
        </motion.div>
      )}

      {/* Notes grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        <AnimatePresence>
          {displayNotes.map((note) => (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
            <DialogDescription>
              Update your note details below
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Title
              </label>
              <Input
                name="etitle"
                value={editData.etitle}
                onChange={onEditChange}
                placeholder="Note title"
                id="edit-note-title"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Description
              </label>
              <Textarea
                name="edescription"
                value={editData.edescription}
                onChange={onEditChange}
                placeholder="Note content"
                rows={4}
                id="edit-note-description"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Tag
              </label>
              <div className="relative">
                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  name="etag"
                  value={editData.etag}
                  onChange={onEditChange}
                  placeholder="Tag"
                  className="pl-10"
                  id="edit-note-tag"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* Color */}
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-muted-foreground" />
                <div className="flex gap-1.5">
                  {NOTE_COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() =>
                        setEditData({ ...editData, ecolor: c.value })
                      }
                      className={`w-6 h-6 rounded-full ${c.bg} transition-all duration-200 ${
                        editData.ecolor === c.value
                          ? `ring-2 ${c.ring} ring-offset-2 ring-offset-background scale-110`
                          : "hover:scale-110 opacity-60 hover:opacity-100"
                      }`}
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
                      onClick={() =>
                        setEditData({ ...editData, epriority: p.value })
                      }
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                        editData.epriority === p.value
                          ? `${p.color} bg-secondary`
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="glow" id="edit-note-submit">
                Update Note
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notes;
