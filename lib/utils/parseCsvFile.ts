import fs from "fs/promises";
import { parse } from "csv-parse/sync";
import type { ProductCsv } from "@/app/types/productTypes";

const parseCsvFile = async <T>(filePath: string): Promise<T> => {
  try {
    const stats = await fs.stat(filePath);
    if (!stats.isFile()) {
      throw new Error(`File not found: ${filePath}`);
    }

    const fileContent = await fs.readFile(filePath, "utf8");

    const records: ProductCsv[] = parse(fileContent, {
      columns: true,
      trim: true,
    });

    return records.map((product: ProductCsv) => ({
      id: product.Id,
      name: product.Name,
      price: parseFloat(product.Price),
      currency: product.Currency,
      quantity: parseInt(product.Quantity),
      isAlcohol: product.IsAlcohol === "1",
    })) as T;
  } catch (error) {
    throw new Error(`Error parsing CSV file ${filePath}: ${error}`);
  }
};

export default parseCsvFile;
