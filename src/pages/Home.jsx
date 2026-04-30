export default function Home({ setPage }) {
  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: 40 }}>受付システム</h1>

      <button
        onClick={() => setPage("mode")}
        style={styles.startButton}
      >
        開始
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
  },
  startButton: {
    padding: "16px 40px",
    fontSize: 18,
    background: "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};