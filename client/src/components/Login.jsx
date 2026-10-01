import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const host = import.meta.env.VITE_API_URL || "http://localhost:5000";

    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      if (json.success) {
        const token = json.authToken || json.authtoken;
        localStorage.setItem("token", token);
        props.showAlert("Logged in successfully!", "success");
        navigate("/");
      } else {
        props.showAlert(
          json.error || (json.errors && json.errors[0]?.message) || "Invalid email or password",
          "danger"
        );
      }
    } catch (err) {
      console.error("Login failed:", err);
      props.showAlert("Unable to connect to server. Please try again.", "danger");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-auto mt-12 w-full max-w-md rounded-2xl border border-slate-200/90 bg-white p-7 text-left shadow-md sm:p-9">
      <div className="mb-6">
        <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
          <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Welcome Back
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Sign in to access your saved notes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-slate-700"
          >
            Email address
          </label>
          <input
            type="email"
            className="block w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-slate-700"
          >
            Password
          </label>
          <input
            type="password"
            className="block w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
            id="password"
            name="password"
            placeholder="••••••••"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>

      <div className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-emerald-700 hover:text-emerald-800 underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
