import { Product } from "@/app/types/productTypes";
import ProductsTableDataCell from "./ProductsTableDataCell";

type ProductsTableBodyProps = {
  paginatedProductsList: Product[];
};

const ProductsTableBody = ({
  paginatedProductsList,
}: ProductsTableBodyProps) => {
  return (
    <tbody className="divide-y divide-white/40">
      {paginatedProductsList.map((product: Product) => (
        <tr key={product.id}>
          <ProductsTableDataCell firstPlaceholder={product.id} />
          <ProductsTableDataCell firstPlaceholder={product.name} />
          <ProductsTableDataCell
            firstPlaceholder={product.price}
            secondPlaceholder={product.currency}
          />
          <ProductsTableDataCell firstPlaceholder={product.quantity} />
          <ProductsTableDataCell
            firstPlaceholder={product.isAlcohol ? "Yes" : "No"}
          />
        </tr>
      ))}
    </tbody>
  );
};

export default ProductsTableBody;
