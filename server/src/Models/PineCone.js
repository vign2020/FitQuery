// import { Pinecone } from "@pinecone-database/pinecone";
const { Pinecone } = require("@pinecone-database/pinecone");

export const pc = new Pinecone({
  apiKey:
    "pcsk_ioxkP_QZchKUAfpdCcST7BRgTNMKCtQdtHJR12wpHbrrctxja6X3DEuwUwhUbjYUXbkWL",
});

// export const namespace = pc
//   .index(
//     "yt-semantic-search",
//     "https://yt-semantic-search-okuppnk.svc.aped-4627-b74a.pinecone.io"
//   )
//   .namespace("namespace-one");
