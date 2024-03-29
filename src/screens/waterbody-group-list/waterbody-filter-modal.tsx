import { StyleSheet, Image, View } from "react-native";
import { List, Modal, Portal, Text, useTheme } from "react-native-paper";
import { FishLimit } from "../../../regulations/waterbody.type";
import { FISH_LIMIT_LABELS } from "../../constants/fish-limit-labels.const";
import {
  SelectableFilterItem,
  SelectableFilterItemOption,
} from "./selectable-filter-item";
import { SearchFilters } from "./waterbody-group-list-filters.hook";

type WaterbodyFilterModalProps = {
  searchFilters: SearchFilters;
  visible: boolean;

  updateSearchFilter: <
    K extends keyof SearchFilters,
    P extends SearchFilters[K]
  >(
    name: keyof SearchFilters,
    value: P
  ) => void;
  onClose: () => void;
};

const fishManagementZoneOptions: SelectableFilterItemOption[] = [
  { label: "ES1", value: "ES1" },
  { label: "ES2", value: "ES2" },
  { label: "ES3", value: "ES3" },
  { label: "ES4", value: "ES4" },
  { label: "PP1", value: "PP1" },
  { label: "PP2", value: "PP2" },
  { label: "NB1", value: "NB1" },
  { label: "NB2", value: "NB2" },
  { label: "NB3", value: "NB3" },
  { label: "NB4", value: "NB4" },
];

const waterbodyTypeOptions: SelectableFilterItemOption[] = [
  { label: "Lakes", value: "Lakes" },
  { label: "Rivers", value: "Rivers" },
];

const baitBanOptions: SelectableFilterItemOption[] = [
  { label: "Bait allowed", value: "bait_allowed" },
  { label: "Bait banned", value: "bait_restricted" },
];

const fishRetentionOptions: SelectableFilterItemOption[] = Object.entries(
  FISH_LIMIT_LABELS
)
  .filter(
    ([value]: [FishLimit, string]) =>
      value !== "cisco" && value !== "trout_total"
  )
  .map<SelectableFilterItemOption>(([value, label]) => ({ label, value }));

export const WaterbodyFilterModal: React.FC<WaterbodyFilterModalProps> = ({
  searchFilters,
  visible,
  onClose,
  updateSearchFilter,
}) => {
  const theme = useTheme();

  const onFilterSelect: WaterbodyFilterModalProps["updateSearchFilter"] = (
    name,
    value
  ) => {
    updateSearchFilter(name, value);
    onClose();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContent}
        theme={theme}
      >
        <Text variant="headlineSmall" style={styles.header}>
          Filter by
        </Text>

        <List.Section>
          <List.Item
            title="Open Season"
            left={(props) => (
              <List.Icon {...props} icon="calendar-check-outline" />
            )}
            onPress={() => onFilterSelect("isOpenSeason", true)}
          />
          <SelectableFilterItem
            icon="check-outline"
            title="Fish Retention"
            onSubmit={(value) => onFilterSelect("fishRetention", value)}
            options={fishRetentionOptions}
          />
          <SelectableFilterItem
            icon="hook"
            title="Bait Restriction"
            message="Be sure to read details, some waterbodies may have restrictions on type of bait used."
            onSubmit={(value) => onFilterSelect("baitRestrictions", value)}
            options={baitBanOptions}
          />
          <SelectableFilterItem
            icon="map-outline"
            title="Zone"
            subtitle={
              <List.Accordion
                title="View Map"
                style={{ backgroundColor: theme.colors.elevation.level2 }}
              >
                <Image
                  source={require("../../static/map.png")}
                  resizeMode="stretch"
                  style={styles.zoneMapImage}
                />
              </List.Accordion>
            }
            onSubmit={(value) => onFilterSelect("zone", value)}
            options={fishManagementZoneOptions}
          />
          <SelectableFilterItem
            icon="wave"
            title="Waterbody Type"
            onSubmit={(value) => onFilterSelect("waterbodyType", value)}
            options={waterbodyTypeOptions}
          />
        </List.Section>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 20,
    position: "absolute",
    backgroundColor: "white",
    bottom: 0,
    left: 0,
    right: 0,
    height: 350,
  },
  header: {
    marginBottom: 16,
  },
  zoneMapImage: {
    height: 500,
    maxWidth: "100%",
  },
});
