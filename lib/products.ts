import { createReadStream } from "fs";
import productsJSON from "../products.json";
import csvParser from "csv-parser";
import { Product } from "@/app/types/Product";

export function paginateProducts(
  products: Product[],
  pageNumber: number,
  pageSize: number
): Product[] {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return products.slice(startIndex, endIndex);
}

export async function readCSV(filePath: string): Promise<Product[]> {
  const products: Product[] = [];

  return new Promise((resolve, reject) => {
    createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        const product: Product = {
          id: row.Id,
          name: row.Name,
          price: Number(row.Price),
          currency: row.Currency,
          quantity: Number(row.Quantity),
          isAlcohol: row.IsAlcohol === "1",
        };
        products.push(product);
      })
      .on("end", () => {
        resolve(products);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

export function sortProductsById(products: Product[]): Product[] {
  return products.sort((a, b) => (Number(a.id) > Number(b.id) ? 1 : -1));
}

export function filterSearchedProducts(products: Product[], query: string) {
  return products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
}

export async function fetchProducts(
  page: number,
  pageSize: number,
  searchQuery?: string
): Promise<{ products: Product[]; totalNumberOfProducts: number }> {
  const productsCSV = await readCSV("./products.csv");
  const products = [...productsJSON, ...productsCSV];

  const checkSearch = () => {
    if (searchQuery) {
      return filterSearchedProducts(products, searchQuery);
    } else {
      return products;
    }
  };

  const productsToFilter = checkSearch();

  const nonAlcoholProducts = productsToFilter.filter(
    (product) => !product.isAlcohol
  );
  const sortedProducts = sortProductsById(nonAlcoholProducts);
  const paginatedProducts = paginateProducts(sortedProducts, page, pageSize);
  const totalNumberOfProducts = sortedProducts.length;

  return { products: paginatedProducts, totalNumberOfProducts };
}
