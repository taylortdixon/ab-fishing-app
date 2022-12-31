import { useMemo, useState } from "react";
import { FishLimit } from "../../../regulations/waterbody.type";
import { useRegulationsContext } from "../../components/regulations.context";
import { filterWaterbodyGroup } from "./waterbody-group-list.utils";

export type SearchFilters = {
  name?: string;
  isOpenSeason?: boolean;
  baitRestrictions?: "bait_allowed" | "bait_restricted";
  fishRetention?: FishLimit;
  zone?: string;
  waterbodyType?: string;
};

export type UpdateSearchFilter<
  K extends keyof SearchFilters,
  P extends SearchFilters[K]
> = (name: K, value: P) => void;

export const useFilteredWaterbodyGroups = () => {
  const { regulations } = useRegulationsContext();
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});

  const updateSearchFilter = <
    K extends keyof SearchFilters,
    P extends SearchFilters[K]
  >(
    name: K,
    value: P
  ) => {
    setSearchFilters({ ...searchFilters, [name]: value });
  };

  const filteredWaterbodyGroups = useMemo(
    () =>
      Object.values(regulations.waterbody_groups).filter(
        filterWaterbodyGroup(searchFilters)
      ),
    [regulations, searchFilters]
  );

  return {
    searchFilters,
    filteredWaterbodyGroups,
    updateSearchFilter,
  } as const;
};
