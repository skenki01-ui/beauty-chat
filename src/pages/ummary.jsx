import { useEffect, useState } from "react";

export default function Summary({ summary, setPage }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!summary) return;

    // 既存履歴取得
    const saved = JSON.parse(localStorage.getItem("summaryHistory") || "[]");

    // 先頭に追加
    const updated = [summary, ...saved];

    // 3件に制限
    const limited = updated.slice(0, 3);

    localStorage.setItem("summaryHistory", JSON.stringify(limited));
    setHistory(limited);
  }, [summary]);

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    alert("コピーしました");
  };

  return (
    <div style={styles.container}>
      <h2>まとめ</h2>

      <textarea
        value={summary}
        readOnly
        style={styles.textarea}
      />

      <button onClick={() => copy(summary)} style={styles.button}>
        コピー
      </button>

      <button onClick={() => setPage("chat")} style={styles.button}>
        戻る
      </button>

      <h3 style={{ marginTop: 20 }}>過去3件</h3>

      {history.map((item, i) => (
        <div key={i} style={styles.historyBox}>
          <pre style={{ whiteSpace: "pre-wrap" }}>{item}</pre>
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
  historyBox: {
    border: "1px solid #ddd",
    padding: "10px",
    marginTop: "10px",
  },
};