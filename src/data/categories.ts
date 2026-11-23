// 블로그 분류. 글 파일에는 slug(영문)가 저장되고, 화면에는 label이 보인다.
// [임시] IRON 확인 전 초안. 이름은 바꿔도 되지만 slug를 바꾸면 분류 페이지 주소가 바뀐다.
export const CATEGORIES = [
  { slug: 'apply', label: '장기요양 신청·등급', desc: '등급 신청부터 판정, 갱신까지의 순서' },
  { slug: 'use', label: '방문요양 이용', desc: '계약, 방문 계획, 이용 중 바꾸고 싶을 때' },
  { slug: 'cost', label: '비용·제도', desc: '본인부담금, 월 한도액, 감경 같은 제도' },
  { slug: 'health', label: '치매·건강', desc: '치매, 낙상, 식사처럼 집에서 살필 것' },
  { slug: 'family', label: '보호자 안내', desc: '멀리 사는 자녀, 맞벌이 보호자가 챙길 것' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];
export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [CategorySlug, ...CategorySlug[]];
export const categoryOf = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
