import { expect, test } from "vitest";
import { fetchProducts } from "./products";

test("alcohol is excluded", async () => {
  const products = await fetchProducts(0);
  expect(products.some((product) => product.isAlcohol)).toBe(false);
});

test("page has 10 items", async () => {
  const products = await fetchProducts(0);
  expect(products).toHaveLength(10);
});

test("products are sorted", async () => {
  const products = await fetchProducts(0);
  const ids = products.map((product) => product.id);
  const sortedIds = [...ids].sort((a, b) => a.localeCompare(b));
  expect(ids).toEqual(sortedIds);
});
test("products have correct data types", async () => {
  const products = await fetchProducts(0);
  products.forEach((product) => {
    expect(typeof product.id).toBe("string");
    expect(typeof product.name).toBe("string");
    expect(typeof product.price).toBe("number");
    expect(typeof product.currency).toBe("string");
    expect(typeof product.quantity).toBe("number");
    expect(typeof product.isAlcohol).toBe("boolean");
  });
});

test("fetchProducts handles pagination correctly", async () => {
  const page1 = await fetchProducts(0);
  const page2 = await fetchProducts(1);
  const page3 = await fetchProducts(2);

  expect(page1).toHaveLength(10);
  expect(page2).toHaveLength(10);
  expect(page3).toHaveLength(10);
  expect(page1[0].id).not.toEqual(page2[0].id);
  expect(page2[0].id).not.toEqual(page3[0].id);
});

test("fetchProducts includes all non-alcohol products", async () => {
  const allProducts = [];
  for (let page = 0; page < 6; page++) {
    const products = await fetchProducts(page);
    allProducts.push(...products);
  }

  expect(allProducts.length).toBe(60);
  expect(allProducts.some((product) => product.isAlcohol)).toBe(false);
});

test("fetchProducts returns empty array for out of range page", async () => {
  const products = await fetchProducts(10);
  expect(products).toEqual([]);
});

test("fetchProducts returns correct structure", async () => {
  const products = await fetchProducts(0);
  products.forEach((product) => {
    expect(product).toHaveProperty("id");
    expect(product).toHaveProperty("name");
    expect(product).toHaveProperty("price");
    expect(product).toHaveProperty("currency");
    expect(product).toHaveProperty("quantity");
    expect(product).toHaveProperty("isAlcohol");
  });
});

test("fetchProducts includes alcohol products when specified", async () => {
  const products = await fetchProducts(0, true);
  expect(products.some((product) => product.isAlcohol)).toBe(true);
});
