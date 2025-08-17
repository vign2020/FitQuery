import axios from "axios";

//this api fetches only the trascriptions of one particular video.

export const fetchTranscriptService = async () => {
  try {
    const res = await axios.post(
      "https://www.youtube-transcript.io/api/transcripts",
      {
        ids: ["vuueRRdbi1w"],
      },
      {
        headers: {
          Authorization: "Basic 688ac66327fe2cb3d42aabf4",
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (e) {
    return e;
  }
};
