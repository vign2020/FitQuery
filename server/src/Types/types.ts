import { Index, RecordMetadata } from "@pinecone-database/pinecone";

interface I_reserach_metadata {
  title: string;
  abstract: string;
}
export interface I_research_data {
  data: I_reserach_metadata[];
}
export interface I_research_chunk {
  id?: number | string;
  title?: string;
  embedding: number[];
  abstract: string;
  namespace_id?: number;
  namespace_name?: Index<RecordMetadata>;
}
export interface I_textChunks {
  id: number;
  score: number;
  values: number[] | [];
  metadata: {
    title: string;
    abstract: string;
  };
}
export interface I_author {
  authorId: string;
  name: string;
}
export interface I_PaperContent {
  paperId: string;
  abstract: string;
  namespace_id?: number;
  namespace_name?: Index<RecordMetadata>;
}
export interface Topics {
  title: string;
  namespace_id?: number;
  namespace_name?: Index<RecordMetadata>;
  count?: number;
}
