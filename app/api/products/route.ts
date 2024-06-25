import { mergeProductsLists } from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    // get page number from path params
    const page = req.nextUrl.searchParams.get("page");
    const pageNumber = page ? parseInt(page as string, 10) : 1;

    // get path of json and csv products files
    const jsonProductsPath = path.join(process.cwd(), "products.json");
    const csvProductsPath = path.join(process.cwd(), "products.csv");

    // merge json and csv products
    const mergedProducts = await mergeProductsLists(
      jsonProductsPath,
      csvProductsPath
    );

    // sort merged products
    mergedProducts.sort((product1, product2) =>
      product1.id.localeCompare(product2.id)
    );

    // set items per page
    const ITEMS_PER_PAGE = 10;

    // count pagination pages amount
    const pageCount = Math.ceil(mergedProducts.length / ITEMS_PER_PAGE);

    // calculate the starting and ending indexes for elements displayed on one page
    const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
    let endIndex = startIndex + ITEMS_PER_PAGE;

    // correct the logic for the last page if is incomplete (receives less items than ITEMS_PER_PAGE)
    if (endIndex > mergedProducts.length) {
      endIndex = mergedProducts.length;
    }

    // slice list to get only items needed for visited website path
    const paginatedProducts = mergedProducts.slice(startIndex, endIndex);

    // count total products amount
    const totalProductsAmount = mergedProducts.length;

    const respondeData = {
      paginatedProducts,
      startIndex,
      endIndex,
      pageCount,
      totalProductsAmount,
    };

    return NextResponse.json(respondeData);
  } catch (err) {
    return NextResponse.json(
      { message: "Error happened while trying to fetch products!" },
      { status: 500 }
    );
  }
}
