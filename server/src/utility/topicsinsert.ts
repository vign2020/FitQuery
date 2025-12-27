import { withRetry } from "../api/retry/retry";
import { semanticscholar } from "../api/SemanticScholar";

export const topics_insert = async (title: string, count: null | number) => {
  try {
    const content = await withRetry(
      () => semanticscholar(title, count ?? 5),
      2, // retry count (try twice total)
      20000 // delay before retry (20 seconds)
    );
    return content.data;
  } catch (e) {
    throw new Error(`Error in fetching from api... ${(e as Error).message}`);
  }
};
