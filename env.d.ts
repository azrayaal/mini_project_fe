/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_API: string;
  readonly VITE_API_V: string;
  // Tambahkan variabel environment lainnya jika ada
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
