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

  const handleNext = () => {
    const data = { name, parts, trouble, period, ideal, worry };

    const old = JSON.parse(localStorage.getItem("karuteList") || "[]");
    const updated = [data, ...old].slice(0, 3); // 最大3件

    localStorage.setItem("karuteList", JSON.stringify(updated));

    setKarute(data);
    setPage("answer");
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
              type="button"
              style={{
                ...styles.tag,
                background: parts.includes(p) ? "#4caf50" : "#eee",
                color: parts.includes(p) ? "#fff" : "#000"
              }}
              onClick={() => togglePart(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <p>悩み</p>
        <select
          style={styles.input}
          value={trouble}
          onChange={(e) => setTrouble(e.target.value)}
        >
          <option value="">選択</option>
          <option value="たるみ">たるみ</option>
          <option value="シワ">シワ</option>
          <option value="毛穴">毛穴</option>
          <option value="くすみ">くすみ</option>
          <option value="ニキビ">ニキビ</option>
        </select>

        <p>期間</p>
        <select
          style={styles.input}
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="">選択</option>
          <option value="最近">最近</option>
          <option value="数ヶ月前">数ヶ月前</option>
          <option value="1年以上">1年以上</option>
        </select>

        <p>理想</p>
        <input
          style={styles.input}
          value={ideal}
          onChange={(e) => setIdeal(e.target.value)}
        />

        <p>不安</p>
        <input
          style={styles.input}
          value={worry}
          onChange={(e) => setWorry(e.target.value)}
        />

        <button style={styles.button} onClick={handleNext}>
          次へ
        </button>

        <div style={styles.notice}>
          <p>※この端末内のみで管理されます</p>
          <p>※個人情報は保存されません</p>
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
    width:320,
    borderRadius:10,
    boxShadow:"0 2px 10px rgba(0,0,0,0.1)"
  },
  row:{
    display:"flex",
    flexWrap:"wrap",
    gap:5,
    marginBottom:10
  },
  tag:{
    padding:"6px 10px",
    borderRadius:6,
    border:"none",
    cursor:"pointer"
  },
  input:{
    width:"100%",
    padding:8,
    marginBottom:10,
    borderRadius:6,
    border:"1px solid #ccc"
  },
  button:{
    width:"100%",
    padding:12,
    background:"#4caf50",
    color:"#fff",
    border:"none",
    borderRadius:6,
    cursor:"pointer"
  },
  notice:{
    fontSize:11,
    color:"#666",
    marginTop:10
  }
};