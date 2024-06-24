import { expect, test } from "vitest";
import { fetchProducts } from "./products";
import { Product } from "@/app/types/productTypes";
import { PaginatedResponse } from "@/app/types/paginatedResponseType";

test("alcohol is excluded", async () => {
  const response: PaginatedResponse = await fetchProducts(1);
  const { paginatedProductsList: products } = response;
  expect(products.some((product: Product) => product.isAlcohol)).toBe(false);
});

test("page has 10 items", async () => {
  const response: PaginatedResponse = await fetchProducts(1);
  const { paginatedProductsList: products } = response;
  expect(products).toHaveLength(10);
});

test("products are sorted", async () => {
  const response: PaginatedResponse = await fetchProducts(1);
  const { paginatedProductsList: products } = response;
  const ids = products.map((product: Product) => product.id);
  const sortedIds = [...ids].sort((a, b) => a.localeCompare(b));
  expect(ids).toEqual(sortedIds);
});

test("returns data when fetch is successful", async () => {
  const response: PaginatedResponse = await fetchProducts(1);
  expect(response).toBeDefined();
});

test("products have no duplicates", async () => {
  const response: PaginatedResponse = await fetchProducts(1);
  const { paginatedProductsList: products } = response;
  const uniqueIds = new Set(products.map((product: Product) => product.id));
  expect(uniqueIds.size).toBe(products.length);
});

test("products have necessary fields", async () => {
  const response: PaginatedResponse = await fetchProducts(1);
  const { paginatedProductsList: products } = response;
  products.forEach((product: Product) => {
    expect(product).toHaveProperty("id");
    expect(product).toHaveProperty("name");
    expect(product).toHaveProperty("price");
    expect(product).toHaveProperty("currency");
    expect(product).toHaveProperty("quantity");
    expect(product).toHaveProperty("isAlcohol");
  });
});
