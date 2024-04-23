"use client";
import React from "react";
import { useAbility } from "@/lib/guards/ability-provider";

const Abilities = () => {
  const { ability } = useAbility();

  return (
    <div>
      <span>
        {ability?.can("show", "Staff")
          ? "You can see Staff"
          : "You can't see Staff"}
      </span>
    </div>
  );
};

export default Abilities;
