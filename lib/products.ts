import { Filepath } from "@/app/constants/paths";
import { FetchedProducts, Product } from "@/app/constants/types";
import fs from "fs";

const productsPerPage = 10;
const fileEncoding = "utf-8";

export function fetchProducts(page: number): FetchedProducts {
  const jsonData: Product[] = JSON.parse(
    fs.readFileSync(Filepath.productsJson, fileEncoding)
  );

  const csvData: Product[] = fs
    .readFileSync(Filepath.productsCsv, fileEncoding)
    .split("\n")
    .slice(1)
    .map((line) => {
      const [id, name, price, currency, quantity, isAlcohol] = line.split(",");
      return {
        id,
        name,
        price: parseFloat(price),
        currency,
        quantity: parseInt(quantity, 10),
        isAlcohol: parseInt(isAlcohol) === 1,
      };
    });

  const products = [...jsonData, ...csvData];
  const productsWithoutAlcohol = products.filter((p) => !p.isAlcohol);
  const sortedAscProducts = productsWithoutAlcohol.sort(
    (a, b) => parseInt(a.id) - parseInt(b.id)
  );

  const startIndex = (page - 1) * productsPerPage;
  const endIndex =
    startIndex + productsPerPage > sortedAscProducts.length
      ? sortedAscProducts.length
      : startIndex + productsPerPage;
  return {
    productsQuantity: sortedAscProducts.length,
    page: page,
    productsQuantityTo: endIndex,
    productsQuantityFrom: startIndex + 1,
    products: sortedAscProducts.slice(startIndex, endIndex),
  };
}
