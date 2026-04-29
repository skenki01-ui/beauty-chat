export default function Result({ karute, setPage }) {
  const result = getType(karute);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>診断結果</h2>

        <h3 style={{ color: "#4caf50" }}>{result.title}</h3>

        <p style={{ marginTop: 10 }}>{result.desc}</p>

        <button
          style={styles.button}
          onClick={() => setPage("chat")}
        >
          詳しく相談する
        </button>

        <button
          style={styles.back}
          onClick={() => setPage("home")}
        >
          終了
        </button>
      </div>
    </div>
  );
}

/* ===== 診断ロジック ===== */
function getType(karute) {
  const { trouble, period } = karute;

  if (trouble === "たるみ" && period === "最近") {
    return {
      title: "たるみ初期タイプ",
      desc: "早めのケアで改善しやすい状態です",
    };
  }

  if (trouble === "たるみ" && period !== "最近") {
    return {
      title: "たるみ定着タイプ",
      desc: "継続的なケアが重要になります",
    };
  }

  if (trouble === "シワ") {
    return {
      title: "乾燥シワタイプ",
      desc: "保湿とケアで改善が期待できます",
    };
  }

  if (trouble === "毛穴") {
    return {
      title: "毛穴開きタイプ",
      desc: "皮脂と角質ケアが重要です",
    };
  }

  return {
    title: "バランスケアタイプ",
    desc: "全体的なケアをおすすめします",
  };
}

/* ===== スタイル ===== */
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa",
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 320,
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#2196f3",
    color: "#fff",
    border: "none",
    marginTop: 10,
  },
  back: {
    width: "100%",
    padding: 10,
    background: "#aaa",
    color: "#fff",
    border: "none",
    marginTop: 10,
  },
};