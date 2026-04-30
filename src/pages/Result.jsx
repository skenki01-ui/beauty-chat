export default function Result({ karute, setPage }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>診断結果</h3>

        <p>部位：{karute.parts?.join(" / ") || "-"}</p>
        <p>悩み：{karute.trouble || "-"}</p>
        <p>期間：{karute.period || "-"}</p>
        <p>理想：{karute.ideal || "-"}</p>
        <p>不安：{karute.worry || "-"}</p>

        <button
          style={styles.button}
          onClick={() => setPage("chat")}
        >
          相談する
        </button>

        <button
          style={styles.back}
          onClick={() => setPage("home")}
        >
          戻る
        </button>
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
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 320,
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#4caf50",
    color: "#fff",
    border: "none",
    marginTop: 10,
  },
  back: {
    width: "100%",
    padding: 10,
    marginTop: 10,
  },
};