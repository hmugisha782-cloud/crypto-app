export default function Notification({ notice, setNotice, panel, button }) {
  if (!notice) return null;

  return (
    <div
      role="status"
      style={{
        ...panel,
        marginBottom: 16,
        borderColor: "#0891b2",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <span>{notice}</span>
      <button style={button()} onClick={() => setNotice("")}>
        Dismiss
      </button>
    </div>
  );
}
