import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 홈페이지 SEO 블로그 글. 파일 하나 = 글 하나 (src/content/blog/<주소>.md).
// 네이버 블로그 글을 복사해 넣지 않는다. 같은 주제라도 구성과 문장을 새로 쓴다.
// CMS가 빈 칸을 null이나 ''로 저장해도 '없음'으로 읽는다.
const empty = (v: unknown) => (v === null || v === '' ? undefined : v);
const optDate = z.preprocess(empty, z.coerce.date().optional());

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(1),                 // 글 제목 (검색 결과 제목에도 쓰인다)
    description: z.string().min(1),           // 검색 결과 설명, 120자 안팎
    pubDate: z.coerce.date(),                 // 처음 게시한 날
    updatedDate: optDate,                     // 내용을 고친 날
    reviewedDate: optDate,                    // 제도·법령을 마지막으로 확인한 날
    draft: z.boolean().default(true),         // true면 공개 빌드에서 빠진다
    sources: z.preprocess(
      (v) => (Array.isArray(v) ? v.filter((s) => s && s.label && s.url) : []),
      z.array(z.object({ label: z.string(), url: z.string().url() })),
    ),                                        // 근거 출처 (법령·공단 고시 등)
  }),
});

export const collections = { blog };
