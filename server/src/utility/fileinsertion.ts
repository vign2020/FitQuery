import fs from "fs";
import { writeFile } from "fs/promises";

export const file_insertion = async (filePath: string, content: string) => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");
    }
  } catch (e) {
    throw new Error(`Error in fileinsertion ${(e as Error).message}`);
  }
};
