export default async function handler(req, res) {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `ユーザーの言語を自動判定して、その言語で自然に返答してください。

内容：
${userMessage}`
      })
    });

    const data = await response.json();

    const text =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "返答なし";

    res.status(200).json({ text });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
}