declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: number;
        URI_DB: string;
        JWT_SECRET: string;
        GAME_DO_MILHAO_NS:string;
        HEADER_START: string;
        REQ_TRIVIA_01: string;
        
      }
    }
  }

  export {};