export default function Subsidy({ setPage }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>補助金サポート</h2>

        <p style={styles.desc}>
          店舗で使える可能性がある補助金を確認できます。
        </p>

        <div style={styles.box}>
          <h4>小規模事業者持続化補助金</h4>
          <p>集客・設備・サービス改善に使える可能性があります。</p>
        </div>

        <div style={styles.box}>
          <h4>IT導入補助金</h4>
          <p>アプリ・システム導入に使える可能性があります。</p>
        </div>

        <button style={styles.mainBtn} onClick={() => setPage("subsidyChat")}>
          AIに相談する
        </button>

        <button style={styles.back} onClick={() => setPage("home")}>
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
  },
  desc: {
    fontSize: 13,
    marginBottom: 10,
  },
  box: {
    border: "1px solid #ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  mainBtn: {
    width: "100%",
    padding: 12,
    background: "#4caf50",
    color: "#fff",
    border: "none",
    marginTop: 10,
  },
  back: {
    width: "100%",
    padding: 10,
    background: "#aaa",
    color: "#fff",
    border: "none",
    marginTop: 10,
  },
};