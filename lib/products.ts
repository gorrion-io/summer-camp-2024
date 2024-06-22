import { readFile } from "fs/promises";
import fs from "fs";

export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  isAlcohol: boolean;
};

const fetchJsonProducts = async (): Promise<Product[]> => {
  const data = await readFile("products.json", "utf-8");
  const products: Product[] = JSON.parse(data);
  return products;
};

const fetchCSVProducts = async (): Promise<Product[]> => {
  return [];
};

export async function fetchProducts(page: number): Promise<Product[]> {
  const products = (await fetchJsonProducts()).sort((a, b) =>
    a.id.localeCompare(b.id)
  );
  const startIndex = (page - 1) * 10; // Calculate the starting index
  return products.slice(startIndex, startIndex + 10); // Return 10 products starting from startIndex
}
