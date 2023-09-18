/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly CONTENTFUL_SPACE_ID: string;
  readonly CONTENTFUL_DELIVERY_TOKEN: string;
  readonly CONTENTFUL_PREVIEW_TOKEN: string;

  readonly NOTION_KEY: string;
  readonly NOTION_POSTS_DATABASE_ID: string;
  readonly NOTION_DESINATIONS_DATABASE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
