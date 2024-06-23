import { readFileSync } from "fs";
import Papa from "papaparse";

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

export interface ProductArrayWithPagination extends Array<Product> {
  products: Product[];
  paginationData: PaginationData;
}

const IS_ALCOHOL_HIDDEN = true;
const ITEMS_PER_PAGE = 10;

export function fetchProducts(page: number): ProductArrayWithPagination {
  const pageNumber = page < 1 ? 1 : page;
  const products: Product[] = [...fetchJsonProducts(), ...fetchCSVProducts()];
  const filteredProducts = filterAlcoholProducts(products);
  const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
  const totalSize = filteredProducts.length;
  const sortedProducts = filteredProducts
    .sort((a, b) => a.id.localeCompare(b.id))
    .slice(startIndex, startIndex + 10);
  const productsWithPagination = [
    ...sortedProducts,
  ] as ProductArrayWithPagination;
  productsWithPagination.paginationData = {
    totalNumber: totalSize,
    firstElement: startIndex + 1,
  };
  return productsWithPagination;
}

const filterAlcoholProducts = (products: Product[]): Product[] => {
  return IS_ALCOHOL_HIDDEN
    ? products.filter((product) => !product.isAlcohol)
    : products;
};

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
