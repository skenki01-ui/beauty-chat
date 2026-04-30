export default function Menu({ setPage, setShow }) {
  const go = (nextPage) => {
    setShow(false);
    setPage(nextPage);
  };

  return (
    <div style={styles.overlay}>
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
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
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
  },
};