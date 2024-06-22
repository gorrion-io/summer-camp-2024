import { readFile } from "fs/promises";
import fs from "fs";
import Papa from "papaparse";

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
  const data = fs.readFileSync("products.csv", "utf-8");
  const { data: products } = Papa.parse<Product>(data, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => header.toLowerCase(), //I could just change the header to lowercase in the csv file,
    //but every time the client sends a new csv file, you would have to change the header to lowercase manually
  });
  return products;
};

export async function fetchProducts(page: number): Promise<Product[]> {
  const jsonProducts: Product[] = await fetchJsonProducts();
  const csvProducts: Product[] = await fetchCSVProducts();
  const products: Product[] = [...jsonProducts, ...csvProducts];
  products.sort((a, b) => a.id.localeCompare(b.id));
  const startIndex = (page - 1) * 10; // Calculate the starting index
  return products.slice(startIndex, startIndex + 10); // Return 10 products starting from startIndex
}
