// 사이트 전체에서 같이 쓰는 기관 정보. 바꿀 때는 이 파일 한 곳만 고친다.
export const SITE = {
  url: 'https://happy-nanumi.com',
  name: '행복나누미복지센터',
  kind: '방문요양 · 바우처 제공기관',
  tel: '062-419-1754',
  telHref: 'tel:0624191754',
  sms: '010-9884-2040',
  smsHref: 'sms:01098842040',
  address: '전남광주통합특별시 광산구 왕버들로251번길 10, 4층',
  addressOld: '신창동 1125-3',
  naverMap: 'https://map.naver.com/p/entry/place/2042496230',
  naverBlog: 'https://blog.naver.com/happy-nanumi',
  ogImage: 'https://happy-nanumi.com/og-image.jpg',
} as const;

export const abs = (path: string) => new URL(path, SITE.url).href;
