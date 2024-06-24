import * as fs from "fs";

// CONSTS
export const PAGE_SIZE = 10;

export type Product = {
    id: string;
    name: string;
    price: number;
    currency: string;
    quantity: number;
    isAlcohol: boolean;
};

export type ProductResponse = {
    products: Product[];
    total: number;
};

function parseCsvData(): Product[] {
    const data = fs.readFileSync("products.csv", "utf8");
    const lines = data.split("\n").slice(1);
    let products: Product[] = [];
    lines.forEach((line) => {
        const [id, name, price, currency, quantity, isAlcohol] = line.split(",");
        products.push({
            id,
            name,
            price: parseFloat(price),
            currency,
            quantity: parseInt(quantity),
            isAlcohol: isAlcohol === "true",
        });
    })

    return products;
}

function parseJsonData(): Product[] {
    const data = fs.readFileSync("products.json", "utf8");
    return JSON.parse(data);
}

export function fetchProducts(page: number): ProductResponse {
    const data = [...parseCsvData(), ...parseJsonData()].filter((product) => !product.isAlcohol).sort((a, b) => a.id.localeCompare(b.id));
    return {
        products: data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        total: data.length,
    };
}