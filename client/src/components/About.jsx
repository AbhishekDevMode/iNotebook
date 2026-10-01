import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="mx-auto my-12 max-w-3xl px-4 sm:px-6">
      <div className="rounded-2xl border border-slate-200/90 bg-white p-8 text-left shadow-sm sm:p-12">
        <div className="mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 shadow-xs">
          <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>

        <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          About iNotebook
        </h1>

        <p className="mb-6 text-base leading-relaxed text-slate-600">
          iNotebook is your digital companion for organizing thoughts, tasks, and notes all in one place. Built to combine maximum simplicity with fast cloud synchronization, it keeps your ideas neat, categorized, and accessible everywhere.
        </p>

        <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-5">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <span>🔒</span> Privacy First
            </h3>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Your notes are completely private to your account. Protected by secured JWT authentication and salted bcrypt hashing.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-5">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <span>⚡</span> Fast & Modern
            </h3>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Engineered with React 19, Tailwind CSS v4, and Vite for instant page loads and fluid, responsive interactions.
            </p>
          </div>
        </div>

        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">
          Tech Stack
        </h2>
        <div className="mb-8 flex flex-wrap gap-2">
          {["React 19", "Vite", "Tailwind CSS v4", "Node.js", "Express", "MongoDB Atlas", "JWT", "BcryptJS"].map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-emerald-200/70 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline"
          >
            ← Back to Notes
          </Link>
          <p className="text-xs text-slate-500 italic">
            Built with ❤️ by Abhishek Vishwakarma
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
