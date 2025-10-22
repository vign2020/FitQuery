import axios from "axios";

export const semanticscholar = async (topic: string) => {
  try {
    const result = await axios.get(
      `https://api.semanticscholar.org/graph/v1/paper/search?query=${topic}&limit=30&fields=title,abstract,authors,year,url`
    );

    return result.data;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
