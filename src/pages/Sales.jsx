export default function Sales({ setPage }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>導入の流れ</h2>

        <div style={styles.step}>
          <h4>① お客様が入力</h4>
          <p>タブレットで簡単にヒアリング</p>
        </div>

        <div style={styles.step}>
          <h4>② 自動で整理</h4>
          <p>要点だけまとめて表示</p>
        </div>

        <div style={styles.step}>
          <h4>③ 店舗で確認</h4>
          <p>カルテ一覧で一目で把握</p>
        </div>

        <hr />

        <h3>特徴</h3>

        <ul style={styles.list}>
          <li>✔ 待ち時間の有効活用</li>
          <li>✔ カルテ記入の手間削減</li>
          <li>✔ ヒアリングの質向上</li>
        </ul>

        <hr />

        <h3>安心してご利用いただけます</h3>

        <div style={styles.notice}>
          <p>※入力内容はこの端末内でのみ管理されます</p>
          <p>※個人を特定する情報は保存されません</p>
          <p>※チャット内容は共有されません</p>
        </div>

        <button
          style={styles.button}
          onClick={() => setPage("home")}
        >
          戻る
        </button>
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
    width:320
  },
  step:{
    marginBottom:10
  },
  list:{
    paddingLeft:15,
    fontSize:13
  },
  notice:{
    fontSize:11,
    color:"#666",
    marginTop:10
  },
  button:{
    width:"100%",
    padding:12,
    marginTop:10,
    background:"#2196f3",
    color:"#fff",
    border:"none"
  }
};