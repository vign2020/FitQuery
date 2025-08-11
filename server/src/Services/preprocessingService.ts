import { json } from "express";
import { I_ResultTranscription } from "../Types/types";

export const preprocessingService = async (
  res: any
): Promise<I_ResultTranscription> => {
  try {
    let textData = "";

    // console.log("data is " + res[0].tracks[0]);
    res[0].tracks[0].transcript.map((item: any, idx: number) => {
      textData = textData + " " + item.text;
      idx % 10 === 0 && idx != 0 ? (textData += "\n") : null;
    });

    return { title: res[0].title, textData: textData };
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
