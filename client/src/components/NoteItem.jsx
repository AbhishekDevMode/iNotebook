import noteContext from "../context/NoteContext";
import { useContext, useState } from "react";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  const [copied, setCopied] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const formattedDate = note.date
    ? new Date(note.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${note.title}\n\n${note.description}`);
      setCopied(true);
      props.showAlert("Note copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      props.showAlert("Failed to copy note", "danger");
    }
  };

  const handleDelete = async () => {
    const res = await deleteNote(note._id);
    if (res.success) {
      props.showAlert("Note deleted successfully!", "success");
    } else {
      props.showAlert(res.error || "Failed to delete note", "danger");
    }
    setShowConfirmDelete(false);
  };

  return (
    <div className="w-full p-2.5 sm:w-1/2 lg:w-1/3">
      <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div>
          {/* Header: Tag & Date */}
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="inline-block rounded-full border border-emerald-200/70 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
              {note.tag || "General"}
            </span>
            {formattedDate && (
              <span className="text-xs font-medium text-slate-400">
                {formattedDate}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="mb-2 text-lg font-bold text-slate-900 break-words leading-snug">
            {note.title}
          </h3>

          {/* Description */}
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600 break-words">
            {note.description}
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            title="Copy note text"
          >
            <svg
              className="size-3.5 text-slate-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            {copied ? "Copied!" : "Copy"}
          </button>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="inline-flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              aria-label={`Edit ${note.title}`}
              title="Edit note"
              onClick={() => updateNote(note)}
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </button>

            <button
              type="button"
              className="inline-flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-700"
              aria-label={`Delete ${note.title}`}
              title="Delete note"
              onClick={() => setShowConfirmDelete(true)}
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>

        {/* Delete confirmation dialog */}
        {showConfirmDelete && (
          <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs">
            <p className="font-semibold text-rose-900">
              Are you sure you want to delete this note?
            </p>
            <div className="mt-2.5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowConfirmDelete(false)}
                className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-slate-700 font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg bg-rose-600 px-3 py-1 font-semibold text-white hover:bg-rose-700 shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteItem;
