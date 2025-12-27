import axios from "axios";

export const semanticscholar = async (topic: string, count: number) => {
  try {
    const result = await axios.get(
      `https://api.semanticscholar.org/graph/v1/paper/search`,
      {
        params: {
          query: topic,
          limit: count,
          fields: "title,abstract,authors,year,url",
        },
        headers: {
          "x-api-key": "I5BWb0kB697WtE2kMpVn96isTFcqCRFDalL9w7om",
        },
      }
    );

    return result.data;
  } catch (e) {
    console.log("Semantic Scholar API error: ", e);
    throw e;
  }
};
