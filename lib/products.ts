import fs from 'fs';
import path from 'path';

export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  isAlcohol: boolean;
};

//paths
const CSV_FILE_PATH = path.join('./products.csv');
const JSON_FILE_PATH = path.join('./products.json');

//function without arguments that reading csv file using fs library and returned all products from this file
const parseCSV = (): Product[] => {

    const csvData = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
    const lines = csvData.split('\n');
    const products: Product[] = [];
      
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
        const [id, name, price, currency, quantity, isAlcohol] = line.split(',');
        products.push({
            id,
            name,
            price: parseFloat(price),
            currency,
            quantity: parseInt(quantity, 10),
            isAlcohol: isAlcohol.toLowerCase() === 'true',
        });
        }
    }

    return products;
};

//function without arguments that reading json file using fs library and returned all products from this file
const parseJSON = (): Product[] => {
    const jsonData = fs.readFileSync(JSON_FILE_PATH, 'utf-8');
    const products: Product[] = JSON.parse(jsonData);
    return products;
};


//function that has page argument type number and merging all products from csv and json files, merging with spread opperator (...),
///using filter function deleting all products with alcohol from list and sortign ascending by product id and diving for pages

export function fetchProducts(page: number): Product[] {
    const csvProducts = parseCSV();
    const jsonProducts = parseJSON();
    const allProducts = [...csvProducts, ...jsonProducts];  
    const without_alcohol = allProducts.filter((product) => !product.isAlcohol);
    without_alcohol.sort((a, b) => a.id.localeCompare(b.id));
    const itemsPerPage = 10;
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = without_alcohol.slice(startIndex, endIndex);
    return paginatedProducts;
}

//method that download length of the merged list
export function getCountProducts(): number {
    const csvProducts = parseCSV();
    const jsonProducts = parseJSON();
    const allProducts = [...csvProducts, ...jsonProducts];
    const withoutAlcohol = allProducts.filter((product) => !product.isAlcohol);  
    return withoutAlcohol.length;
  }






