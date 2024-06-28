import * as fs from "fs";
import Papa from "papaparse";
import { ITEMS_PER_PAGE, JSON_FILE_PATH, CSV_FILE_PATH } from "./consts";

export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  isAlcohol: boolean;
};

export type ProductResponse = {
  products: Product[];
  totalSize: number;
};

export function fetchProducts(page: number): ProductResponse {
  const pageNum = page > 1 ? page : 1;
  const products: Product[] = [
    ...fetchJsonProducts(JSON_FILE_PATH),
    ...fetchCSVProducts(CSV_FILE_PATH),
  ];
  const filteredAndSortedProducts = products
    .filter((product) => !product.isAlcohol)
    .sort((a, b) => a.id.localeCompare(b.id));
  const readyProducts = filteredAndSortedProducts.slice(
    (pageNum - 1) * ITEMS_PER_PAGE,
    pageNum * ITEMS_PER_PAGE
  );
  return {
    products: readyProducts,
    totalSize: filteredAndSortedProducts.length,
  };
}

const fetchJsonProducts = (filePath: string): Product[] => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const products: Product[] = JSON.parse(data);
    return products;
  } catch (error) {
    return [];
  }
};

const fetchCSVProducts = (filePath: string): Product[] => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const products = Papa.parse<Product>(data, {
      header: true,
      skipEmptyLines: true,
    });
    const convertedProducts = convertProducts(products.data);
    return convertedProducts;
  } catch (error) {
    return [];
  }
};

function convertProducts(products: any[]): Product[] {
  return products.map((product) => ({
    id: product.Id,
    name: product.Name,
    price: parseFloat(product.Price),
    currency: product.Currency,
    quantity: parseInt(product.Quantity),
    isAlcohol: Boolean(Number(product.IsAlcohol)),
  }));
}
