"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/lib/products";
import { useSearchParams } from "next/navigation";
import TableContent from "./TableContent";
import TableHead from "./TableHead";

interface Props {
  products: Product[];
}

function Table(props: Props) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "0";
  const [productPag, setProductPag] = useState(props.products);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchNewPage(page: number) {
      const res = await fetch(
        `http://localhost:3000/api/products?page=${page}`
      );
      if (res.ok === false)
        setErrorMessage(
          "Something went terribly wrong, please try again later."
        );
      return res.json();
    }
    fetchNewPage(parseInt(page))
      .then((data) => {
        setProductPag(data);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [page]);

  return (
    <table className="min-w-full divide-y divide-gray-700 ml-1 mr-1">
      <TableHead />
      <tbody className="divide-y divide-gray-800">
        {errorMessage.length <= 0 ? (
          productPag.map((product: Product) => (
            <TableContent key={product.id} product={product} />
          ))
        ) : (
          <p className="mt-4 text-xl">{errorMessage}</p>
        )}
      </tbody>
    </table>
  );
}

export default Table;
