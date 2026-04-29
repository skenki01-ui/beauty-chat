export default function Payment({ setPage }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>ご利用料金</h2>

        <p><b>お支払い期限</b></p>
        <p>2026年5月28日</p>

        <hr />

        <p><b>ご請求金額</b></p>
        <p style={{ fontSize: 20 }}>20,000円</p>

        <hr />

        <p><b>お振込先</b></p>
        <p>〇〇銀行 〇〇支店</p>
        <p>普通 1234567</p>

        <button
          style={styles.button}
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
    borderRadius: 10,
    width: 320,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    padding: 10,
    width: "100%",
    background: "#2196f3",
    color: "#fff",
    border: "none",
  },
};