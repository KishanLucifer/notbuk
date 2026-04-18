import NoteContext from "./noteContext";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";

const NoteState = ({ children }) => {
  const baseDomain = import.meta.env.VITE_SERVER_DOMAIN || "http://localhost:3000";
  const host = baseDomain.endsWith("/api/v1") ? baseDomain : `${baseDomain}/api/v1`;
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, pinned: 0 });

  const getToken = () => localStorage.getItem("access_token");

  const headers = () => ({
    "Content-Type": "application/json",
    access_token: getToken(),
  });

  // 1. Get all Notes
  const getNotes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/notes?limit=100`, {
        method: "GET",
        headers: headers(),
      });
      const json = await response.json();
      if (json.success && Array.isArray(json.notes)) {
        setNotes(json.notes);
        setStats({
          total: json.pagination?.total || json.notes.length,
          pinned: json.notes.filter((n) => n.isPinned).length,
        });
      } else {
        console.error("Failed to fetch notes:", json);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  }, [host]);

  // 2. Add a Note
  const addNote = async (
    title,
    description,
    tag,
    color = "default",
    priority = "low",
  ) => {
    try {
      const response = await fetch(`${host}/notes`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ title, description, tag, color, priority }),
      });
      const json = await response.json();
      if (json.success && json.note) {
        setNotes((prev) => [json.note, ...prev]);
        setStats((prev) => ({ ...prev, total: prev.total + 1 }));
        return true;
      } else {
        toast.error(json.error || "Failed to add note");
        return false;
      }
    } catch (error) {
      console.error("Failed to add note:", error);
      toast.error("Failed to add note");
      return false;
    }
  };

  // 3. Delete a Note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/notes/${id}`, {
        method: "DELETE",
        headers: headers(),
      });
      const json = await response.json();
      if (json.success) {
        setNotes((prev) => prev.filter((note) => note._id !== id));
        setStats((prev) => ({ ...prev, total: prev.total - 1 }));
        return true;
      } else {
        toast.error(json.error || "Failed to delete note");
        return false;
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
      toast.error("Failed to delete note");
      return false;
    }
  };

  // 4. Edit a Note
  const editNote = async (id, title, description, tag, color, priority) => {
    try {
      const response = await fetch(`${host}/notes/${id}`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify({ title, description, tag, color, priority }),
      });
      const json = await response.json();
      if (json.success && json.note) {
        setNotes((prev) =>
          prev.map((note) => (note._id === id ? json.note : note)),
        );
        return true;
      } else {
        toast.error(json.error || "Failed to update note");
        return false;
      }
    } catch (error) {
      console.error("Failed to edit note:", error);
      toast.error("Failed to update note");
      return false;
    }
  };

  // 5. Toggle Pin
  const togglePin = async (id) => {
    try {
      const response = await fetch(`${host}/notes/${id}/pin`, {
        method: "PATCH",
        headers: headers(),
      });
      const json = await response.json();
      if (json.success && json.note) {
        setNotes((prev) =>
          prev.map((note) => (note._id === id ? json.note : note)),
        );
        setStats((prev) => ({
          ...prev,
          pinned: json.note.isPinned ? prev.pinned + 1 : prev.pinned - 1,
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to toggle pin:", error);
      toast.error("Failed to pin note");
      return false;
    }
  };

  // 6. Search Notes
  const searchNotes = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${host}/notes/search?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: headers(),
        },
      );
      const json = await response.json();
      if (json.success && Array.isArray(json.notes)) {
        return json.notes;
      }
      return [];
    } catch (error) {
      console.error("Search failed:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        stats,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        togglePin,
        searchNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
