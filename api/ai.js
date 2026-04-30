export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "method error" });
    }

    const body = req.body;

    // 🔹 AI呼び出し
    const callAI = async (input) => {
      const r = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          input: [
            {
              role: "system",
              content: "必ず日本語で回答してください。",
            },
            {
              role: "user",
              content: input,
            },
          ],
        }),
      });

      const data = await r.json();

      // 🔥 安定抽出
      const text =
        data.output?.[0]?.content?.[0]?.text ||
        data.output_text ||
        "AI応答エラー";

      return text;
    };

    // 🔹ログ整形
    const textLog = (body.messages || [])
      .map((m) =>
        `${m.role === "user" ? "ユーザー" : "AI"}：${m.text}`
      )
      .join("\n");

    // =========================================
    // 🔥 チャット
    // =========================================
    if (body.type === "chat") {
      let prompt = "";

      if (body.mode === "consult") {
        prompt = `
あなたは店舗のカウンセリング担当です。

ルール：
・必ず日本語
・やさしく寄り添う
・専門用語は避ける
・売り込みしすぎない

【カルテ】
${JSON.stringify(body.karute)}

【会話】
${textLog}

自然な返答を1つ作成してください。
`;
      }

      if (body.mode === "guide") {
        prompt = `
あなたは店舗の案内スタッフです。

ルール：
・必ず日本語
・簡潔に
・わかりやすく

【会話】
${textLog}

質問に対して自然に答えてください。
`;
      }

      const text = await callAI(prompt);

      return res.json({ reply: text });
    }

    // =========================================
    // 🔥 要約
    // =========================================
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
以下のやり取りをまとめてください。

【会話】
${textLog}

▼形式
【問い合わせ内容】
・

【対応内容】
・
`;
      }

      const text = await callAI(prompt);

      return res.json({ summary: text });
    }

    return res.status(400).json({ error: "invalid type" });

  } catch (e) {
    console.error("AI ERROR:", e);
    return res.status(500).json({ error: "server error" });
  }
}