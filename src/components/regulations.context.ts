import { createContext, useContext } from "react";
import { RegulationsDefinition } from "../../regulations/waterbody.type";

type RegulationsContextType = {
  regulations: RegulationsDefinition;
  confirmed: boolean;
  updateConfirmation: () => void;
};

export const RegulationsContext = createContext<
  RegulationsContextType | undefined
>(undefined);

export const useRegulationsContext = () => {
  const context = useContext(RegulationsContext);

  if (!context) {
    throw new Error(
      "useRegulationsContext must be used within RegulationsContextProvider"
    );
  }

  return context;
};
