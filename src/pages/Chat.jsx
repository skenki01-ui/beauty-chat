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

    const userText = input.trim();

    const newMessages = [
      ...messages,
      { role: "user", text: userText },
    ];

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
          mode: mode || "consult",
          category: type || "beauty",
          messages: newMessages,
          karute: karute || {},
        }),
      });

      const data = await res.json();

      console.log("AIレスポンス", data);

      const aiText =
        data.reply ||
        data.output_text ||
        data.output?.[0]?.content?.[0]?.text ||
        "返答なし";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: aiText,
        },
      ]);
    } catch (e) {
      console.log("通信エラー", e);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "通信エラー",
        },
      ]);
    }

    setLoading(false);
  };

  // 🔥終了 → 要約保存
  const handleEnd = async () => {
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "summary",
          mode: mode || "consult",
          category: type || "beauty",
          messages,
          karute: karute || {},
        }),
      });

      const data = await res.json();

      console.log("まとめレスポンス", data);

      const summary =
        data.summary ||
        data.reply ||
        data.output_text ||
        "まとめ生成失敗";

      // 保存
      localStorage.setItem("lastSummary", summary);

      const saved = JSON.parse(
        localStorage.getItem("summaryHistory") || "[]"
      );

      const updated = [summary, ...saved].slice(0, 3);

      localStorage.setItem("summaryHistory", JSON.stringify(updated));
    } catch (e) {
      console.log("まとめエラー", e);
    }

    // 👉 店舗用なのでホームに戻す
    setPage("home");
  };

  return (
    <div style={styles.container}>
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
                color:
                  msg.role === "user" ? "#fff" : "#000",
                maxWidth: "70%",
                wordBreak: "break-word",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {loading && (
          <div style={{ fontSize: 12, color: "#666" }}>
            AI応答中...
          </div>
        )}
      </div>

      {/* 🔥終了ボタン（中央・小さめ） */}
      <div style={styles.endWrap}>
        <button onClick={handleEnd} style={styles.endBtn}>
          終了
        </button>
      </div>

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

        <button onClick={sendMessage} disabled={loading}>
          送信
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
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
  },

  input: {
    flex: 1,
    marginRight: 5,
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 6,
  },

  endWrap: {
    display: "flex",
    justifyContent: "center",
    padding: 8,
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