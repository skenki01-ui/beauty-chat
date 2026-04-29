export default async function handler(req, res) {
  try {
    // POST以外は拒否
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "No message" });
    }

    // AIリクエスト
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",

        input: `
あなたはユーザーに寄り添う会話AIです。

ルール：
・否定しない
・押し付けない
・自然な会話
・短すぎず長すぎず
・依存させない

さらに、
ユーザーの言語を自動判定し、その言語で返答してください。

内容：
${userMessage}
`
      })
    });

    const data = await response.json();

    // レスポンス抽出（安全）
    const text =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "ごめん、うまく返答できなかった";

    return res.status(200).json({ text });

  } catch (error) {
    console.error("APIエラー:", error);
    return res.status(500).json({ error: "server error" });
  }
}