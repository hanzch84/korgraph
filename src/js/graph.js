// src/js/graph.js
import { nodes, edges } from './network.js';
import { findMostSimilarWord, generateAdvancedWordVector } from './similarity.js';

/** 제출 단어를 로컬 스토리지에 저장 */
export function submitWordToStorage(word) {
  const list = JSON.parse(localStorage.getItem('submittedWords') || '[]');
  list.push({ word, timestamp: Date.now() });
  localStorage.setItem('submittedWords', JSON.stringify(list));
}

/** 단어 추가 및 엣지 생성 */
export async function addWordToGraph(word) {
  const trimmed = word.trim();
  if (!trimmed) return;
  const vec = generateAdvancedWordVector(trimmed);
  if (nodes.get(trimmed)) {
    const item = nodes.get(trimmed);
    item.value++; // 횟수 증가
    nodes.update(item);
  } else {
    nodes.add({ id: trimmed, label: trimmed, value: 1 });
    const sim = await findMostSimilarWord(trimmed);
    if (sim && sim.similarity > 0.4) {
      edges.add({
        id: `${sim.word}-${trimmed}`,
        from: sim.word,
        to: trimmed,
        label: `${(sim.similarity * 100).toFixed(1)}%`,
        value: sim.similarity * 3
      });
    }
  }
}
