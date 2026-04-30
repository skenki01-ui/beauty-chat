import { useState, useRef } from "react";

export default function Chat({ setPage }) {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.reply },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "エラーが発生しました" },
      ]);
    }
  };

  // 🔥 長押し終了（誤タップ防止）
  const handleEndStart = () => {
    endTimer.current = setTimeout(() => {
      setPage("karute");
    }, 800);
  };

  const handleEndCancel = () => {
    clearTimeout(endTimer.current);
  };

  return (
    <div
      style={{
        background: "#fff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* チャット表示 */}
      <div
        style={{
          flex: 1,
          padding: 20,
          overflowY: "auto",
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
          placeholder="入力..."
          style={{
            flex: 1,
            padding: 10,
          }}
        />
        <button onClick={sendMessage}>送信</button>
      </div>

      {/* 🔥 終了ボタン（中央・小さい・長押し） */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <button
          onMouseDown={handleEndStart}
          onMouseUp={handleEndCancel}
          onTouchStart={handleEndStart}
          onTouchEnd={handleEndCancel}
          style={{
            padding: "8px 16px",
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
    </div>
  );
}