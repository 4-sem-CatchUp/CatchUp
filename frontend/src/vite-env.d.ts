/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEV: boolean
  readonly PROD: boolean
  readonly MODE: string
  // Tilføj evt. dine egne env variabler her:
  // readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}