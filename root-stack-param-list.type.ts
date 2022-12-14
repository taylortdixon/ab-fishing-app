import { Waterbody } from "./regulations/waterbody.type";

export type RootStackParamList = {
  WaterbodyGroupList: undefined;
  WaterbodyGroupDetails: { waterbodyGroupId: string };
  WaterbodyGroupDetailsRegulation: { waterbody: Waterbody };
};
