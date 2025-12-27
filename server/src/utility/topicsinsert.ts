import { withRetry } from "../api/retry/retry";
import { semanticscholar } from "../api/SemanticScholar";

import * as dotenv from "dotenv";
import { Topics } from "../Types/types";

export const topics_insert = async (item: Topics) => {
  try {
    const content = await withRetry(
      () => semanticscholar(item.title, item.count ?? 5),
      2, // retry count (try twice total)
      20000 // delay before retry (20 seconds)
    );
    return content;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
