import { parse } from "csv-parse/sync";
import * as fs from "fs";
import { CSV_PATH, JSON_PATH, PAGE_SIZE } from "./consts";

export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  isAlcohol: boolean;
};

type CsvProduct = {
  Id: string;
  Name: string;
  Price: string;
  Currency: string;
  Quantity: string;
  IsAlcohol: string;
};

function getCsvProducts(): Product[] {
  const data = fs.readFileSync(CSV_PATH, "utf8");
  const records = parse(data, {
    columns: true,
    trim: true,
  });

  const products: Product[] = records.map((product: CsvProduct) => ({
    id: product.Id,
    name: product.Name,
    price: parseFloat(product.Price),
    currency: product.Currency,
    quantity: parseInt(product.Quantity, 10),
    isAlcohol: product.IsAlcohol === "1" ? true : false,
  }));

  return products;
}

function getJsonProducts(): Product[] {
  const data = fs.readFileSync(JSON_PATH, "utf8");
  const products = JSON.parse(data);

  return products;
}

export function fetchProducts(page: number): Product[] {
  const allProductsSorted = [...getJsonProducts(), ...getCsvProducts()].sort(
    (a, b) => a.id.localeCompare(b.id)
  );
  const allNonAlcoholicProducts = allProductsSorted.filter(
    (product) => !product.isAlcohol
  );

  const startIndex = page * PAGE_SIZE;
  const endIndex = page * PAGE_SIZE + PAGE_SIZE;

  return allNonAlcoholicProducts.slice(startIndex, endIndex);
}
