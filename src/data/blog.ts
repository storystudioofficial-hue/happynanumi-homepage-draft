import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** 공개 빌드에서는 초안을 빼고, 맥 미리보기(dev)에서는 초안도 보여 준다. */
export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/** 2026-11-16 → 2026. 11. 16. */
export const fmtDate = (d: Date) =>
  `${d.getUTCFullYear()}. ${d.getUTCMonth() + 1}. ${d.getUTCDate()}.`;

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
