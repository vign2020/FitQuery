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
