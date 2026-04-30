export default function Summary({ summary, setPage }) {
  const copy = () => {
    navigator.clipboard.writeText(summary);
    alert("コピーしました");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>まとめ</h2>

      <textarea
        value={summary}
        readOnly
        style={{
          width: "100%",
          height: 300,
          marginBottom: 20,
        }}
      />

      <button onClick={copy}>コピー</button>
      <button onClick={() => setPage("karute")}>戻る</button>
    </div>
  );
}