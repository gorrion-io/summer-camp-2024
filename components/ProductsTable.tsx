import { Product } from "@/types";

interface ProductsTableProps {
  paginatedProducts: Product[];
}

const ProductsTable = ({ paginatedProducts }: ProductsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-red-400 sm:pl-0"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-red-400"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-red-400"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-red-400"
            >
              Quantity
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-red-400"
            >
              Contains alcohol
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {paginatedProducts?.map((product) => (
            <tr key={product.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-black sm:pl-0">
                {product.id}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                {product.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                {product.price} {product.currency}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                {product.quantity}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                {product.isAlcohol ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
