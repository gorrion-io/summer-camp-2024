import { expect, test } from "vitest";
import { fetchProducts } from "./products";

test("alcohol is excluded", async () => {
  const { products } = await fetchProducts(1, 10);
  expect(products.some((product) => product.isAlcohol)).toBe(false);
});

test("page has 10 items", async () => {
  const { products } = await fetchProducts(1, 10);
  expect(products).toHaveLength(10);
});

test("products are sorted", async () => {
  const { products } = await fetchProducts(1, 10);
  const ids = products.map((product) => product.id);
  const sortedIds = [...ids].sort((a, b) => a.localeCompare(b));
  expect(ids).toEqual(sortedIds);
});
