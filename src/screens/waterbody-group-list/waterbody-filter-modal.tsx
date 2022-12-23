import { View } from "react-native";
import { Modal, Portal, Switch, Text } from "react-native-paper";
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

export const WaterbodyFilterModal: React.FC<WaterbodyFilterModalProps> = ({
  searchFilters,
  visible,
  onClose,
  updateSearchFilter,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: 20,
          position: "absolute",
          backgroundColor: "white",
          bottom: 0,
          left: 0,
          right: 0,
          height: 300,
        }}
      >
        <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
          Filter by
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginRight: 12 }}>Open Season</Text>
          <View>
            <Switch
              value={searchFilters.isOpenSeason}
              onValueChange={() =>
                updateSearchFilter("isOpenSeason", !searchFilters.isOpenSeason)
              }
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
