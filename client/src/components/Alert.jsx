export default function Alert(props) {
  if (!props.alert) return null;

  const type = props.alert.type === "danger" ? "error" : props.alert.type;
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  const alertStyles = {
    success: "border-emerald-200 bg-white text-emerald-900 shadow-emerald-500/10",
    error: "border-rose-200 bg-white text-rose-900 shadow-rose-500/10",
    danger: "border-rose-200 bg-white text-rose-900 shadow-rose-500/10",
    warning: "border-amber-200 bg-white text-amber-900 shadow-amber-500/10",
    info: "border-sky-200 bg-white text-sky-900 shadow-sky-500/10",
  };

  return (
    <div className="fixed top-16 right-4 z-50 max-w-md transition-all duration-300 ease-out sm:right-6">
      <div
        className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm shadow-xl backdrop-blur-md ${
          alertStyles[props.alert.type] || alertStyles.info
        }`}
        role="alert"
      >
        <div className="flex items-center gap-2.5">
          {props.alert.type === "success" ? (
            <div className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
          ) : (
            <div className="flex size-6 items-center justify-center rounded-full bg-rose-100 text-rose-700">
              <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
          )}
          <p className="font-medium text-slate-800">
            <span className="font-semibold text-slate-900">{capitalizedType}:</span> {props.alert.msg}
          </p>
        </div>
      </div>
    </div>
  );
}