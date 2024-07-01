import fs, { readFileSync } from "fs";
import Papa from "papaparse";
import { sort } from "fast-sort";

export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  isAlcohol: boolean;
};

const csvFilePath = "./products.csv";
const jsonFilePath = "products.json";

const readCSV = async (filePath: string) => {
  try {
    const csvFile = fs.readFileSync(filePath);
    const csvData = csvFile.toString();
    return new Promise((resolve) => {
      Papa.parse(csvData, {
        header: true,
        complete: (results: any) => {
          resolve(results.data);
        },
      });
    });
  } catch (error) {
    console.error(error);
  }
};

const readJSON = async (filePath: string) => {
  try {
    const JSONFile = fs.readFileSync(filePath);
    const JSONData = JSONFile.toString();
    return new Promise((resolve) => {
      resolve(JSON.parse(JSONData.toString()));
    });
  } catch (error) {
    console.error(error);
  }
};

export const createMergedDb = async () => {
  let CSVData: any = await readCSV(csvFilePath);
  let JSONData: any = await readJSON(jsonFilePath);
  const NonAlcProducts: any = [];

  const ProductList = CSVData.concat(JSONData);

  for (const product of ProductList) {
    if (product.isAlcohol !== "1" && product.isAlcohol !== true) {
      NonAlcProducts.push({
        id: String(product.id),
        name: String(product.name),
        price: parseFloat(product.price),
        currency: String(product.currency),
        quantity: parseInt(product.quantity),
        isAlcohol: Boolean(""),
      });
    }
  }
  const NonAlcProductsSorted = sort(NonAlcProducts).asc(
    (product: any) => product.id
  );
  const db = JSON.stringify(NonAlcProductsSorted, null, "\t");
  try {
    fs.writeFileSync("db.json", db);
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export function fetchProducts(page: number): Product[] {
  const result = readFileSync("db.json", { encoding: "utf8" });
  const products = result ? JSON.parse(result) : [];
  const productPageList = [];

  for (
    let i = page * 10;
    i < products.length ? i < (page + 1) * 10 : i < products.length;
    i++
  ) {
    productPageList.push(products[i]);
  }

  return productPageList;
}
