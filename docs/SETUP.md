### 실시간 및 데이터베이스
- Supabase 설정  
  1. supabase.io 프로젝트 생성  
  2. 테이블 `words(word text, inserted_at timestamp default now())` 생성  
  3. 환경변수 설정:  
     ```bash
     SUPABASE_URL=...
     SUPABASE_ANON_KEY=...
     OPENAI_API_KEY=...
     ```
- WebSocket: Supabase Realtime 사용 (클라이언트에서 구독)
