import { I_AnswerType } from "@/Types/types";
import axios, { AxiosResponse } from "axios";

export const getQueryAnswer = async (inputData: string) => {
  const result: AxiosResponse<I_AnswerType> = await axios.post(
    process.env.NEXT_PUBLIC_QUERY_API as string,
    { query: inputData }
  );
  return result;
};
