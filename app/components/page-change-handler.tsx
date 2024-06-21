"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { productsPerPage } from "../constants/main";
import { useEffect, useState } from "react";

interface ButtonProps {
  buttonText: string;
  buttonAction: string;
  totalNumberOfProducts: number;
}

const ChangePageButton = ({
  buttonText,
  buttonAction,
  totalNumberOfProducts,
}: ButtonProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams) || 1;
  const currentPage = Number(params.get("page"));
  const maxPage = Math.ceil(totalNumberOfProducts / productsPerPage);

  useEffect(() => {
    if (
      (buttonAction === "next" && currentPage >= maxPage) ||
      (buttonAction === "prev" && (currentPage === 1 || currentPage === 0))
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [buttonAction, currentPage, maxPage]);

  const pageHandler = () => {
    if (buttonAction === "next") {
      if (currentPage === 0) {
        return 2;
      } else if (currentPage >= maxPage) {
        return currentPage;
      } else {
        return currentPage + 1;
      }
    } else if (buttonAction === "prev") {
      if (currentPage === 1 || currentPage === 0) {
        return 1;
      } else {
        return currentPage - 1;
      }
    }
  };

  return (
    <Link
      aria-disabled={isButtonDisabled && true}
      tabIndex={isButtonDisabled ? -1 : undefined}
      href={`/products?page=${pageHandler()}`}
      className={`${
        isButtonDisabled ? "pointer-events-none" : ""
      } relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black focus-visible:outline-offset-0`}
    >
      {buttonText}
    </Link>
  );
};

export default ChangePageButton;
