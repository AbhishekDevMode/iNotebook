import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    if (credentials.password.length < 6) {
      props.showAlert("Password must be at least 6 characters", "danger");
      return;
    }

    setLoading(true);
    const host = import.meta.env.VITE_API_URL || "http://localhost:5000";

    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      if (json.success) {
        const token = json.authToken || json.authtoken;
        localStorage.setItem("token", token);
        props.showAlert("Account created successfully!", "success");
        navigate("/");
      } else {
        props.showAlert(
          json.error || (json.errors && json.errors[0]?.message) || "Failed to create account",
          "danger"
        );
      }
    } catch (err) {
      console.error("Signup failed:", err);
      props.showAlert("Unable to connect to server. Please try again.", "danger");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-md rounded-2xl border border-slate-200/90 bg-white p-7 text-left shadow-md sm:p-9">
      <div className="mb-6">
        <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
          <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Create an Account
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Start storing your notes securely on the cloud.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-slate-700"
          >
            Full Name
          </label>
          <input
            type="text"
            className="block w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
            id="name"
            name="name"
            placeholder="John Doe"
            value={credentials.name}
            onChange={onChange}
            required
            minLength={3}
          />
        </div>

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
            placeholder="At least 6 characters"
            value={credentials.password}
            onChange={onChange}
            required
            minLength={6}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="cpassword"
            className="block text-sm font-semibold text-slate-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            className="block w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
            id="cpassword"
            name="cpassword"
            placeholder="Re-enter password"
            value={credentials.cpassword}
            onChange={onChange}
            required
            minLength={6}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </div>
      </form>

      <div className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-emerald-700 hover:text-emerald-800 underline"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Signup;