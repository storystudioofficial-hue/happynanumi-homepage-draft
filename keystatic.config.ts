import { config, fields, collection } from '@keystatic/core';
import { CATEGORIES } from './src/data/categories';

// Keystatic 글 관리 화면 설정. 지금은 맥 로컬 모드(파일에 바로 저장)로만 쓴다.
// 접속: npm run dev 후 http://127.0.0.1:4321/keystatic
export default config({
  storage: { kind: 'local' },
  ui: { brand: { name: '행복나누미 블로그' } },
  collections: {
    blog: collection({
      label: '블로그 글',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'pubDate'],
      schema: {
        title: fields.slug({
          name: { label: '제목', validation: { length: { min: 1 } } },
          slug: {
            label: '글 주소',
            description: '영문 소문자와 하이픈으로 씁니다. 예: long-term-care-application',
          },
        }),
        description: fields.text({
          label: '검색 설명',
          description: '검색 결과에 보이는 설명입니다. 120자 안팎.',
          multiline: true,
          validation: { length: { min: 1, max: 200 } },
        }),
        category: fields.select({
          label: '분류',
          options: CATEGORIES.map((c) => ({ label: c.label, value: c.slug })),
          defaultValue: CATEGORIES[0].slug,
        }),
        pubDate: fields.date({
          label: '게시일',
          description: '오늘보다 뒤 날짜면 그날 이후 빌드부터 공개됩니다.',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        updatedDate: fields.date({ label: '고친 날' }),
        reviewedDate: fields.date({ label: '제도 확인일', description: '법령·고시를 마지막으로 확인한 날' }),
        draft: fields.checkbox({ label: '초안', description: '체크되어 있으면 공개 사이트에 나가지 않습니다.', defaultValue: true }),
        sources: fields.array(
          fields.object({
            label: fields.text({ label: '출처 이름' }),
            url: fields.url({ label: '주소' }),
          }),
          { label: '근거 출처', itemLabel: (p) => p.fields.label.value || '새 출처' },
        ),
        seoTitle: fields.text({
          label: '검색 제목 (선택)',
          description: '검색 결과에 보일 제목. 비워 두면 「글 제목 | 행복나누미복지센터」',
        }),
        ogImage: fields.image({
          label: '공유 이미지 (선택)',
          description: '카카오톡·SNS 공유 때 보이는 이미지. 1200×630 권장. 비워 두면 센터 대표 이미지',
          directory: 'public/blog-images/og',
          publicPath: '/blog-images/og/',
        }),
        toc: fields.checkbox({ label: '목차 보이기', description: '소제목이 3개 이상일 때 글 앞에 목차가 나옵니다.', defaultValue: true }),
        noindex: fields.checkbox({ label: '검색에서 빼기', description: '공개는 하되 검색 결과에는 나오지 않게 합니다.', defaultValue: false }),
        redirectFrom: fields.array(fields.text({ label: '예전 주소' }), {
          label: '예전 글 주소',
          description: '글 주소를 바꿨다면 예전 주소(영문 부분만)를 적어 두세요. 그 주소로 들어온 사람을 이 글로 보냅니다.',
          itemLabel: (p) => p.value || '예전 주소',
        }),
        // 표준 마크다운(.md)으로 저장한다. 표는 GFM 표 문법으로 남는다.
        content: fields.mdx({
          label: '본문',
          extension: 'md',
          options: {
            heading: [2, 3],
            image: { directory: 'public/blog-images', publicPath: '/blog-images/' },
          },
        }),
      },
    }),
  },
});
