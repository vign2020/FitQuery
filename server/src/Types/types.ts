interface I_reserach_metadata {
  title: string;
  abstract: string;
}
export interface I_research_data {
  data: I_reserach_metadata[];
}
export interface I_research_chunk {
  _id: number;
  title: string;
  embedding: number[];
  abstract: string;
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
