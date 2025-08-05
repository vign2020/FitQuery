import axios from "axios";

export const fetchTranscriptService = async () => {
  const res = await axios.post(
    "https://www.youtube-transcript.io/api/transcripts",
    {
      ids: ["XcZnSSmeK2I"],
    },
    {
      headers: {
        Authorization: "Basic 688ac66327fe2cb3d42aabf4",
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
