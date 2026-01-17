// const { Pinecone } = require("@pinecone-database/pinecone");
import { Pinecone } from "@pinecone-database/pinecone";
const apiKey = process.env.PINECONE_API_KEY;
export const pc = new Pinecone({
  apiKey: apiKey,
});

export const namespace_two = pc
  .index(
    "yt-semantic-search",
    "https://yt-semantic-search-okuppnk.svc.aped-4627-b74a.pinecone.io"
  )
  .namespace(`namespace-two`);

export const namespace_three = pc
  .index(
    "yt-semantic-search",
    "https://yt-semantic-search-okuppnk.svc.aped-4627-b74a.pinecone.io"
  )
  .namespace(`namespace-three`);

export const namespace_four = pc
  .index(
    "yt-semantic-search",
    "https://yt-semantic-search-okuppnk.svc.aped-4627-b74a.pinecone.io"
  )
  .namespace(`namespace-four`);

export const namespace_five = pc
  .index(
    "yt-semantic-search",
    "https://yt-semantic-search-okuppnk.svc.aped-4627-b74a.pinecone.io"
  )
  .namespace(`namespace-five`);

export const namespace_misc = pc
  .index(
    "yt-semantic-search",
    "https://yt-semantic-search-okuppnk.svc.aped-4627-b74a.pinecone.io"
  )
  .namespace(`namespace-misc`);
