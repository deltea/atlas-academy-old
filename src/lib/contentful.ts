import contentful, { EntryFieldTypes } from "contentful";

export interface BlogPost {
  contentTypeId: "blogPost",
  fields: {
    title: EntryFieldTypes.Text,
    slug: EntryFieldTypes.Text,
    type: EntryFieldTypes.Text,
    date: EntryFieldTypes.Date,
    content: EntryFieldTypes.RichText,
    cover: EntryFieldTypes.AssetLink,
    destination: EntryFieldTypes.EntryLink<Destination>,
  }
}

export interface Destination {
  contentTypeId: "destination",
  fields: {
    name: EntryFieldTypes.Text,
    slug: EntryFieldTypes.Text,
    cover: EntryFieldTypes.AssetLink,
    description: EntryFieldTypes.RichText,
    continent: EntryFieldTypes.Text,
    heading: EntryFieldTypes.Text
  }
}

const contentfulBaseClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});

export const contentfulClient = contentfulBaseClient.withoutUnresolvableLinks;
