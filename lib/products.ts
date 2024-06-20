import fs from "fs";
import { parse } from "csv-parse";
import { Product, ProductSchema } from "../schemas/productSchema";

export const fetchProducts = async (
  page: number,
  includeAlcohol: boolean = false
): Promise<Product[]> => {
  const products = await getMergedProducts();

  if (includeAlcohol) return products.slice(page * 10, (page + 1) * 10);

  const nonAlcoholProducts = products
    .filter((product) => !product.isAlcohol)
    .sort((a, b) => a.id.localeCompare(b.id));

  return nonAlcoholProducts.slice(page * 10, (page + 1) * 10);
};

export const fetchProductsCount = async (
  includeAlcohol: boolean = false
): Promise<number> => {
  const products = await getMergedProducts();
  if (includeAlcohol) return products.length;
  const nonAlcoholProducts = products.filter((product) => !product.isAlcohol);
  return nonAlcoholProducts.length;
};

const getMergedProducts = async (): Promise<Product[]> => {
  const mergedFilePath = "./mergedProducts.json";
  const csvFilePath = "./products.csv";
  const jsonFilePath = "./products.json";

  if (fs.existsSync(mergedFilePath)) {
    const mergedFileLastModified = fs.statSync(mergedFilePath).mtimeMs;
    const csvFileLastModified = fs.statSync(csvFilePath).mtimeMs;
    const jsonFileLastModified = fs.statSync(jsonFilePath).mtimeMs;

    if (
      mergedFileLastModified > csvFileLastModified &&
      mergedFileLastModified > jsonFileLastModified
    ) {
      const mergedProducts = fs.readFileSync(mergedFilePath, "utf-8");
      return JSON.parse(mergedProducts);
    }
  }

  const products: Product[] = [];

  if (fs.existsSync(csvFilePath)) {
    const csvProducts = await readCSV(csvFilePath);
    products.push(...csvProducts);
  }

  if (fs.existsSync(jsonFilePath)) {
    const jsonProducts = await readJSON(jsonFilePath);
    products.push(...jsonProducts);
  }

  products.sort((a, b) => a.id.localeCompare(b.id));
  fs.writeFileSync(mergedFilePath, JSON.stringify(products, null, 2));

  return products;
};

const readCSV = (filePath: string): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    const results: Product[] = [];
    let headers: string[] | null = null;

    fs.createReadStream(filePath)
      .pipe(parse())
      .on("data", (data: string[]) => {
        if (!headers) {
          headers = data.map(
            (header) => header.charAt(0).toLowerCase() + header.slice(1)
          ); // Convert headers to camelCase
          return;
        }

        const item = data.reduce((obj, value, index) => {
          if (headers) {
            if (headers[index] === "price" || headers[index] === "quantity") {
              obj[headers[index]] = parseFloat(value);
            } else if (headers[index] === "isAlcohol") {
              obj[headers[index]] = value === "1";
            } else {
              obj[headers[index]] = value;
            }
          }
          return obj;
        }, {} as Record<string, any>);

        try {
          const parsedItem = ProductSchema.parse(item);
          results.push(parsedItem);
        } catch (e) {
          reject(
            new Error(
              `Schema validation error: ${e} for item: ${JSON.stringify(item)}`
            )
          );
        }
      })
      .on("end", () => resolve(results))
      .on("error", (error) =>
        reject(new Error(`File read error: ${error.message}`))
      );
  });
};

const readJSON = (filePath: string): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) return reject(new Error(`File read error: ${err.message}`));

      try {
        const jsonData = JSON.parse(data);
        const products = jsonData.map((item: any) => {
          try {
            return ProductSchema.parse(item);
          } catch (e) {
            throw new Error(
              `Schema validation error: ${e} for item: ${JSON.stringify(item)}`
            );
          }
        });
        resolve(products);
      } catch (e) {
        reject(new Error(`JSON parse error: ${e}`));
      }
    });
  });
};
