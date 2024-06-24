"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const numberOfProductsPerPage = Number(
    params.get("perPage") || productsPerPage
  );

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const currentPage = Number(params.get("page"));
  const maxPage = Math.ceil(totalNumberOfProducts / numberOfProductsPerPage);

  const pageHandler = () => {
    if (buttonAction === "next") {
      if (currentPage === 0) {
        params.set("page", "2");
      } else if (currentPage >= maxPage) {
        params.set("page", String(currentPage));
      } else {
        params.set("page", String(currentPage + 1));
      }
    } else if (buttonAction === "prev") {
      if (currentPage === 1 || currentPage === 0) {
        params.set("page", "1");
      } else {
        params.set("page", String(currentPage - 1));
      }
    }
    replace(`${pathname}?${params.toString()}`);
  };

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

  return (
    <>
      <button
        aria-disabled={isButtonDisabled && true}
        tabIndex={isButtonDisabled ? -1 : undefined}
        onClick={pageHandler}
        className={`${
          isButtonDisabled ? "pointer-events-none" : ""
        } relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black focus-visible:outline-offset-0`}
      >
        {buttonText}
      </button>
    </>
  );
};

export default ChangePageButton;
