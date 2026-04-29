import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "気になることやお悩みがあれば教えてください。うまくまとまっていなくても大丈夫です。",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // 自動スクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 送信
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const aiMessage = {
        role: "assistant",
        text: data.reply || "エラーが発生しました",
      };

      setMessages([...newMessages, aiMessage]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", text: "通信エラーが発生しました" },
      ]);
    }
  };

  // まとめ生成
  const formatSummary = () => {
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

  // コピー
  const copySummary = () => {
    const text = formatSummary();
    navigator.clipboard.writeText(text);
    alert("コピーしました");
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={
              msg.role === "user"
                ? styles.userMessage
                : styles.aiMessage
            }
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 入力エリア */}
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
        <button onClick={sendMessage} style={styles.sendButton}>
          送信
        </button>
      </div>

      {/* コピー */}
      <button onClick={copySummary} style={styles.copyButton}>
        まとめをコピー
      </button>
    </div>
  );
}

// スタイル（白ベース固定）
const styles = {
  container: {
    background: "#ffffff",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  chatBox: {
    width: "100%",
    maxWidth: "400px",
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    background: "#f5f7fa",
  },

  userMessage: {
    alignSelf: "flex-end",
    background: "#4a90e2",
    color: "#fff",
    padding: "10px",
    borderRadius: "10px",
    margin: "5px 0",
    maxWidth: "70%",
  },

  aiMessage: {
    alignSelf: "flex-start",
    background: "#ffffff",
    color: "#333",
    padding: "10px",
    borderRadius: "10px",
    margin: "5px 0",
    maxWidth: "70%",
    border: "1px solid #ddd",
  },

  inputArea: {
    display: "flex",
    width: "100%",
    maxWidth: "400px",
    padding: "10px",
    borderTop: "1px solid #ddd",
    background: "#fff",
  },

  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },

  sendButton: {
    marginLeft: "5px",
    padding: "10px",
    background: "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },

  copyButton: {
    margin: "10px",
    padding: "10px 20px",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};