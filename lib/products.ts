import fs from "fs";

export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  isAlcohol: boolean;
};

export function fetchProducts(page: number): Product[] {
  // todo
  let products: Product[] = [];

  const jsonProducts = readJson("products.json");
  products = products.concat(jsonProducts);

  const csvProducts = readCsv("products.csv");
  products = products.concat(csvProducts);

  //   let products: Product[] = readJson("products.json");
  //   products = products.concat(readCsv("products.csv"));

  products.sort((a, b) => a.id.localeCompare(b.id));

  return products
    .filter((product) => !product.isAlcohol)
    .slice(page * 10, (page + 1) * 10);
}

export const readCsv = (csvFilePath: string) => {
  let products: Product[] = [];

  const content = fs.readFileSync(csvFilePath, "utf-8");
  const line = content.split("\n");

  for (let i = 1; i < line.length; i++) {
    const product = line[i].split(",");
    const productObj: Product = {
      id: product[0],
      name: product[1],
      price: +product[2],
      currency: product[3],
      quantity: +product[4],
      isAlcohol: !!+product[5],
    };
    products.push(productObj);
  }
  return products;
};

export const readJson = (filePath: string): Product[] => {
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as Product[];
};
