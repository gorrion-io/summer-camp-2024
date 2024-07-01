import React from "react";

function TableContent({ product }: any) {
  return (
    <tr key={product.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-black sm:pl-0">
        {product.id}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-black">
        {product.name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-black">
        {product.price} {product.currency}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-black">
        {product.quantity}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-black">
        {product.isAlcohol ? "Yes" : "No"}
      </td>
    </tr>
  );
}

export default TableContent;
