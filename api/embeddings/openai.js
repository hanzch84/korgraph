// api/embeddings/openai.js
import { Configuration, OpenAIApi } from 'openai'

const cfg = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(cfg)

export async function getOpenAIEmbedding(text) {
  const res = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text
  })
  return res.data[0].embedding
}
