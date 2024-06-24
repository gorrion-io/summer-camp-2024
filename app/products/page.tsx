import getProducts from "@/lib/getProducts";
import { redirect } from "next/navigation";
import Container from "../components/Container";
import ProductsTable from "../components/ProductsTable/ProductsTable";
import ProductsTableBody from "../components/ProductsTable/ProductsTableBody";
import ProductsTableHead from "../components/ProductsTable/ProductsTableHead";
import Pagination from "../components/Pagination/Pagination";

export default async function Products({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  /* TODO: Create an endpoint that returns a list of products, and use that here.
   */
  const currentPage = Number(searchParams.page);
  if (!currentPage || currentPage < 1) {
    redirect("/products?page=1");
  }
  const productsData = await getProducts(currentPage);

  const paginatedProductsList = productsData.paginatedProductsList;
  const totalNumberOfPages = productsData.totalNumberOfPages;
  const allProductsCount = productsData.allProductsCount;

  return (
    <Container>
      <ProductsTable
        tableBody={
          <ProductsTableBody paginatedProductsList={paginatedProductsList} />
        }
        tableHead={<ProductsTableHead />}
      />
      {/* TODO: Pagination */}
      <Pagination
        currentPage={currentPage}
        totalNumberOfPages={totalNumberOfPages}
        allProductsCount={allProductsCount}
      />
    </Container>
  );
}
