// src/js/ui.js
/** AI 상태 업데이트 */
export function updateAIStatus(msg) {
  document.getElementById('aiStatus').innerHTML = `<strong>${new Date().toLocaleTimeString()}</strong><br>${msg}`;
}

/** 통계판 업데이트 */
export function updateStats() {
  const total = nodes.get().reduce((sum,n) => sum + n.value, 0);
  document.getElementById('totalWords').textContent = total;
  document.getElementById('uniqueWords').textContent = nodes.getLength();
}

/** 단어 목록 렌더 */
export function updateWordList() {
  const ctr = document.getElementById('wordListContainer');
  ctr.innerHTML = nodes.get().map(n => `<div class="word-item"><span>${n.label}</span><span>${n.value}</span></div>`).join('');
}

/** 클러스터 정보 렌더 */
export function updateClusterDisplay() {
  const ctr = document.getElementById('clustersContainer');
  // …클러스터별 DOM 업데이트 로직…
}
