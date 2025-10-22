import fs from "fs/promises";
export async function file_exists(f: string) {
  try {
    await fs.stat(f);
    return true;
  } catch {
    return false;
  }
}
