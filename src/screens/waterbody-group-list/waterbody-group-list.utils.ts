import dayjs from "dayjs";
import { Waterbody, WaterbodyGroup } from "../../../regulations/waterbody.type";

const REGULATIONS_CUTOFF_MONTH_INDEX = 2; // March
const TODAY = dayjs();
const CURRENT_YEAR = TODAY.year();
const REGULATIONS_YEAR =
  TODAY.month() > REGULATIONS_CUTOFF_MONTH_INDEX
    ? CURRENT_YEAR
    : CURRENT_YEAR - 1;

const filterOpenSeason = (dateRange: string) => {
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

export const filterWaterbodyGroup =
  (searchQuery: string, isOpenSeason: boolean) =>
  (waterbody: WaterbodyGroup) => {
    if (!searchQuery && !isOpenSeason) {
      return true;
    }

    if (waterbody.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }

    // if (filterOpenSeason(waterbody.season)) {
    //   return true;
    // }

    return false;
  };
