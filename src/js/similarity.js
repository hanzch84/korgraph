import { getOpenAIEmbedding } from '../../api/embeddings/openai.js'
import { getKoSentenceEmbedding } from '../../api/embeddings/kosentencebert.js'

export async function hybridVector(word) {
  const [e1, e2] = await Promise.all([
    getOpenAIEmbedding(word),
    getKoSentenceEmbedding(word)
  ])
  // 두 임베딩을 병합하거나 가중평균
  return e1.map((v,i) => 0.5*v + 0.5*e2[i])
}

export async function cosineSimilarity(a, b) { /* 기존대로 */ }

export async function hybridSimilarity(w1, w2) {
  const [v1, v2] = await Promise.all([
    hybridVector(w1),
    hybridVector(w2)
  ])
  const vecSim = cosineSimilarity(v1, v2)
  const llmSim = await getLLMSimilarity(w1, w2)      // LLM API 호출
  return { vector: vecSim, llm: llmSim, hybrid: vecSim*0.7 + llmSim*0.3 }
}
