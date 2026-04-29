import { useEffect, useState } from "react";

export default function List({ setPage }) {
  const [list, setList] = useState([]);
  const [mode, setMode] = useState("simple"); // simple / assist

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("karuteList") || "[]");
    setList(data);
  }, []);

  const format = (item) => {
    if (mode === "simple") {
      return `名前,部位,悩み,期間,理想,不安
${item.name},${item.parts.join("/")},${item.trouble},${item.period},${item.ideal},${item.worry}`;
    }

    // assistモード（軽い整理だけ）
    return `名前,部位,悩み,期間,理想,不安,ポイント
${item.name},${item.parts.join("/")},${item.trouble},${item.period},${item.ideal},${item.worry},
${item.trouble}が主な関心`;
  };

  const copy = (item) => {
    navigator.clipboard.writeText(format(item));
    alert("コピーしました");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>カルテ一覧</h2>

        {/* モード切替 */}
        <div style={styles.switch}>
          <button
            style={mode === "simple" ? styles.active : styles.btn}
            onClick={() => setMode("simple")}
          >
            要点のみ
          </button>

          <button
            style={mode === "assist" ? styles.active : styles.btn}
            onClick={() => setMode("assist")}
          >
            軽い整理
          </button>
        </div>

        {list.map((item, i) => (
          <div key={i} style={styles.box}>
            <p>名前：{item.name}</p>
            <p>部位：{item.parts.join("/")}</p>
            <p>悩み：{item.trouble}</p>

            {mode === "assist" && (
              <p style={{ color: "#888" }}>
                ポイント：{item.trouble}が主な関心
              </p>
            )}

            <button onClick={() => copy(item)}>コピー</button>
          </div>
        ))}

        <button onClick={() => setPage("home")}>戻る</button>
      </div>
    </div>
  );
}

const styles = {
  container:{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"#f5f7fa"},
  card:{background:"#fff",padding:20,width:320},
  box:{border:"1px solid #ddd",padding:10,marginBottom:10},
  switch:{display:"flex",gap:5,marginBottom:10},
  btn:{padding:6},
  active:{padding:6,background:"#4caf50",color:"#fff"}
};