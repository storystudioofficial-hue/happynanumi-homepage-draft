# 행복나누미복지센터 홈페이지

공개 주소: https://happy-nanumi.com (Vercel, `main` 브랜치에 푸시하면 자동 배포)

## 구조 (Astro)

| 위치 | 내용 |
|---|---|
| `src/pages/index.astro` | 홈 (v20 정적 페이지를 그대로 옮김) |
| `src/pages/blog/` | 홈페이지 SEO 블로그 목록·글 페이지 |
| `src/content/blog/*.md` | 블로그 글 파일. `draft: true`면 공개 빌드에서 빠짐 |
| `src/data/site.ts` | 기관 이름·전화·주소 (한 곳에서 고침) |
| `src/styles/global.css` | 홈과 공통 디자인 / `blog.css`는 블로그 전용 |
| `public/` | 이미지·글꼴·robots.txt·privacy.html |
| `src/pages/sitemap.xml.ts` | `/sitemap.xml` 자동 생성 (공개 글만) |

네이버 블로그(blog.naver.com/happy-nanumi)와는 별개 채널이다. 글을 복사해 넣지 않는다.

## 블로그 글 항목 (Keystatic 오른쪽 칸)

| 칸 | 하는 일 |
|---|---|
| 분류 | 목록 위 분류 버튼, 분류 페이지(`/blog/category/<분류>/`), 관련 글 고르기에 쓰임. 목록은 `src/data/categories.ts` |
| 게시일 | 오늘보다 뒤면 그날 이후 빌드부터 공개 (자동 재빌드는 아직 없음) |
| 초안 | 체크되어 있으면 공개 사이트에 안 나감 |
| 검색 제목 | 비우면 「글 제목 \| 행복나누미복지센터」 |
| 공유 이미지 | 비우면 센터 대표 이미지 |
| 목차 보이기 | 큰 소제목(##) 3개 이상일 때 글 앞에 목차 |
| 검색에서 빼기 | 공개는 하되 검색·사이트맵에서 제외 |
| 예전 글 주소 | 주소를 바꿨을 때 예전 주소로 온 사람을 새 글로 보냄 |

- 분류 페이지는 글이 3편 미만이면 검색 제외, 사이트맵에도 넣지 않는다.
- 공개 글이 생기면 머리말과 바닥글에 '블로그' 링크가 자동으로 생긴다.

## 맥에서 미리보기

```
npm install
npm run dev        # http://127.0.0.1:4321 (초안 글도 보임)
npm run build      # 공개용 빌드 → dist/
```

## 글 관리 화면 (Keystatic)

- Keystatic: `npm run dev` 후 http://127.0.0.1:4321/keystatic (맥 파일에 바로 저장)
- 관리 화면은 공개 빌드에는 들어가지 않는다.
