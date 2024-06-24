import { expect, test } from "vitest";
import { getProducts } from "./products";

test("alcohol is excluded", async () => {
  const response = await getProducts(1);
  const products = response.paginatedProducts;
  expect(products.every((product) => !product.isAlcohol)).toBe(true);
});

test("page has 10 items", async () => {
  const response = await getProducts(1);
  const products = response.paginatedProducts;
  expect(products).toHaveLength(10);
});

test("products are sorted", async () => {
  const response = await getProducts(1);
  const products = response.paginatedProducts;
  const ids = products.map((product) => product.id);
  const sortedIds = [...ids].sort((a, b) => a.localeCompare(b));
  expect(ids).toEqual(sortedIds);
});
