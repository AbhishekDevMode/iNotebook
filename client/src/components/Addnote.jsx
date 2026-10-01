import noteContext from "../context/NoteContext";
import { useContext, useState } from "react";

const Addnote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "General",
  });
  const [adding, setAdding] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    
    if (note.title.trim().length < 3) {
      props.showAlert("Title must be at least 3 characters", "danger");
      return;
    }

    if (note.description.trim().length < 5) {
      props.showAlert("Description must be at least 5 characters", "danger");
      return;
    }

    setAdding(true);
    const res = await addNote(
      note.title.trim(),
      note.description.trim(),
      note.tag.trim(),
    );
    
    setAdding(false);

    if (res.success) {
      setNote({ title: "", description: "", tag: "General" });
      props.showAlert("Note added successfully!", "success");
    } else {
      props.showAlert(res.error || "Failed to add note", "danger");
    }
    
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-auto my-8 w-full max-w-3xl rounded-2xl border border-slate-200/90 bg-white p-6 text-left shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Create a Note
          </h2>
          <p className="text-sm text-slate-500">
            Jot down your thoughts, ideas, or to-dos.
          </p>
        </div>
      </div>

      <form onSubmit={handleClick} className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-slate-700"
          >
            Title <span className="text-xs font-normal text-slate-400">(min. 3 characters)</span>
          </label>
          <input
            type="text"
            className="block w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
            id="title"
            name="title"
            placeholder="e.g., Project meeting key takeaways"
            value={note.title}
            onChange={onChange}
            required
            minLength={3}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-slate-700"
          >
            Description <span className="text-xs font-normal text-slate-400">(min. 5 characters)</span>
          </label>
          <textarea
            rows={3}
            className="block w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 resize-y"
            id="description"
            name="description"
            placeholder="Type your notes here..."
            value={note.description}
            onChange={onChange}
            required
            minLength={5}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="tag"
            className="block text-sm font-semibold text-slate-700"
          >
            Tag / Category
          </label>
          <input
            type="text"
            className="block w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
            id="tag"
            name="tag"
            placeholder="e.g., Work, Personal, Ideas"
            value={note.tag}
            onChange={onChange}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={
              adding ||
              note.title.trim().length < 3 ||
              note.description.trim().length < 5
            }
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {adding ? "Adding..." : "Add Note"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addnote;
