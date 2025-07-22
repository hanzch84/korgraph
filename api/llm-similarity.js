// api/llm-similarity.js
import { OpenAIApi, Configuration } from 'openai'
const cfg = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(cfg)

export default async function handler(req, res) {
  const { words } = req.body  // ["강아지","고양이",...]
  const prompt = `
    다음 단어들을 보고 공통된 주제를 한 글자 이모지+키워드 형태로 만들어줘:
    ${words.join(',')}
  `
  const chat = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role:'user', content: prompt }],
    temperature: 0.7
  })
  res.status(200).json({ label: chat.choices[0].message.content.trim() })
}
