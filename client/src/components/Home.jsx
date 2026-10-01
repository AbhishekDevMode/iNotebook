import Notes from "./Notes";
import { Link } from "react-router-dom";
import bgHero from "../../assets/noemi-macavei-katocz-fSB5tMpXc9Q-unsplash.jpg";

const Home = ({ showAlert }) => {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <>
      {isLoggedIn ? (
        <div className="notes-wrapper">
          <Notes showAlert={showAlert} />
        </div>
      ) : (
        <div className="relative min-h-[calc(100vh-65px)] w-full overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50/40 to-white">
          {/* Subtle background texture */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 mix-blend-multiply pointer-events-none"
            style={{ backgroundImage: `url(${bgHero})` }}
          />

          {/* Hero Content */}
          <div className="relative mx-auto flex min-h-[calc(100vh-65px)] max-w-5xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
            <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100/70 px-4 py-1.5 text-xs font-semibold text-emerald-800 shadow-xs">
              ✨ Welcome to iNotebook
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl sm:leading-tight">
              Forget forgetting. <br />
              <span className="bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                Your digital brain
              </span>{" "}
              on the cloud.
            </h1>

            <p className="mt-5 max-w-2xl text-base text-slate-600 sm:text-lg leading-relaxed">
              From midnight thoughts to organized daily tasks, iNotebook keeps your ideas secure, categorized, and accessible everywhere you go.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <Link
                to="/signup"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-700 px-8 py-3 text-base font-semibold text-white shadow-md shadow-emerald-700/20 transition-all hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-700/30"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-8 py-3 text-base font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400"
              >
                Sign In
              </Link>
            </div>

            {/* Feature Highlights */}
            <div className="mt-14 grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 text-left shadow-sm backdrop-blur-xs transition-all hover:shadow-md">
                <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 text-lg">
                  ⚡
                </div>
                <h3 className="font-semibold text-slate-900">Instant Sync</h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-normal">
                  Save notes securely in MongoDB and access them across all your devices seamlessly.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 text-left shadow-sm backdrop-blur-xs transition-all hover:shadow-md">
                <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 text-lg">
                  🔒
                </div>
                <h3 className="font-semibold text-slate-900">Secure & Private</h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-normal">
                  Protected with salted bcrypt hashing and encrypted JSON Web Tokens.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 text-left shadow-sm backdrop-blur-xs transition-all hover:shadow-md">
                <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 text-lg">
                  🏷️
                </div>
                <h3 className="font-semibold text-slate-900">Tags & Instant Search</h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-normal">
                  Organize by custom categories and find any note in real time with quick filters.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
