"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

interface Props {
  prodLength: number;
}

function Showing(props: Props) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "0";
  return (
    <div className="hidden sm:block">
      <p className="text-sm">
        Showing <span className="font-medium">{parseInt(page) * 10}</span> to{" "}
        <span className="font-medium">
          {parseInt(page) * 10 + 10 < props.prodLength
            ? parseInt(page) * 10 + 10
            : props.prodLength}
        </span>{" "}
        of <span className="font-medium">{props.prodLength}</span> results
      </p>
    </div>
  );
}

export default Showing;
