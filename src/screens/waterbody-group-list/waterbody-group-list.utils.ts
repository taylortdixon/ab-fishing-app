import dayjs from "dayjs";
import { Waterbody, WaterbodyGroup } from "../../../regulations/waterbody.type";
import { SearchFilters } from "./waterbody-group-list-filters.hook";

const REGULATIONS_CUTOFF_MONTH_INDEX = 2; // March
const TODAY = dayjs();
const CURRENT_YEAR = TODAY.year();
const REGULATIONS_YEAR =
  TODAY.month() > REGULATIONS_CUTOFF_MONTH_INDEX
    ? CURRENT_YEAR
    : CURRENT_YEAR - 1;

const filterOpenSeason = (dateRange: string) => {
  if (dateRange.toLowerCase() === "open all year") {
    return true;
  }

  const match = dateRange.match(/Open ([A-z]+ [0-9]+) to ([A-z]+ [0-9]+)/i);

  if (!match) {
    return false;
  }

  // Format like "Jan 12", "Oct 25"
  const [, startDateString, endDateString] = match;
  const startDate = dayjs(`${startDateString} ${REGULATIONS_YEAR}`);
  let endDate = dayjs(`${endDateString} ${REGULATIONS_YEAR}`);

  if (endDate.isBefore(startDate)) {
    endDate = dayjs(`${endDateString} ${REGULATIONS_YEAR + 1}`);
  }

  return TODAY.isSameOrAfter(startDate) && TODAY.isSameOrBefore(endDate);
};

const filterZone = (
  currentFishManagementZone: string,
  selectedFishManagementZone: string
) => {
  return currentFishManagementZone.startsWith(selectedFishManagementZone);
};

const filterWaterbodyType = (
  currentFishManagementZone: string,
  selectedWaterbodyType: string
) => {
  return currentFishManagementZone.endsWith(selectedWaterbodyType);
};

export const filterWaterbodyGroup =
  (searchFilters: SearchFilters) => (waterbodyGroup: WaterbodyGroup) => {
    let results = [];

    if (searchFilters.name) {
      results.push(
        waterbodyGroup.name
          .toLowerCase()
          .includes(searchFilters.name.toLowerCase())
      );
    }

    if (searchFilters.isOpenSeason) {
      results.push(
        waterbodyGroup.waterbodies.some((waterbody) =>
          filterOpenSeason(waterbody.season)
        )
      );
    }

    if (searchFilters.zone) {
      results.push(
        waterbodyGroup.waterbodies.some((waterbody) =>
          filterZone(waterbody.fish_management_zone, searchFilters.zone)
        )
      );
    }

    if (searchFilters.waterbodyType) {
      results.push(
        waterbodyGroup.waterbodies.some((waterbody) =>
          filterWaterbodyType(
            waterbody.fish_management_zone,
            searchFilters.waterbodyType
          )
        )
      );
    }

    return results.every((result) => !!result);
  };
