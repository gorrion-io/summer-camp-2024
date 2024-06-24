import { expect, test } from "vitest"
import { fetchProducts,getCountProducts } from "./products"

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

test('function work correctly for different pages', () => {
    const page1 = fetchProducts(0);
    const page4 = fetchProducts(3)

    expect(page1).toHaveLength(10);
    expect(page4).toHaveLength(10);
});

//my function test
test('function returned correct amount of products', () => {
    const amount = getCountProducts()
    expect(amount).toBe(97)
    
});

