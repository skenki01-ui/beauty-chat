export default function Result({ karute, setPage }) {
  if (!karute) {
    return <div>データなし</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>診断結果</h2>

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
          style={styles.button2}
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
    width: 300,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    background: "#2196f3",
    color: "#fff",
    border: "none",
  },
  button2: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    background: "#aaa",
    color: "#fff",
    border: "none",
  },
};