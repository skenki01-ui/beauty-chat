export default function Menu({ setPage, setShow }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <h3>管理メニュー</h3>

        <button onClick={() => {
          setPage("list");
          setShow(false);
        }}>
          カルテ一覧
        </button>

        <button onClick={() => {
          setPage("subsidy");
          setShow(false);
        }}>
          補助金
        </button>

        <button onClick={() => {
          setPage("payment");
          setShow(false);
        }}>
          支払い
        </button>

        <button onClick={() => {
          setPage("home");
          setShow(false);
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
  box: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: 200,
    textAlign: "center",
  },
};