/** @format */

// const { Pinecone } = require("@pinecone-database/pinecone");
import { Pinecone } from "@pinecone-database/pinecone";
const apiKey = process.env.PINECONE_API_KEY;
export const pc = new Pinecone({
  apiKey: apiKey,
});
const NEW_INDEX_NAME = process.env.NEW_INDEX_NAME;

export const namespace_two = pc
  .index(
    NEW_INDEX_NAME,
    "https://fit-query-v2-okuppnk.svc.aped-4627-b74a.pinecone.io",
  )
  .namespace(`namespace-two`);

export const namespace_three = pc
  .index(
    NEW_INDEX_NAME,
    "https://fit-query-v2-okuppnk.svc.aped-4627-b74a.pinecone.io",
  )
  .namespace(`namespace-three`);

export const namespace_four = pc
  .index(
    NEW_INDEX_NAME,
    "https://fit-query-v2-okuppnk.svc.aped-4627-b74a.pinecone.io",
  )
  .namespace(`namespace-four`);

export const namespace_five = pc
  .index(
    NEW_INDEX_NAME,
    "https://fit-query-v2-okuppnk.svc.aped-4627-b74a.pinecone.io",
  )
  .namespace(`namespace-five`);

export const namespace_misc = pc
  .index(
    NEW_INDEX_NAME,
    "https://fit-query-v2-okuppnk.svc.aped-4627-b74a.pinecone.io",
  )
  .namespace(`namespace-misc`);
