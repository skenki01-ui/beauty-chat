export default function List({ setPage }) {
  const list = JSON.parse(localStorage.getItem("karuteList") || "[]");

  return (
    <div style={styles.container}>
      <h3>カルテ一覧</h3>

      {list.length === 0 && <p>データなし</p>}

      {list.map((item, i) => (
        <div key={i} style={styles.card}>
          <p style={{ fontSize: 12, color: "#666" }}>{item.date}</p>
          <p>悩み：{item.trouble || "-"}</p>

          <pre style={styles.summary}>
            {item.summary}
          </pre>
        </div>
      ))}

      <button onClick={() => setPage("home")}>戻る</button>
    </div>
  );
}

const styles = {
  container:{padding:20},
  card:{background:"#fff",padding:10,marginBottom:10,borderRadius:8},
  summary:{fontSize:12,whiteSpace:"pre-wrap"}
};