export default function Home({ setPage, name, setName }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>受付画面</h2>

        <input
          style={styles.input}
          placeholder="お名前（ニックネーム可）"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={() => {
            if (!name) return;
            setPage("karute");
          }}
        >
          カルテ開始
        </button>

        {/* 🔴 注意文 */}
        <div style={styles.notice}>
          <p>※入力内容はこの端末内でのみ管理されます</p>
          <p>※個人を特定する情報は保存されません</p>
          <p>※チャット内容は共有されません</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container:{
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"#f5f7fa"
  },
  card:{
    background:"#fff",
    padding:20,
    borderRadius:10,
    width:300,
    textAlign:"center"
  },
  input:{
    width:"100%",
    padding:10,
    marginBottom:10
  },
  button:{
    width:"100%",
    padding:12,
    background:"#4caf50",
    color:"#fff",
    border:"none"
  },
  notice:{
    marginTop:15,
    fontSize:11,
    color:"#666",
    textAlign:"left"
  }
};