// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// 글 관리 화면(Keystatic)은 지금은 맥에서 `npm run dev`로 띄울 때만 켠다.
// 공개 사이트(build)는 관리 화면 없이 순수 정적 파일로 나간다.
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://happy-nanumi.com',
  trailingSlash: 'ignore',
  integrations: isDev ? [react(), keystatic()] : [],
});
