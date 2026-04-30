export default function Menu({ setPage, setShow }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.menu}>
        <h3>管理メニュー</h3>

        <button onClick={() => {
          setShow(false);
          setPage("list");
        }}>
          カルテ一覧
        </button>

        <button onClick={() => {
          setShow(false);
          setPage("home");
        }}>
          初期画面
        </button>

        <button onClick={() => setShow(false)}>
          閉じる
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 260,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
};