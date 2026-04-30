import { useEffect, useState } from "react";

export default function Summary({ setPage }) {
  const [current, setCurrent] = useState("");
  const [history, setHistory] = useState([]);
  const [showQR, setShowQR] = useState(false);

  // 初回読み込み
  useEffect(() => {
    const last = localStorage.getItem("lastSummary") || "";
    setCurrent(last);

    const saved = JSON.parse(localStorage.getItem("summaryHistory") || "[]");
    setHistory(saved);
  }, []);

  // コピー
  const handleCopy = () => {
    navigator.clipboard.writeText(current);
    alert("コピーしました");
  };

  // txtダウンロード
  const handleDownload = () => {
    const blob = new Blob([current], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "summary.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  // QR生成用URL（簡易：そのままテキスト埋め込み）
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    current
  )}`;

  return (
    <div style={styles.container}>
      <h2>まとめ（店舗用）</h2>

      <textarea value={current} readOnly style={styles.textarea} />

      <div style={styles.buttonRow}>
        <button onClick={handleCopy}>コピー</button>
        <button onClick={handleDownload}>ダウンロード</button>
        <button onClick={() => setShowQR(!showQR)}>
          {showQR ? "QR閉じる" : "QR表示"}
        </button>
      </div>

      {showQR && (
        <div style={{ marginTop: 10 }}>
          <img src={qrUrl} alt="QR" />
          <div style={{ fontSize: 12, color: "#666" }}>
            スマホで読み取って共有
          </div>
        </div>
      )}

      <h3 style={{ marginTop: 20 }}>履歴（3件）</h3>

      {history.map((item, i) => (
        <div key={i} style={styles.history}>
          <pre>{item}</pre>
        </div>
      ))}

      <div style={{ marginTop: 20 }}>
        <button onClick={() => setPage("home")}>戻る</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 500,
    margin: "0 auto",
    background: "#fff",
  },
  textarea: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  buttonRow: {
    display: "flex",
    gap: 10,
  },
  history: {
    border: "1px solid #ccc",
    padding: 10,
    marginTop: 10,
  },
};