import Link from "next/link";
import React from "react";

const notFoundPage = () => {
  return (
    <div>
      {`Sorry, we couldn't find what are you looking for. `}
      {/* normal anchor tag instead of <Link> bcs next couldn't handle that and we need to rerender page for some reason*/}
      <Link href={"/products"}>Go back to product page</Link>
    </div>
  );
};

export default notFoundPage;
