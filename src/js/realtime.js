// src/js/realtime.js
import { createClient } from '@supabase/supabase-js';
import { addWordToGraph } from './graph.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

/**
 * 다중 사용자 동기화를 위한 Supabase Realtime 구독
 */
export function subscribeNewWords(handleNew) {
  supabase
    .from('words')
    .on('INSERT', payload => handleNew(payload.new.word))
    .subscribe();
}

/**
 * 로컬 제출 단어 스토리지 확인 및 그래프 반영
 */
export function checkSubmittedWords() {
  const submitted = JSON.parse(localStorage.getItem('submittedWords') || '[]');
  const lastCheck = parseInt(localStorage.getItem('lastWordCheck') || '0', 10);
  const newWords = submitted.filter(item => item.timestamp > lastCheck);
  newWords.forEach(item => addWordToGraph(item.word));
  if (newWords.length) {
    localStorage.setItem('lastWordCheck', Date.now().toString());
  }
}
