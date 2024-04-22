"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { buildAbilityFor } from "./abilities";
import { Ability, AbilityTuple, MongoQuery } from "@casl/ability";

interface AbilityContextProps {
  ability: Ability<AbilityTuple, MongoQuery> | undefined;
}

export const AbilityContext = createContext<AbilityContextProps>({
  ability: undefined,
});

interface AbilityProviderProps {
  children: React.ReactNode;
}

export const AbilityProvider = ({ children }: AbilityProviderProps) => {
  const [ability, setAbility] = useState<Ability<AbilityTuple, MongoQuery>>();

  useEffect(() => {
    const rules = buildAbilityFor();
    setAbility(rules);
  }, []);

  return (
    <AbilityContext.Provider value={{ ability }}>
      {children}
    </AbilityContext.Provider>
  );
};

export const useAbility = () => useContext(AbilityContext);
