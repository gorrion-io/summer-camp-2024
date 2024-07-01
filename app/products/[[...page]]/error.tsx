"use client";
import React from "react";

function error({ error }: { error: Error }) {
  console.error(error);
  return <div>there was an error...</div>;
}

export default error;
