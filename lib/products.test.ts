import { expect, test } from "vitest"
import { fetchProducts } from "./products"

test('alcohol is excluded', () => {
    const products = fetchProducts(0);
    expect(products.some(product => product.isAlcohol)).toBe(false);
});

test('page has 10 items', () => {
    const products = fetchProducts(0);
    expect(products).toHaveLength(10);
});

test('products are sorted', () => {
    const products = fetchProducts(0);
    const ids = products.map(product => product.id);
    const sortedIds = [...ids].sort((a, b) => a.localeCompare(b));
    expect(ids).toEqual(sortedIds);
});