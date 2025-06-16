"use client";

export default function SubmitButton({ loading, text, className, event }) {
  return (
    <button
      aria-label="Submit"
      onClick={event ? event : undefined}
      style={{ opacity: loading ? 0.7 : 1 }}
      disabled={loading}
      type="submit"
      className={`log ${className || ""}`}
    >
      {text}{" "}
      <i className={loading ? "fa-solid fa-spinner fa-pulse fa-spin" : ""} />
    </button>
  );
}
