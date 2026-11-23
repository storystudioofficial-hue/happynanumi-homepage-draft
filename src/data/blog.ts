import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

const DEV = import.meta.env.DEV;

/**
 * 공개 빌드: 초안과 게시일이 아직 안 된 글을 뺀다.
 * 맥 미리보기(dev): 전부 보여 준다 (초안·예약 표시가 붙음).
 */
export async function getPosts(): Promise<Post[]> {
  const now = Date.now();
  const all = await getCollection('blog', ({ data }) => DEV || (!data.draft && data.pubDate.getTime() <= now));
  return all.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export const isScheduled = (p: Post) => p.data.pubDate.getTime() > Date.now();

/** 같은 분류의 최신 글을 먼저, 모자라면 다른 분류의 최신 글로 채운다. */
export function relatedPosts(post: Post, posts: Post[], n = 3): Post[] {
  const others = posts.filter((p) => p.id !== post.id);
  const same = others.filter((p) => p.data.category === post.data.category);
  const rest = others.filter((p) => p.data.category !== post.data.category);
  return [...same, ...rest].slice(0, n);
}

/** 2026-11-16 → 2026. 11. 16. */
export const fmtDate = (d: Date) =>
  `${d.getUTCFullYear()}. ${d.getUTCMonth() + 1}. ${d.getUTCDate()}.`;

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
