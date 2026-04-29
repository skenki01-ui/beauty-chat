export default function ModeSelect({ setPage }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>モード選択</h3>

        <button
          style={styles.button}
          onClick={() => setPage("chat")}
        >
          問診チャット
        </button>

        <button
          style={styles.button}
          onClick={() => setPage("chatFree")}
        >
          雑談チャット
        </button>
      </div>
    </div>
  );
}

const styles = {
  container:{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"#f5f7fa"},
  card:{background:"#fff",padding:20,borderRadius:10,width:300,textAlign:"center"},
  button:{width:"100%",padding:15,marginBottom:10,background:"#2196f3",color:"#fff",border:"none"}
};