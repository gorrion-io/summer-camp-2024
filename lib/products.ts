import fs from 'fs';
import Papa from 'papaparse';
export type Product = {
    id: string;
    name: string;
    price: number;
    currency: string;
    quantity: number;
    isAlcohol: boolean;
};

//function for converting types of CSV file
function convertTypes(data: any[]): Product[] {
    return data.map(item => ({
      id: item.id || item.Id,
      name: item.name || item.Name,
      price: parseFloat(item.price || item.Price),
      currency: item.currency || item.Currency,
      quantity: parseInt(item.quantity || item.Quantity),
      isAlcohol: item.IsAlcohol === '0' ? false : item.IsAlcohol === '1' ? true : Boolean(item.isAlcohol || item.IsAlcohol)
    }));
  }


  
export function fetchProducts(page: number): Product[] {
    const jsonString = fs.readFileSync('./products.json', 'utf-8');
    const data = JSON.parse(jsonString);
    const csvFile = fs.readFileSync('./products.csv', 'utf8'); //reading json data
    const dataCSV = Papa.parse(csvFile, { //using papaparase insted of csvparase because that way I don't need to wait for results
        header: true,
        delimiter: ",",
    })
    const result = convertTypes(data.concat(dataCSV.data)); //converting types
    const nonAlcoholicProducts = result.filter(result => !result.isAlcohol); // making product non alcoholic
    const sortedNonAlcoholicProducts = nonAlcoholicProducts.sort((a, b) => a.id.localeCompare(b.id)); // sorting products
    const itemsPerPage = 10;
    const startIndex = (page) * itemsPerPage;
    const paginatedProducts = sortedNonAlcoholicProducts.slice(startIndex, startIndex + itemsPerPage); // return paginated products

    return paginatedProducts;
}