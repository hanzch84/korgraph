# API 문서

## 임베딩
- `POST /api/embeddings/openai`  
  - body: `{ "text": "강아지" }`  
  - returns: `{ "embedding": [..] }`

- `POST /api/embeddings/kosentencebert`  

## 유사도·클러스터링
- `POST /api/llm-similarity`  
  - body: `{ "words": ["강아지","고양이"] }`  
  - returns: `{ "label": "🐾 동물" }`
