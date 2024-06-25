import fs from "fs";
import path from "path";

export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  isAlcohol: boolean;
};

let totalProducts = 0;

function readCSVFile(filePath: string): Product[] {
  //odczytujemy plik csv ze sceizki podanej w argumencie funkcji
  const csvData = fs.readFileSync(filePath, "utf-8");
  //dzielimy  tekst na linie
  const lines = csvData.split("\n");
  //pierwsza linia słuzy jako nazwy kolumn wieć zapisujemy ja w nowej zmiennej zeby latwiej było się nastepnie do niej odwolywac
  const headers = lines[0].split(",");
  // zwracamy z funkcji tablice utworzona z pozostałych lini

  return lines.slice(1).map((line) => {
    //dzielimy kazda linie na kolumny
    const data = line.split(",");
    //dla kazdej lini tworzymy nowy produckt
    const product: Product = {
      id: data[headers.indexOf("Id")],
      name: data[headers.indexOf("Name")],
      price: parseFloat(data[headers.indexOf("Price")]),
      currency: data[headers.indexOf("Currency")],
      quantity: parseInt(data[headers.indexOf("Quantity")], 10),
      //data[headers.indexOf("isAlcohol")] bedzie zwracało nam 0/1 i po prownaniu go do stringa "1" otryzmamy wartosc logiczna true badz false
      isAlcohol: data[headers.indexOf("IsAlcohol")] === "1",
    };
    return product;
  });
}

function readJSONFile(filePath: string): Product[] {
  const jsonData = fs.readFileSync(filePath, "utf-8");
  //gotowa metoda z obiektu JSON do parsowania plikow JSON
  return JSON.parse(jsonData);
}

export function fetchProducts(page: number): Product[] {
  //tworzymy pelne sciezki do plikow csv i json procss.cwd() zwraca bieżący katalog roboczy procesu
  const csvFilePath = path.join(process.cwd(), "products.csv");
  const jsonFilePath = path.join(process.cwd(), "products.json");

  const csvProducts = readCSVFile(csvFilePath);
  const jsonProducts = readJSONFile(jsonFilePath);

  //laczymy dwie tablice w jedna
  const allProducts = [...csvProducts, ...jsonProducts];

  //filtrujemy tablice zeby zawierala produkty jedynie bez alkoholu
  const nonAlcoholProducts = allProducts.filter(
    (product) => !product.isAlcohol
  );
  //sortowanie tablicy po id
  nonAlcoholProducts.sort((a, b) => a.id.localeCompare(b.id));
  totalProducts = nonAlcoholProducts.length;

  const itemsPerPage = 10;
  const startIndex = page * itemsPerPage;

  //podzielenie tablicy ze wszystkimi produktami na konkretna strone
  const paginatedProducts = nonAlcoholProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return paginatedProducts;
}

export function getTotalProducts(): number {
  return totalProducts;
}
