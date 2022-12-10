import { View } from "react-native";
import { Modal, Portal, Switch, Text } from "react-native-paper";

type WaterbodyFilterModalProps = {
  isOpenSeason: boolean;
  visible: boolean;

  onToggleOpenSeason: (isOpenSeason: boolean) => void;
  onClose: () => void;
};

export const WaterbodyFilterModal: React.FC<WaterbodyFilterModalProps> = ({
  isOpenSeason,
  visible,
  onClose,
  onToggleOpenSeason,
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
              value={isOpenSeason}
              onValueChange={() => onToggleOpenSeason(!isOpenSeason)}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
