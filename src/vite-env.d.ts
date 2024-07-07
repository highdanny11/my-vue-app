/// <reference types="vite/client" />
declare module '@/assets/pdf.worker.min.mjs'
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>
  export default component
}