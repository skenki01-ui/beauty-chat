import { useState } from "react";

export default function Home({ setPage, setName, setKarute }) {
  const [inputName, setInputName] = useState("");

  const handleStart = () => {
    if (!inputName) {
      alert("名前を入力してください");
      return;
    }

    // 🔥 Appに保存
    setName(inputName);

    // 🔥 カルテにも入れる（後で使う）
    setKarute({
      name: inputName,
    });

    // 🔥 次へ
    setPage("karute");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: 20 }}>受付システム</h2>

        <input
          type="text"
          placeholder="お名前を入力"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button} onClick={handleStart}>
          開始
        </button>
      </div>
    </div>
  );
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
    padding: 30,
    borderRadius: 12,
    width: 280,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#2196f3",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};