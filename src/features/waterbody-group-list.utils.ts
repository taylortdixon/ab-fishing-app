import { Waterbody } from "../../regulations/waterbody.type";

export const filterWaterbodyGroup =
  (searchQuery: string) => (waterbody: Waterbody) => {
    if (!searchQuery) return true;
    return waterbody.waterbody
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  };
