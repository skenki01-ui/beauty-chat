import { useState } from "react";

export default function Chat({ setPage, karute, mode, type }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "ご質問やお悩みを教えてください。",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹送信
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "chat",
          mode,
          category: type,
          messages: newMessages,
          karute,
        }),
      });

      const data = await res.json();

      const reply = data.reply || "返答なし";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: reply },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "通信エラー" },
      ]);
    }

    setLoading(false);
  };

  // 🔥終了 → 要約生成
  const handleEnd = async () => {
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "summary",
          mode,
          category: type,
          messages,
          karute,
        }),
      });

      const data = await res.json();

      const summary = data.summary || "生成失敗";

      // 🔹最新
      localStorage.setItem("lastSummary", summary);

      // 🔹履歴3件
      const saved = JSON.parse(
        localStorage.getItem("summaryHistory") || "[]"
      );

      const updated = [summary, ...saved].slice(0, 3);

      localStorage.setItem(
        "summaryHistory",
        JSON.stringify(updated)
      );
    } catch (e) {
      console.log(e);
    }

    setPage("home");
  };

  return (
    <div style={styles.container}>
      {/* チャット */}
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: 10,
                borderRadius: 10,
                background:
                  msg.role === "user" ? "#4a90e2" : "#eee",
                color: msg.role === "user" ? "#fff" : "#000",
                maxWidth: "70%",
                wordBreak: "break-word",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {loading && (
          <div style={{ color: "#999", fontSize: 12 }}>
            AI応答中...
          </div>
        )}
      </div>

      {/* 入力 */}
      <div style={styles.inputArea}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="入力..."
          style={styles.input}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={styles.sendBtn}
        >
          送信
        </button>
      </div>

      {/* 終了 */}
      <div style={styles.endWrap}>
        <button onClick={handleEnd} style={styles.endBtn}>
          終了
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#fff",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  chatBox: {
    flex: 1,
    padding: 20,
    overflowY: "auto",
    background: "#f5f7fa",
  },

  inputArea: {
    display: "flex",
    padding: 10,
    borderTop: "1px solid #ccc",
    background: "#fff",
  },

  input: {
    flex: 1,
    marginRight: 5,
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
  },

  sendBtn: {
    padding: "10px 16px",
    background: "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: 6,
  },

  endWrap: {
    display: "flex",
    justifyContent: "center",
    padding: 10,
  },

  endBtn: {
    padding: "6px 16px",
    fontSize: 12,
    background: "#444",
    color: "#fff",
    border: "none",
    borderRadius: 20,
  },
};