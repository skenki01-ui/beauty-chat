export default function ModeSelect({ setPage, setMode, setType }) {
  return (
    <div style={styles.container}>
      <h2>利用タイプを選択</h2>

      {/* 🔹 カルテあり */}
      <div style={styles.section}>
        <h3>相談（カルテあり）</h3>

        <button onClick={() => {
          setMode("consult");
          setType("beauty");
          setPage("karute");
        }}>
          美容 / 整体 / ジム
        </button>

        <button onClick={() => {
          setMode("consult");
          setType("dental");
          setPage("karute");
        }}>
          歯医者
        </button>
      </div>

      {/* 🔹 カルテなし */}
      <div style={styles.section}>
        <h3>案内（カルテなし）</h3>

        <button onClick={() => {
          setMode("guide");
          setType("hotel");
          setPage("chat");
        }}>
          ホテル
        </button>

        <button onClick={() => {
          setMode("guide");
          setType("restaurant");
          setPage("chat");
        }}>
          飲食店
        </button>

        <button onClick={() => {
          setMode("guide");
          setType("shop");
          setPage("chat");
        }}>
          店舗 / その他
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    textAlign: "center",
    background: "#fff",
  },
  section: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
};