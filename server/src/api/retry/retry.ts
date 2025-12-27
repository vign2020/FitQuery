export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 2,
  delay = 5000
): Promise<T> {
  try {
    return await fn();
  } catch (err: any) {
    if (retries > 0 && err?.response?.status === 429) {
      console.log(`🔁 Rate limit hit. Retrying in ${delay / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay); // retry
    } else {
      throw err;
    }
  }
}
