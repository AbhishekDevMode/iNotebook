import Noteitem from "./NoteItem";
import Addnote from "./Addnote";
import noteContext from "../context/NoteContext";
import { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, loading, getNotes, editNote, getUser } = context;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
      getUser();
    } else {
      navigate("/login");
    }
  }, [getNotes, getUser, navigate]);

  // Edit Note Form State
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag || "General",
    });
    setIsEditing(true);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (note.etitle.trim().length < 3) {
      props.showAlert("Title must be at least 3 characters", "danger");
      return;
    }
    if (note.edescription.trim().length < 5) {
      props.showAlert("Description must be at least 5 characters", "danger");
      return;
    }

    setIsUpdating(true);
    const res = await editNote(note.id, note.etitle.trim(), note.edescription.trim(), note.etag.trim());
    setIsUpdating(false);

    if (res.success) {
      setIsEditing(false);
      props.showAlert("Note updated successfully!", "success");
    } else {
      props.showAlert(res.error || "Failed to update note", "danger");
    }
  };

  // Derive unique tags from notes
  const availableTags = useMemo(() => {
    const tags = new Set();
    notes.forEach((n) => {
      if (n.tag && n.tag.trim()) {
        tags.add(n.tag.trim());
      }
    });
    return Array.from(tags);
  }, [notes]);

  // Filter notes by search term and selected tag
  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      const matchesSearch =
        searchTerm.trim() === "" ||
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (n.tag && n.tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTag =
        selectedTag === "all" ||
        (n.tag && n.tag.toLowerCase() === selectedTag.toLowerCase());

      return matchesSearch && matchesTag;
    });
  }, [notes, searchTerm, selectedTag]);

  return (
    <div className="pb-16">
      <Addnote showAlert={props.showAlert} />

      {/* Edit Note Modal */}
      {isEditing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/35 p-4 backdrop-blur-xs"
          onClick={() => setIsEditing(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-note-title"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200/90 bg-white p-6 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-md bg-emerald-100 text-emerald-800">
                  <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h2
                  id="edit-note-title"
                  className="text-xl font-bold text-slate-900"
                >
                  Edit Note
                </h2>
              </div>
              <button
                type="button"
                className="inline-flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                aria-label="Close edit dialog"
                onClick={() => setIsEditing(false)}
              >
                <span aria-hidden="true" className="text-xl font-bold leading-none">
                  &times;
                </span>
              </button>
            </div>

            <form onSubmit={handleClick} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="etitle"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Title <span className="text-xs font-normal text-slate-400">(min. 3 characters)</span>
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                  id="etitle"
                  name="etitle"
                  value={note.etitle}
                  onChange={onChange}
                  required
                  minLength={3}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="edescription"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Description <span className="text-xs font-normal text-slate-400">(min. 5 characters)</span>
                </label>
                <textarea
                  rows={4}
                  className="block w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 resize-y"
                  id="edescription"
                  name="edescription"
                  value={note.edescription}
                  onChange={onChange}
                  required
                  minLength={5}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="etag"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Tag / Category
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                  id="etag"
                  name="etag"
                  value={note.etag}
                  onChange={onChange}
                />
              </div>

              <div className="flex justify-end gap-2.5 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    isUpdating ||
                    note.etitle.trim().length < 3 ||
                    note.edescription.trim().length < 5
                  }
                  className="rounded-xl bg-emerald-700 px-5 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* Notes Display Section */}
      <section className="mx-auto my-8 w-full max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Your Notes
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              {notes.length} {notes.length === 1 ? "note" : "notes"} in total
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by title, text, or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-8 text-sm text-slate-900 shadow-xs outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            />
            <svg
              className="absolute left-3 top-2.5 size-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tag filters if multiple tags exist */}
        {availableTags.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Filter:
            </span>
            <button
              type="button"
              onClick={() => setSelectedTag("all")}
              className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                selectedTag === "all"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              All
            </button>
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                  selectedTag.toLowerCase() === tag.toLowerCase()
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Notes Grid */}
        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <div className="inline-block size-8 animate-spin rounded-full border-3 border-solid border-emerald-600 border-r-transparent"></div>
            <p className="mt-3 text-sm font-medium text-slate-600">Loading your notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-12 text-center shadow-xs">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <h3 className="mt-3 text-base font-semibold text-slate-800">
              No notes yet
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Create your first note above to get started!
            </p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-xs">
            <p className="text-slate-600 font-medium">
              No notes match "{searchTerm}" {selectedTag !== "all" && `with tag "${selectedTag}"`}.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedTag("all");
              }}
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline"
            >
              Clear search & filters
            </button>
          </div>
        ) : (
          <div className="-mx-2.5 flex flex-wrap">
            {filteredNotes.map((n) => (
              <Noteitem
                key={n._id}
                note={n}
                updateNote={updateNote}
                showAlert={props.showAlert}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Notes;
