import fs from "fs/promises";
import { parse } from "csv-parse/sync";
import { ApiResponse, CsvProduct, Product } from "@/types";

export const loadJsonProducts = async (path: string): Promise<Product[]> => {
  try {
    const jsonData = await fs.readFile(path, "utf8");
    return JSON.parse(jsonData);
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? err.message
        : "Failed to load JSON file, an unknown error happened."
    );
  }
};

export const loadCsvProducts = async (path: string): Promise<Product[]> => {
  try {
    const csvData = await fs.readFile(path, "utf-8");
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    });

    return records.map((record: CsvProduct) => ({
      id: record.Id,
      name: record.Name,
      price: parseFloat(record.Price),
      currency: record.Currency,
      quantity: parseInt(record.Quantity, 10),
      isAlcohol: record.IsAlcohol === "1",
    }));
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? err.message
        : "Failed to load CSV file, an unknown error happened."
    );
  }
};

export const mergeProductsLists = async (
  jsonProductsPath: string,
  csvProductsPath: string
): Promise<Product[]> => {
  try {
    // load products from json and csv files
    const jsonProductsData = await loadJsonProducts(jsonProductsPath);
    const csvProductsData = await loadCsvProducts(csvProductsPath);

    // return merged lists with only non-alcohol products
    return [...jsonProductsData, ...csvProductsData].filter(
      (product) => !product.isAlcohol
    );
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? err.message
        : "An unknown error happened while trying to merge products lists."
    );
  }
};

