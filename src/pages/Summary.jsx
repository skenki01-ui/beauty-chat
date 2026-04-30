import { useEffect, useState } from "react";

export default function Summary({ summary, setPage }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!summary) return;

    const saved = JSON.parse(localStorage.getItem("summaryHistory") || "[]");
    const updated = [summary, ...saved];
    const limited = updated.slice(0, 3);

    localStorage.setItem("summaryHistory", JSON.stringify(limited));
    setHistory(limited);
  }, [summary]);

  const copy = () => {
    navigator.clipboard.writeText(summary);
    alert("コピーしました");
  };

  return (
    <div style={styles.container}>
      <h2>カルテまとめ</h2>

      <textarea value={summary} readOnly style={styles.textarea} />

      <div>
        <button onClick={copy} style={styles.button}>
          コピー
        </button>

        <button onClick={() => setPage("karute")} style={styles.button}>
          カルテに戻る
        </button>
      </div>

      <h3>過去3件</h3>

      {history.map((item, i) => (
        <div key={i} style={styles.history}>
          <pre>{item}</pre>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "500px",
    margin: "0 auto",
    background: "#fff",
  },
  textarea: {
    width: "100%",
    height: "200px",
    marginBottom: "10px",
  },
  button: {
    marginRight: "10px",
    padding: "10px",
  },
  history: {
    border: "1px solid #ddd",
    marginTop: "10px",
    padding: "10px",
  },
};