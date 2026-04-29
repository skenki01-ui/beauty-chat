import { useState } from "react";

export default function Karute({ setPage, name, setKarute }) {
  const [parts, setParts] = useState([]);
  const [trouble, setTrouble] = useState("");
  const [period, setPeriod] = useState("");
  const [ideal, setIdeal] = useState("");
  const [worry, setWorry] = useState("");

  const togglePart = (part) => {
    setParts((prev) =>
      prev.includes(part)
        ? prev.filter((p) => p !== part)
        : [...prev, part]
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>カルテ入力</h3>

        <p>{name}さん、気になる部位</p>

        <div style={styles.row}>
          {["額","目元","鼻","頬","唇","フェイスライン"].map((p) => (
            <button
              key={p}
              style={{
                ...styles.tag,
                background: parts.includes(p) ? "#4caf50" : "#eee",
              }}
              onClick={() => togglePart(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <p>悩み</p>
        <select style={styles.input} onChange={(e) => setTrouble(e.target.value)}>
          <option value="">選択</option>
          <option>たるみ</option>
          <option>シワ</option>
          <option>毛穴</option>
          <option>くすみ</option>
          <option>ニキビ</option>
        </select>

        <p>期間</p>
        <select style={styles.input} onChange={(e) => setPeriod(e.target.value)}>
          <option value="">選択</option>
          <option>最近</option>
          <option>数ヶ月前</option>
          <option>1年以上</option>
        </select>

        <p>理想</p>
        <input style={styles.input} onChange={(e) => setIdeal(e.target.value)} />

        <p>不安</p>
        <input style={styles.input} onChange={(e) => setWorry(e.target.value)} />

        <button
          style={styles.button}
          onClick={() => {
            const data = { name, parts, trouble, period, ideal, worry };

            const old = JSON.parse(localStorage.getItem("karuteList") || "[]");
            const updated = [data, ...old];
            localStorage.setItem("karuteList", JSON.stringify(updated));

            setKarute(data);
            setPage("answer");
          }}
        >
          次へ
        </button>

        {/* 🔴 注意文 */}
        <div style={styles.notice}>
          <p>※この端末内のみで管理されます</p>
          <p>※個人情報は保存されません</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container:{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"#f5f7fa"},
  card:{background:"#fff",padding:20,width:320},
  row:{display:"flex",flexWrap:"wrap",gap:5},
  tag:{padding:5},
  input:{width:"100%",padding:8,marginBottom:10},
  button:{width:"100%",padding:12,background:"#4caf50",color:"#fff"},
  notice:{fontSize:11,color:"#666",marginTop:10}
};