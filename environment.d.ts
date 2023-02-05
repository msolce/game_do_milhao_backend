import { Secret } from "jsonwebtoken";

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: number;
        URI_DB: string;
        JWT_SECRET: Secret;
        GAME_DO_MILHAO_NS:string;
        HEADER_START: string;
        REQ_TRIVIA_01: URL;
        
      }
    }
  }

  export {};