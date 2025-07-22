// src/js/clustering.js
import { nodes, edges } from './network.js';
import { generateClusterLabel } from './similarity.js';
import { addWordToGraph } from './graph.js';

/** K-means 클러스터링 */
function kMeans(vectors, k) {
  // ...구현 (이전 로직 복사) …
}

/** 클러스터 배치 및 스타일 적용 */
export function performClustering() {
  const all = nodes.get();
  if (all.length < 3) return;
  const k = Math.min(Math.ceil(all.length / 3), 6);
  const vectors = all.map(n => n.vector);
  const labels  = kMeans(vectors, k);
  // …노드 위치 및 색상 업데이트 로직…
}

export function generateLabels() {
  // …클러스터별 LLM 라벨링 호출…
}

export function autoCluster() {
  // …8초 주기 performClustering 토글…
}

export function clearGraph() {
  if (confirm('초기화하시겠습니까?')) {
    nodes.clear(); edges.clear();
  }
}

