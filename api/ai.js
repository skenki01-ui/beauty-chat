export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "method error" });
    }

    const body = req.body;

    console.log("受信データ", body); // ←追加

    const callAI = async (input) => {
      const r = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          input,
        }),
      });

      return r.json();
    };

    const textLog = (body.messages || [])
      .map((m) => `${m.role === "user" ? "ユーザー" : "AI"}：${m.text}`)
      .join("\n");

    // ===== チャット =====
    if (body.type === "chat") {
      let prompt = "";

      if (body.mode === "consult") {
        prompt = `
あなたは店舗のカウンセリングAIです。
日本語でやさしく回答してください。

【カルテ】
${JSON.stringify(body.karute)}

【会話】
${textLog}
`;
      }

      if (body.mode === "guide") {
        prompt = `
あなたは店舗案内AIです。
日本語で簡潔に回答してください。

【会話】
${textLog}
`;
      }

      if (!prompt) {
        return res.json({ reply: "設定エラー（mode未設定）" });
      }

      const data = await callAI(prompt);

      const text =
        data.output_text ||
        data.output?.[0]?.content?.[0]?.text ||
        "AIエラー";

      return res.json({ reply: text });
    }

    // ===== 要約 =====
    if (body.type === "summary") {
      let prompt = `
以下をまとめてください

${textLog}
`;

      const data = await callAI(prompt);

      const text =
        data.output_text ||
        data.output?.[0]?.content?.[0]?.text ||
        "要約エラー";

      return res.json({ summary: text });
    }

    return res.json({ reply: "type不明" });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "server error" });
  }
}