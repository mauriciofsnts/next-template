"use client";

import React from "react";
import { useBear } from "@/store/use-bear";

const BearComponent = () => {
  const { bear, updateBear } = useBear();
  return (
    <div>
      <h1>{bear}</h1>
      <button onClick={() => updateBear("🐨")}>Change to Koala</button>
    </div>
  );
};

export default BearComponent;
