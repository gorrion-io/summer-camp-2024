import { Product } from "@/schemas/productSchema";
import { FC } from "react";

const tableHeaders = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name", minWidth: "min-w-[40%]" },
  { id: "price", label: "Price" },
  { id: "quantity", label: "Quantity" },
  { id: "isAlcohol", label: "Contains alcohol" },
];

const ProductsTable: FC<{ products: Product[] }> = ({ products }) => {
  return (
    <table className="min-w-full divide-y divide-gray-700">
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th
              key={header.id}
              scope="col"
              className={`py-3.5 px-3 text-left text-sm font-semibold text-white ${
                header.minWidth ?? ""
              }`}
            >
              {header.label}
            </th>
          ))}
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-800">
        {products.map((product) => (
          <tr key={product.id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
              {product.id}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
              {product.name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
              {product.price} {product.currency}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
              {product.quantity}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
              {product.isAlcohol ? "Yes" : "No"}
            </td>
          </tr>
        ))}
        {Array.from({ length: Math.max(0, 10 - products.length) }).map(
          (_, index) => (
            // always render 10 rows for consistent styling
            <tr key={"blankRow_" + index}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                &nbsp;
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                &nbsp;
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                &nbsp;
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                &nbsp;
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                &nbsp;
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default ProductsTable;
