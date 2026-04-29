export default function Answer({ karute, setPage }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>カルテ確認</h3>

        <p>部位：{karute.parts.join(" / ")}</p>
        <p>悩み：{karute.trouble}</p>
        <p>期間：{karute.period}</p>
        <p>理想：{karute.ideal}</p>
        <p>不安：{karute.worry}</p>

        <button style={styles.button} onClick={() => setPage("result")}>
          診断する
        </button>
      </div>
    </div>
  );
}

const styles = {
  container:{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"#f5f7fa"},
  card:{background:"#fff",padding:20,borderRadius:10,width:320},
  button:{width:"100%",padding:12,background:"#2196f3",color:"#fff",border:"none"}
};