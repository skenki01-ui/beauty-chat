export default function Subsidy({ setPage }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>補助金サポート</h2>

        <p>
          このアプリでは、あなたの状況に合わせて
          補助金の可能性を整理します。
        </p>

        <p>
          ・使える補助金が分からない  
          ・申請が難しい  
          ・そもそも対象か知りたい  
        </p>

        <p>
          こういった悩みを
          チャットでそのまま相談できます。
        </p>

        <button
          style={styles.button}
          onClick={() => setPage("chat")}
        >
          チャットで相談する
        </button>

        <button
          style={styles.button2}
          onClick={() => setPage("home")}
        >
          戻る
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
    padding: 20,
    width: 320,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    background: "#2196f3",
    color: "#fff",
    border: "none",
  },
  button2: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    background: "#aaa",
    color: "#fff",
    border: "none",
  },
};