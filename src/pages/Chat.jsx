import { useState, useRef, useEffect } from "react";

export default function Chat({ setPage, setSummary }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "気になることやお悩みがあれば教えてください。うまくまとまっていなくても大丈夫です。",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "assistant", text: data.reply },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", text: "通信エラー" },
      ]);
    }
  };

  // まとめ生成
  const createSummary = () => {
    const now = new Date().toLocaleString();

    const lastUser = [...messages]
      .reverse()
      .find((m) => m.role === "user");

    const lastAI = [...messages]
      .reverse()
      .find((m) => m.role === "assistant");

    return `
【日時】
${now}

【会話まとめ】
・${lastUser?.text || ""}

【AIフィードバック】
・${lastAI?.text || ""}
`;
  };

  // 終了ボタン
  const endChat = () => {
    const summary = createSummary();
    setSummary(summary);
    setPage("summary");
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={
              msg.role === "user"
                ? styles.user
                : styles.ai
            }
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={styles.inputArea}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          placeholder="入力..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button onClick={sendMessage}>送信</button>
      </div>

      <button onClick={endChat} style={styles.endButton}>
        終了してまとめ
      </button>
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
    overflowY: "auto",
    padding: "10px",
    background: "#f5f7fa",
  },
  user: {
    alignSelf: "flex-end",
    background: "#4a90e2",
    color: "#fff",
    padding: "8px",
    margin: "5px",
    borderRadius: "10px",
  },
  ai: {
    alignSelf: "flex-start",
    background: "#fff",
    padding: "8px",
    margin: "5px",
    border: "1px solid #ddd",
    borderRadius: "10px",
  },
  inputArea: {
    display: "flex",
    padding: "10px",
  },
  input: {
    flex: 1,
    marginRight: "5px",
  },
  endButton: {
    padding: "10px",
    background: "#333",
    color: "#fff",
  },
};