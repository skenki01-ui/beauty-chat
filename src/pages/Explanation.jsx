export default function Explanation({ setPage }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>アプリについて</h2>

        <p>
          このアプリは、
          店舗での相談や受付をスムーズにするためのものです。
        </p>

        <p>
          カルテを元にした相談や、
          そのまま質問することもできます。
        </p>

        <p>
          内容は要点のみ整理され、
          店舗側で確認できる仕組みになっています。
        </p>

        <button onClick={() => setPage("home")}>戻る</button>
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
  },
};