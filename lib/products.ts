import { Product, mergeLists } from "./fileRead";

export function fetchProducts(page: number): Product[] {
  const data = mergeLists();
  const newData: Product[] = data.slice(page * 10, page * 10 + 10);
  return newData;
}

export function fetchProductsAmount(): number {
  const data = mergeLists();
  return data.length;
}
