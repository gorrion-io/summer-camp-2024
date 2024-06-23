import fs from "fs/promises";

const parseJsonFile = async <T>(filePath: string): Promise<T> => {
  try {
    const stats = await fs.stat(filePath);
    if (!stats.isFile()) {
      throw new Error(`File not found: ${filePath}`);
    }
    const fileContent = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContent) as T;
  } catch (error) {
    throw new Error(`Error parsing JSON file ${filePath}: ${error}`);
  }
};

export default parseJsonFile;
