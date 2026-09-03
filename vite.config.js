import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** GitHub Pages 프로젝트 페이지 경로(/my-portfolio/)에 맞춰 base 설정 */
export default defineConfig({
  plugins: [react()],
  base: '/my-portfolio/',
  build: {
    rollupOptions: {
      output: {
        /**
         * 벤더를 성격별로 분리한다.
         * 라이브러리는 앱 코드보다 훨씬 드물게 바뀌므로,
         * 따로 떼어 두면 재배포 시 브라우저 캐시를 그대로 재사용할 수 있다.
         *
         * Vite 8(Rolldown)은 manualChunks 를 함수 형태로만 받는다.
         *
         * @param {string} id - 모듈의 절대 경로
         * @returns {string|undefined} 청크 이름 (없으면 기본 분할에 맡김)
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined;
          }

          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) {
            return 'vendor-react';
          }

          if (/[\\/]node_modules[\\/](@mui|@emotion)[\\/]/.test(id)) {
            return 'vendor-mui';
          }

          if (/[\\/]node_modules[\\/]@supabase[\\/]/.test(id)) {
            return 'vendor-supabase';
          }

          return 'vendor';
        },
      },
    },
  },
});
