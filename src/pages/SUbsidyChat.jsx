import { useState } from "react";

export default function SubsidyChat({ setPage }) {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "補助金について簡単に確認します。業種は何ですか？",
    },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input) return;

    const reply = createReply(input);

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
        <h3>補助金AI相談</h3>

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

        <button style={styles.back} onClick={() => setPage("subsidy")}>
          戻る
        </button>
      </div>
    </div>
  );
}

function createReply(text) {
  if (
    text.includes("美容") ||
    text.includes("整体") ||
    text.includes("歯医者") ||
    text.includes("サロン")
  ) {
    return "その業種なら、顧客満足度向上や業務効率化として説明できる可能性があります。小規模事業者持続化補助金が候補になります。";
  }

  if (text.includes("アプリ") || text.includes("システム")) {
    return "アプリやシステム導入の場合、IT導入補助金の対象になる可能性があります。導入目的を業務効率化として整理するのが大切です。";
  }

  if (text.includes("風俗") || text.includes("ガールズバー")) {
    return "その業種は補助金では通りにくい可能性があります。補助金よりも売上向上・差別化ツールとして通常導入を考える方が現実的です。";
  }

  return "補助金は業種・導入目的・申請時期で変わります。まずは『待ち時間の価値化』『顧客満足度向上』『業務効率化』として整理すると説明しやすいです。";
}

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
  back: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    background: "#aaa",
    color: "#fff",
    border: "none",
  },
};
// fix deploy