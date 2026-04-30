import { useState } from "react";

export default function Chat({ setPage, karute, mode, type }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "ご質問やお悩みを教えてください。" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newMessages = [
      ...messages,
      { role: "user", text: input.trim() },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "chat",
          mode: mode || "consult",
          category: type || "beauty",
          messages: newMessages,
          karute: karute || {},
        }),
      });

      const data = await res.json();

      const reply =
        data.reply ||
        data.output_text ||
        data.output?.[0]?.content?.[0]?.text ||
        "返答なし";

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "通信エラー" }]);
    }

    setLoading(false);
  };

  const handleEnd = async () => {
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "summary",
          mode: mode || "consult",
          category: type || "beauty",
          messages,
          karute,
        }),
      });

      const data = await res.json();

      const summary =
        data.summary ||
        data.output_text ||
        data.output?.[0]?.content?.[0]?.text ||
        "まとめ失敗";

      // 🔥 要点だけ保存（会話は保存しない）
      const record = {
        date: new Date().toLocaleString(),
        summary,
        trouble: karute?.trouble || "",
      };

      const old = JSON.parse(localStorage.getItem("karuteList") || "[]");
      const updated = [record, ...old].slice(0, 10);

      localStorage.setItem("karuteList", JSON.stringify(updated));
    } catch (e) {
      console.log(e);
    }

    setPage("home");
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === "user" ? "right" : "left" }}>
            <span style={{
              background: m.role === "user" ? "#4a90e2" : "#eee",
              color: m.role === "user" ? "#fff" : "#000",
              padding: 10,
              borderRadius: 10,
              display: "inline-block",
              marginBottom: 10,
              maxWidth: "70%",
            }}>
              {m.text}
            </span>
          </div>
        ))}
        {loading && <div style={{ fontSize: 12 }}>AI応答中...</div>}
      </div>

      <div style={styles.endWrap}>
        <button onClick={handleEnd} style={styles.endBtn}>終了</button>
      </div>

      <div style={styles.inputArea}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          placeholder="入力..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>送信</button>
      </div>
    </div>
  );
}

const styles = {
  container:{height:"100vh",display:"flex",flexDirection:"column"},
  chatBox:{flex:1,padding:20,overflowY:"auto",background:"#f5f7fa"},
  inputArea:{display:"flex",padding:10},
  input:{flex:1,marginRight:5,padding:10},
  endWrap:{display:"flex",justifyContent:"center",padding:5},
  endBtn:{padding:"6px 16px",background:"#444",color:"#fff",borderRadius:20}
};