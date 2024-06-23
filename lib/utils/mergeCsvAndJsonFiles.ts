import path from "path";
import parseJsonFile from "./parseJsonFile";
import parseCsvFile from "./parseCsvFile";
import { Product } from "@/app/types/productTypes";

const mergeCsvAndJsonProducts = async () => {
  const jsonProductsFilePath = path.resolve(process.cwd(), "products.json");
  const csvProductsFilePath = path.resolve(process.cwd(), "products.csv");

  const [productsJsonList, productsCsvList] = await Promise.all([
    parseJsonFile<Product[]>(jsonProductsFilePath),
    parseCsvFile<Product[]>(csvProductsFilePath),
  ]);

  return [...productsJsonList, ...productsCsvList];
};

export default mergeCsvAndJsonProducts;
