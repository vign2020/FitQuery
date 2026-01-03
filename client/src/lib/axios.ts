import { I_AnswerType } from "@/Types/types";
import axios, { AxiosResponse } from "axios";

export const getQueryAnswer = async (inputData: string) => {
  try {
    const result: AxiosResponse<I_AnswerType> = await axios.post(
      // process.env.NEXT_PUBLIC_QUERY_API as string,
      "http://localhost:5000/api/home/get_embeddings_query",
      { query: inputData }
    );
    return result;
  } catch (e) {
    throw e;
  }
};

// when server is not running - Network Error
// when airplane mode - Request failed with status code 400
//
