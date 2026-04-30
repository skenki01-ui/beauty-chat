export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "method error" });
    }

    const body = req.body;

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

    const textLog = body.messages
      .map((m) => `${m.role === "user" ? "ユーザー" : "AI"}：${m.text}`)
      .join("\n");

    // 🔥 チャット
    if (body.type === "chat") {
      let prompt = "";

      // 🔹相談モード
      if (body.mode === "consult") {
        prompt = `
あなたは店舗のカウンセリングAIです。

・日本語で回答
・やさしく
・提案は自然に

【カルテ】
${JSON.stringify(body.karute)}

【会話】
${textLog}

次の返答を作成してください。
`;
      }

      // 🔹案内モード
      if (body.mode === "guide") {
        prompt = `
あなたは店舗案内AIです。

・日本語で回答
・簡潔
・わかりやすく

【会話】
${textLog}

質問に答えてください。
`;
      }

      const data = await callAI(prompt);

      const text =
        data.output_text ||
        data.output?.[0]?.content?.[0]?.text ||
        "エラー";

      return res.json({ reply: text });
    }

    // 🔥 要約
    if (body.type === "summary") {
      let prompt = "";

      if (body.mode === "consult") {
        prompt = `
以下をカルテとしてまとめてください。

【カルテ】
${JSON.stringify(body.karute)}

【会話】
${textLog}

▼形式
【悩み】
・

【要望】
・

【提案内容】
・
`;
      }

      if (body.mode === "guide") {
        prompt = `
以下のやり取りを簡潔にまとめてください。

【会話】
${textLog}

▼形式
【問い合わせ内容】
・

【対応内容】
・
`;
      }

      const data = await callAI(prompt);

      const text =
        data.output_text ||
        data.output?.[0]?.content?.[0]?.text ||
        "要約エラー";

      return res.json({ summary: text });
    }

    return res.status(400).json({ error: "invalid" });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "server error" });
  }
}