export interface I_ResultTranscription {
  title: string;
  textData: string;
}

interface I_Chunks {
  message: string;
  embedding: number[];
}
export interface I_ChunksEmbeddings {
  chunks: I_Chunks[];
}

export interface I_insertionData {
  idx: number;
  title: string;
  chunk_text: string;
}

export interface I_chunkingServiceData {
  _id: number;
  chunk_text: string;
  embedding: number[];
}

export interface I_textChunks {
  id: number;
  score: number;
  values: number[] | [];
  metadata: {
    text: string;
  };
}
