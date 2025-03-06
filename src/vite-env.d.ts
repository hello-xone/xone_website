/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_GOOGLE_CLIENT_ID: string;
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_PROJECT_ID: string;
  readonly VITE_APP_XOC_MIGRATE_ADDRESS: string;
  readonly VITE_APP_XOC_RELEASE_ADDRESS: string;
  readonly VITE_APP_XOC_TEAM_RELEASE_ADDRESS: string;
  readonly VITE_APP_WXOC_ADDRESS: string;
  readonly VITE_APP_TEST_CHAIN_ID: number;
  readonly VITE_APP_MAIN_CHAIN_ID: number;
  readonly VITE_APP_TEST_RPC_URL: string;
  readonly VITE_APP_MAIN_RPC_URL: string;
  readonly VITE_APP_TEST_BLOCK_EXPLORER_URL: string;
  readonly VITE_APP_MAIN_BLOCK_EXPLORER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly VITE_APP_GOOGLE_CLIENT_ID: string;
    readonly VITE_APP_BASE_URL: string;
    readonly VITE_APP_PROJECT_ID: string;
    readonly VITE_APP_XOC_MIGRATE_ADDRESS: string;
    readonly VITE_APP_XOC_RELEASE_ADDRESS: string;
    readonly VITE_APP_XOC_TEAM_RELEASE_ADDRESS: string;
    readonly VITE_APP_WXOC_ADDRESS: string;
    readonly VITE_APP_TEST_CHAIN_ID: number;
    readonly VITE_APP_MAIN_CHAIN_ID: number;
    readonly VITE_APP_TEST_RPC_URL: string;
    readonly VITE_APP_MAIN_RPC_URL: string;
    readonly VITE_APP_TEST_BLOCK_EXPLORER_URL: string;
    readonly VITE_APP_MAIN_BLOCK_EXPLORER_URL: string;
  }
}
