declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BACKEND_URL: string | undefined;
      NEXT_PUBLIC_APP_ID: string | undefined;
    }
  }
}

export {};
