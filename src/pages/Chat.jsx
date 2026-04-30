import { useState, useRef } from "react";

export default function Chat({ setPage, setSummary }) {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "気になることやお悩みがあれば教えてください。うまくまとまっていなくても大丈夫です。",
    },
  ]);
  const [input, setInput] = useState("");

  const endTimer = useRef(null);

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "エラー" }]);
    }
  };

  // 🔥 終了処理（まとめ作る）
  const handleEnd = () => {
    const summary = messages
      .map((m) => `${m.role === "user" ? "あなた" : "AI"}：${m.text}`)
      .join("\n");

    setSummary(summary);
    setPage("summary");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
      }}
    >
      {/* チャット */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 20,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: 10,
                borderRadius: 10,
                background:
                  msg.role === "user" ? "#4da6ff" : "#eee",
                color: msg.role === "user" ? "#fff" : "#000",
                maxWidth: "70%",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 終了ボタン（ここに移動） */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: 5,
        }}
      >
        <button
          onClick={handleEnd}
          style={{
            padding: "6px 14px",
            fontSize: 12,
            background: "#444",
            color: "#fff",
            border: "none",
            borderRadius: 20,
            opacity: 0.8,
          }}
        >
          終了
        </button>
      </div>

      {/* 入力 */}
      <div
        style={{
          display: "flex",
          padding: 10,
          borderTop: "1px solid #ccc",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: 10 }}
          placeholder="入力..."
        />
        <button onClick={sendMessage}>送信</button>
      </div>
    </div>
  );
}