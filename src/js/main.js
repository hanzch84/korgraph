// src/js/main.js

// ——————————————————————————————————————————————————
// 1) 모듈 import
// ——————————————————————————————————————————————————
import { initNetwork } from './network.js';
import { subscribeNewWords, checkSubmittedWords } from './realtime.js';
import { generateQR, checkMode } from './utils.js';
import {
  addWordToGraph,
  submitWordToStorage
} from './graph.js';
import {
  performClustering,
  generateLabels,
  autoCluster,
  clearGraph
} from './clustering.js';
import {
  updateAIStatus,
  updateStats,
  updateWordList,
  updateClusterDisplay
} from './ui.js';


// ——————————————————————————————————————————————————
// 2) HTML inline 호출용 전역 함수 노출
// ——————————————————————————————————————————————————
window.addWord = () => {
  const input = document.getElementById('wordInput');
  const word = input.value.trim();
  if (!word) return;
  addWordToGraph(word);
  input.value = '';
};

window.submitWord = () => {
  const input = document.getElementById('submitInput');
  const word = input.value.trim();
  if (!word) return;
  submitWordToStorage(word);
  input.value = '';
};

window.performClustering = performClustering;
window.generateLabels      = generateLabels;
window.autoCluster         = autoCluster;
window.clearGraph          = clearGraph;


// ——————————————————————————————————————————————————
// 3) 초기화 및 이벤트 바인딩
// ——————————————————————————————————————————————————
document.addEventListener('DOMContentLoaded', () => {
  // 1) QR 모드 체크 (submit 페이지 분기)
  checkMode();

  // submit 모드가 아니면 메인 로직 실행
  if (!window.location.search.includes('mode=submit')) {
    // 2) 네트워크(Vis.js) 초기화
    initNetwork('network');

    // 3) QR 코드 생성
    generateQR();

    // 4) AI 상태 초기 메시지
    updateAIStatus('시스템 초기화 완료');

    // 5) Supabase Realtime 구독 (다중 접속 단어 동기화)
    subscribeNewWords(addWordToGraph);

    // 6) 로컬 스토리지 제출 단어 주기적 확인
    setInterval(checkSubmittedWords, 2000);

    // 7) 샘플 단어 자동 추가
    ['강아지','고양이','축구','야구','학교','친구']
      .forEach((word, i) => {
        setTimeout(() => addWordToGraph(word), 500 + i * 800);
      });
  }
});
