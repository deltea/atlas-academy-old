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
    podcast: EntryFieldTypes.Array<EntryFieldTypes.Symbol>,
    featured: EntryFieldTypes.Boolean,
  }
}

export type Continent = "Asia" | "Americas" | "Africa" | "Europe" | "Middle East";

export interface Destination {
  contentTypeId: "destination",
  fields: {
    name: EntryFieldTypes.Text,
    slug: EntryFieldTypes.Text,
    short: EntryFieldTypes.Text,
    cover: EntryFieldTypes.AssetLink,
    description: EntryFieldTypes.RichText,
    continent: EntryFieldTypes.Text<Continent>,
    heading: EntryFieldTypes.Text,
    code: EntryFieldTypes.Text,
  }
}

export interface GalleryPhoto {
  contentTypeId: "galleryPhoto",
  fields: {
    title: EntryFieldTypes.Text,
    slug: EntryFieldTypes.Text,
    description: EntryFieldTypes.Text,
    image: EntryFieldTypes.AssetLink,
    date: EntryFieldTypes.Date,
    city: EntryFieldTypes.Text,
    country: EntryFieldTypes.EntryLink<Destination>
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
