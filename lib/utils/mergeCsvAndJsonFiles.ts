import path from "path";
import parseJsonFile from "./parseJsonFile";
import parseCsvFile from "./parseCsvFile";
import { Product } from "@/app/types/productTypes";

const mergeCsvAndJsonProducts = async () => {
  const jsonProductsFilePath = path.resolve(process.cwd(), "products.json");
  const csvProductsFilePath = path.resolve(process.cwd(), "products.csv");

  try {
    const [productsJsonList, productsCsvList] = await Promise.all([
      parseJsonFile<Product[]>(jsonProductsFilePath),
      parseCsvFile<Product[]>(csvProductsFilePath),
    ]);

    return [...productsJsonList, ...productsCsvList];
  } catch (error) {
    throw new Error(`Error merging CSV and JSON products: ${error}`);
  }
};

export default mergeCsvAndJsonProducts;
