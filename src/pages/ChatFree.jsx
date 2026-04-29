import { useState } from "react";

export default function ChatFree({ setPage }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: "こんにちは😊 今日はどんな感じですか？" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input) return;

    const reply = generateReply(input);

    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      { role: "ai", text: reply },
    ]);

    setInput("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>雑談チャット</h3>

        <div style={styles.chat}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                textAlign: m.role === "user" ? "right" : "left",
              }}
            >
              <span
                style={{
                  ...styles.bubble,
                  background: m.role === "user" ? "#4caf50" : "#eee",
                  color: m.role === "user" ? "#fff" : "#000",
                }}
              >
                {m.text}
              </span>
            </div>
          ))}

          {/* 🔴 ここが繋ぎポイント */}
          <div style={{ marginTop: 10 }}>
            <button
              style={styles.jumpBtn}
              onClick={() => setPage("karute")}
            >
              もう少し詳しく相談する
            </button>
          </div>
        </div>

        <div style={styles.row}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="入力してください"
          />
          <button style={styles.send} onClick={send}>
            送信
          </button>
        </div>

        <button style={styles.back} onClick={() => setPage("home")}>
          終了
        </button>
      </div>
    </div>
  );
}

/* ===== 雑談ロジック ===== */
function generateReply(text) {
  let base = "";

  if (text.includes("疲れ")) {
    base = "お疲れさまです😌 無理しすぎてませんか？";
  } else if (text.includes("眠い")) {
    base = "ちゃんと休めてますか？睡眠も美容にかなり大事ですよ";
  } else if (text.includes("肌")) {
    base = "最近お肌の調子どうですか？乾燥とか気になってませんか？";
  } else {
    base = "なるほどですね😊 もう少し詳しく教えてもらえますか？";
  }

  // 将来営業トークここに追加
  return base;
}

/* ===== スタイル ===== */
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
  chat: {
    height: 260,
    overflowY: "auto",
    background: "#fafafa",
    padding: 10,
    marginBottom: 10,
  },
  bubble: {
    display: "inline-block",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "85%",
  },
  row: {
    display: "flex",
  },
  input: {
    flex: 1,
    padding: 8,
  },
  send: {
    padding: 8,
    background: "#2196f3",
    color: "#fff",
    border: "none",
  },
  jumpBtn: {
    width: "100%",
    padding: 10,
    background: "#ff9800",
    color: "#fff",
    border: "none",
    marginTop: 5,
    borderRadius: 6,
  },
  back: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    background: "#aaa",
    color: "#fff",
    border: "none",
  },
};