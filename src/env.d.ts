declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BACKEND_URL: string | undefined;
      NEXT_PUBLIC_APP_ID: string | undefined;
      ACCESS_CONTROL_ALLOW_ORIGIN: string | undefined;
      ACCESS_CONTROL_ALLOW_METHODS: string | undefined;
    }
  }
}

export {};
