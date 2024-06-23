import { readFileSync } from "fs";
import fs from "fs";
import Papa from "papaparse";
import { SetStateAction } from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  isAlcohol: boolean;
};

export type PaginationData = {
  totalNumber: number;
  firstElement: number;
};

export interface ProductArrayWithTotal extends Array<Product> {
  products: Product[];
  paginationData: PaginationData;
}

const isAlcoholHidden = true;

export function fetchProducts(page: number): ProductArrayWithTotal {
  const pageNumber = page < 1 ? 1 : page;
  const jsonProducts: Product[] = fetchJsonProducts();
  const csvProducts: Product[] = fetchCSVProducts();
  const products: Product[] = [...jsonProducts, ...csvProducts];
  const startIndex = (pageNumber - 1) * 10;
  const filteredProducts = isAlcoholHidden
    ? products.filter((product) => !product.isAlcohol)
    : products;
  const totalSize = filteredProducts.length;
  const sortedProducts = filteredProducts
    .sort((a, b) => a.id.localeCompare(b.id))
    .slice(startIndex, startIndex + 10);
  const totalProducts: ProductArrayWithTotal = [
    ...sortedProducts,
  ] as ProductArrayWithTotal;
  totalProducts.paginationData = {
    totalNumber: totalSize,
    firstElement: startIndex + 1,
  };
  return totalProducts;
}

const fetchJsonProducts = (): Product[] => {
  try {
    const data = readFileSync("products.json", "utf-8");
    const products: Product[] = JSON.parse(data);
    return products;
  } catch (error) {
    return [];
  }
};

const fetchCSVProducts = (): Product[] => {
  const data = readFileSync("products.csv", "utf-8");
  const { data: products } = Papa.parse<Product>(data, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => changeToLowercase(header), //I could just change the header to lowercase in the csv file,
    //but every time the client sends a new csv file, you would have to change the header to lowercase manually
  });
  const transformedProducts = products.map(parseProductTypes);
  return transformedProducts;
};

function changeToLowercase(str: string) {
  if (!str) return str;
  return str.charAt(0).toLowerCase() + str.slice(1);
}

const parseProductTypes = (product: any): Product => {
  return {
    id: product.id,
    name: product.name,
    price: parseFloat(product.price),
    currency: product.currency,
    quantity: parseInt(product.quantity),
    isAlcohol: Boolean(Number(product.isAlcohol)),
  };
};
