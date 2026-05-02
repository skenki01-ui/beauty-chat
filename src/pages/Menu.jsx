export default function Menu({ setPage, setShow }) {
  const go = (nextPage) => {
    setShow(false);
    setPage(nextPage);
  };

  return (
    <div style={styles.overlay}>
<<<<<<< HEAD
      <div style={styles.card}>
        <h3>管理メニュー</h3>

        <button onClick={() => go("list")}>カルテ一覧</button>
        <button onClick={() => go("subsidy")}>補助金</button>
        <button onClick={() => go("payment")}>支払い</button>
        <button onClick={() => go("explanation")}>アプリ説明</button>
        <button onClick={() => go("home")}>登録画面</button>

        <button onClick={() => setShow(false)}>閉じる</button>
=======
      <div style={styles.menuBox}>
        <h2 style={styles.title}>管理メニュー</h2>

        <button style={styles.button} onClick={() => go("list")}>
          カルテ一覧
        </button>

        <button style={styles.button} onClick={() => go("subsidy")}>
          補助金
        </button>

        <button style={styles.button} onClick={() => go("payment")}>
          支払い
        </button>

        <button style={styles.button} onClick={() => go("home")}>
          初期画面
        </button>

        <button style={styles.closeButton} onClick={() => setShow(false)}>
          閉じる
        </button>
>>>>>>> 72651cf38379941c6601c68ea636643b28349e4c
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
<<<<<<< HEAD
    background: "rgba(0,0,0,0.3)",
=======
    background: "rgba(0,0,0,0.35)",
>>>>>>> 72651cf38379941c6601c68ea636643b28349e4c
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
<<<<<<< HEAD
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: 250,
=======
  menuBox: {
    width: 320,
    background: "#ffffff",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  title: {
    margin: "0 0 12px",
    textAlign: "center",
    fontSize: 22,
    color: "#222222",
  },
  button: {
    width: "100%",
    padding: "14px 12px",
    fontSize: 16,
    color: "#222222",
    background: "#f4f4f4",
    border: "1px solid #cccccc",
    borderRadius: 8,
    cursor: "pointer",
  },
  closeButton: {
    width: "100%",
    padding: "14px 12px",
    fontSize: 16,
    color: "#ffffff",
    background: "#444444",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    marginTop: 8,
>>>>>>> 72651cf38379941c6601c68ea636643b28349e4c
  },
};