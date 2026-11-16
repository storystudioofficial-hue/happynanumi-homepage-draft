import { config, fields, collection } from '@keystatic/core';

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
        pubDate: fields.date({ label: '게시일', defaultValue: { kind: 'today' }, validation: { isRequired: true } }),
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
