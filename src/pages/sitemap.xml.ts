import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { abs } from '../data/site';

// 서치 콘솔·서치어드바이저에 제출한 주소(/sitemap.xml)를 그대로 유지한다.
const HOME_UPDATED = '2026-11-06'; // 홈 내용을 고치면 이 날짜도 바꾼다
const day = (d: Date) => d.toISOString().slice(0, 10);

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
  const urls: { loc: string; lastmod: string }[] = [{ loc: abs('/'), lastmod: HOME_UPDATED }];
  if (posts.length) {
    const newest = posts.map((p) => p.data.updatedDate ?? p.data.pubDate).sort((a, b) => b.getTime() - a.getTime())[0];
    urls.push({ loc: abs('/blog/'), lastmod: day(newest) });
    for (const p of posts) urls.push({ loc: abs(`/blog/${p.id}/`), lastmod: day(p.data.updatedDate ?? p.data.pubDate) });
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
