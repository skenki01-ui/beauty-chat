import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "気になることやお悩みがあれば教えてください。うまくまとまっていなくても大丈夫です。"
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input || loading) return;

    const userMessage = input;
    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage }
    ]);

    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMessage
        })
      });

      const data = await res.json();

      let aiText = data.text || "返答なし";
      let display = "";

      setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

      for (let i = 0; i < aiText.length; i++) {
        display += aiText[i];

        await new Promise((r) => setTimeout(r, 30));

        setMessages((prev) => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = {
            role: "assistant",
            text: display
          };
          return newMsgs;
        });
      }

    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "通信エラー" }
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "0 auto",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#eaf3ff"
    }}>

      {/* チャット */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "10px"
      }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: "8px"
            }}
          >
            <div style={{
              maxWidth: "70%",
              padding: "8px 12px",
              borderRadius: "12px",
              background:
                msg.role === "user" ? "#4da3ff" : "#fff",
              color:
                msg.role === "user" ? "#fff" : "#000",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* 入力 */}
      <div style={{
        display: "flex",
        padding: "10px",
        background: "#fff",
        borderTop: "1px solid #ddd"
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="入力..."
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            marginLeft: "8px",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            background: "#4da3ff",
            color: "#fff"
          }}
        >
          送信
        </button>
      </div>

    </div>
  );
}