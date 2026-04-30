export default function ModeSelect({ setPage, setMode, setType }) {
  const handleSelect = (mode, type, nextPage) => {
    setMode(mode);
    setType(type);
    setPage(nextPage);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>利用タイプ選択</h2>

        {/* 🔹 カルテあり */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>相談（カルテあり）</h3>

          <button
            style={styles.button}
            onClick={() => handleSelect("consult", "beauty", "karute")}
          >
            美容 / 整体 / ジム
          </button>

          <button
            style={styles.button}
            onClick={() => handleSelect("consult", "dental", "karute")}
          >
            歯医者
          </button>
        </div>

        {/* 🔹 カルテなし */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>案内（カルテなし）</h3>

          <button
            style={styles.button}
            onClick={() => handleSelect("guide", "hotel", "chat")}
          >
            ホテル
          </button>

          <button
            style={styles.button}
            onClick={() => handleSelect("guide", "restaurant", "chat")}
          >
            飲食店
          </button>

          <button
            style={styles.button}
            onClick={() => handleSelect("guide", "shop", "chat")}
          >
            店舗 / その他
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa",
  },

  card: {
    width: 320,
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  title: {
    marginBottom: 10,
  },

  section: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  sectionTitle: {
    fontSize: 14,
    color: "#666",
  },

  button: {
    padding: 14,
    borderRadius: 8,
    border: "none",
    background: "#4caf50",
    color: "#fff",
    fontSize: 14,
    cursor: "pointer",
  },
};