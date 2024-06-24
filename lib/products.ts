import { z } from "zod";
import fs from "fs";
import path from "path";
import { parse } from "papaparse";

export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  isAlcohol: boolean;
};

const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  currency: z.string(),
  quantity: z.number(),
  isAlcohol: z.boolean(),
});

export function fetchProducts(page: number): Product[] {
  // todo
  const json = readJson();
  const csv = readCsv();
  return [...json, ...csv]
    .sort((a, b) => a.id.localeCompare(b.id))
    .filter((p) => !p.isAlcohol)
    .slice(page * 10, page * 10 + 10);
}

const readJson = () => {
  const jsonRecords = fs.readFileSync(
    path.join(process.cwd(), "products.json"),
    "utf-8"
  );
  const parsedJson = productSchema.array().parse(JSON.parse(jsonRecords));
  return parsedJson;
};

const readCsv = () => {
  const csvrecords = fs.readFileSync(
    path.join(process.cwd(), "products.csv"),
    "utf-8"
  );
  const parsed = parse(csvrecords, {
    header: true,
    transformHeader: (h) => h.charAt(0).toLowerCase() + h.slice(1),
  }).data;
  const convertedCsvRecords = parsed.map((record: any) => {
    return {
      ...record,
      price: parseFloat(record.price),
      quantity: parseInt(record.quantity),
      isAlcohol: record.isAlcohol === "0" ? false : true,
    };
  });
  const parsedCsv = productSchema.array().parse(convertedCsvRecords);
  return parsedCsv;
};
