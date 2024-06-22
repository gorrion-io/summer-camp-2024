import Papa from "papaparse";

export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  isAlcohol: boolean;
};

export type ProductCsv = {
  Id: string;
  Name: string;
  Price: string;
  Currency: string;
  Quantity: string;
  IsAlcohol: string;
};

export function mergeLists() {
  const fs = require("fs");
  const fileCsv = fs.readFileSync("products.csv", "utf8");
  const csvParsed = Papa.parse<ProductCsv>(fileCsv, {
    header: true,
  });

  const csvData: Product[] = csvParsed.data.map((product: ProductCsv) => {
    return {
      id: product.Id,
      name: product.Name,
      price: parseInt(product.Price),
      currency: product.Currency,
      quantity: parseInt(product.Quantity),
      isAlcohol: !!parseInt(product.IsAlcohol),
    };
  });

  const json_data: Product[] = JSON.parse(
    fs.readFileSync("products.json", "utf8")
  );

  const data: Product[] = [...json_data, ...csvData];
  data.sort(
    (productA, productB) => parseInt(productA.id) - parseInt(productB.id)
  );
  const dataSortedFiltered = data.filter(
    (product) => product.isAlcohol === false
  );

  return dataSortedFiltered;
}
