import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { abs } from '../data/site';
import { CATEGORIES } from '../data/categories';

// 서치 콘솔·서치어드바이저에 제출한 주소(/sitemap.xml)를 그대로 유지한다.
const HOME_UPDATED = '2026-11-23'; // 홈 내용을 고치면 이 날짜도 바꾼다
const day = (d: Date) => d.toISOString().slice(0, 10);
const last = (ds: Date[]) => ds.sort((a, b) => b.getTime() - a.getTime())[0];

export const GET: APIRoute = async () => {
  const now = Date.now();
  // 공개 글: 초안 아님 + 게시일 지남. 검색 제외 글은 사이트맵에도 넣지 않는다.
  const live = await getCollection('blog', ({ data }) => !data.draft && data.pubDate.getTime() <= now);
  const indexed = live.filter((p) => !p.data.noindex)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
  const mod = (p: (typeof live)[number]) => p.data.updatedDate ?? p.data.pubDate;

  const urls: { loc: string; lastmod: string }[] = [{ loc: abs('/'), lastmod: HOME_UPDATED }];
  if (live.length) {
    urls.push({ loc: abs('/blog/'), lastmod: day(last(live.map(mod))) });
    // 분류 페이지는 글 3편 이상일 때만 (그보다 적으면 페이지가 검색 제외)
    for (const c of CATEGORIES) {
      const list = live.filter((p) => p.data.category === c.slug);
      if (list.length >= 3) urls.push({ loc: abs(`/blog/category/${c.slug}/`), lastmod: day(last(list.map(mod))) });
    }
    for (const p of indexed) urls.push({ loc: abs(`/blog/${p.id}/`), lastmod: day(mod(p)) });
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
