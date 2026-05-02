export default function Menu({ setPage, setShow }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h3>管理メニュー</h3>

        <button onClick={() => go("list")}>カルテ一覧</button>
        <button onClick={() => go("subsidy")}>補助金</button>
        <button onClick={() => go("payment")}>支払い</button>
        <button onClick={() => go("explanation")}>アプリ説明</button>
        <button onClick={() => go("home")}>登録画面</button>

        <button onClick={() => setShow(false)}>閉じる</button>
      </div>
    </div>
  );

  function go(p) {
    setPage(p);
    setShow(false);
  }
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: 250,
  },
};