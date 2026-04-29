export default function Menu({ setPage, setShow }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>管理メニュー</h3>

        <button
          style={styles.button}
          onClick={() => {
            setShow(false);
            setPage("sales");
          }}
        >
          導入説明
        </button>

        <button
          style={styles.button}
          onClick={() => {
            setShow(false);
            setPage("list");
          }}
        >
          カルテ一覧
        </button>

        <button
          style={styles.button}
          onClick={() => {
            setShow(false);
            setPage("subsidy");
          }}
        >
          補助金
        </button>

        <button
          style={styles.button}
          onClick={() => {
            setShow(false);
            setPage("payment");
          }}
        >
          支払い
        </button>

        <button
          style={styles.close}
          onClick={() => setShow(false)}
        >
          閉じる
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay:{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.5)",display:"flex",justifyContent:"center",alignItems:"center"},
  modal:{background:"#fff",padding:20,width:300},
  button:{width:"100%",padding:10,marginBottom:10},
  close:{width:"100%",padding:10}
};