import NoteContext from "./NoteContext";
import { useState, useCallback } from "react";

const NoteState = (props) => {
  const host = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get current user details
  const getUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return null;
    }
    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const json = await response.json();
      if (json.success && json.user) {
        setUser(json.user);
        return json.user;
      } else {
        setUser(null);
        return null;
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setUser(null);
      return null;
    }
  }, [host]);

  // Get all notes (with optional search term)
  const getNotes = useCallback(async (searchQuery = "") => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const url = searchQuery
        ? `${host}/api/notes/fetchallnotes?search=${encodeURIComponent(searchQuery)}`
        : `${host}/api/notes/fetchallnotes`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      const json = await response.json();
      if (json.success && Array.isArray(json.notes)) {
        setNotes(json.notes);
      } else if (Array.isArray(json)) {
        // Fallback for older backend format
        setNotes(json);
      } else {
        setNotes([]);
      }
    } catch (err) {
      console.error("Failed to fetch notes:", err);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, [host]);

  // Add a note
  const addNote = async (title, description, tag) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, error: "Please log in first" };
    }

    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag: tag || "General" }),
      });

      const json = await response.json();
      if (json.success && json.note) {
        setNotes((prevNotes) => [json.note, ...prevNotes]);
        return { success: true, note: json.note };
      } else {
        return { success: false, error: json.error || "Failed to add note" };
      }
    } catch (err) {
      console.error("Error adding note:", err);
      return { success: false, error: "Network error while adding note" };
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, error: "Please log in first" };
    }

    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      const json = await response.json();
      if (json.success) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        return { success: true };
      } else {
        return { success: false, error: json.error || "Failed to delete note" };
      }
    } catch (err) {
      console.error("Error deleting note:", err);
      return { success: false, error: "Network error while deleting note" };
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, error: "Please log in first" };
    }

    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      if (json.success && json.note) {
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note._id === id ? json.note : note))
        );
        return { success: true, note: json.note };
      } else {
        return { success: false, error: json.error || "Failed to update note" };
      }
    } catch (err) {
      console.error("Error updating note:", err);
      return { success: false, error: "Network error while updating note" };
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        user,
        loading,
        getUser,
        getNotes,
        addNote,
        deleteNote,
        editNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
