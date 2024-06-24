import PaginationButton from "./PaginationButton";
import Link from "next/link";
import { DOTS } from "@/app/shared/consts";

type PaginationNavigationProps = {
  currentPage: number;
  totalNumberOfPages: number;
};

const PaginationNavigation = ({
  currentPage,
  totalNumberOfPages,
}: PaginationNavigationProps) => {
  const paginationButtonsInCenter: ("..." | number)[] = [];

  const firstPaginationButton = 2;
  const lastPaginationButton = totalNumberOfPages - 1;
  const numberOfButtonsToDisplay = 5;

  const displayPartOfButtons = totalNumberOfPages > numberOfButtonsToDisplay;
  const isOnFirstFewPages = currentPage <= firstPaginationButton + 1;
  const isOnLastFewPages = currentPage >= lastPaginationButton - 1;

  if (displayPartOfButtons) {
    if (isOnFirstFewPages) {
      for (let i = firstPaginationButton; i <= numberOfButtonsToDisplay; i++) {
        paginationButtonsInCenter.push(i);
      }
      paginationButtonsInCenter.push(DOTS);
    } else if (isOnLastFewPages) {
      paginationButtonsInCenter.push(DOTS);
      for (
        let i = totalNumberOfPages - numberOfButtonsToDisplay + 1;
        i <= lastPaginationButton;
        i++
      ) {
        paginationButtonsInCenter.push(i);
      }
    } else {
      paginationButtonsInCenter.push(DOTS);
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        paginationButtonsInCenter.push(i);
      }
      paginationButtonsInCenter.push(DOTS);
    }
  } else {
    for (let i = firstPaginationButton; i <= lastPaginationButton; i++) {
      paginationButtonsInCenter.push(i);
    }
  }

  const paginationButtons: ("..." | number)[] = [
    1,
    ...paginationButtonsInCenter,
    totalNumberOfPages,
  ];

  const backButtonIsDisabled = currentPage === 1;
  const nextButtonIsDisabled = currentPage === totalNumberOfPages;
  const nextPage = currentPage + 1;
  const previousPage = currentPage - 1;

  if (totalNumberOfPages === 1) return null;

  return (
    <ul className="flex gap-1 ">
      <li>
        <Link
          className={`${backButtonIsDisabled ? "pointer-events-none" : ""}`}
          href={`/products?page=${previousPage}`}
        >
          <PaginationButton disabled={backButtonIsDisabled}>
            {"<"}
          </PaginationButton>
        </Link>
      </li>
      {paginationButtons.map((el, index) => (
        <li key={index}>
          {el === DOTS ? (
            <PaginationButton>{el}</PaginationButton>
          ) : (
            <Link href={`/products?page=${el}`}>
              <PaginationButton active={el === currentPage}>
                {el}
              </PaginationButton>
            </Link>
          )}
        </li>
      ))}
      <li>
        <Link
          className={`${nextButtonIsDisabled ? "pointer-events-none" : ""}`}
          href={`/products?page=${nextPage}`}
        >
          <PaginationButton disabled={nextButtonIsDisabled}>
            {">"}
          </PaginationButton>
        </Link>
      </li>
    </ul>
  );
};

export default PaginationNavigation;
