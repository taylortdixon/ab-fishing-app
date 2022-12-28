import { Linking, StyleSheet } from "react-native";
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  useTheme,
} from "react-native-paper";
import { useRegulationsContext } from "../../components/regulations.context";

export const ConfirmationModal = () => {
  const theme = useTheme();
  const { confirmed, updateConfirmation } = useRegulationsContext();

  return (
    <Portal>
      <Dialog visible={!confirmed}>
        <Dialog.Title>Disclaimer</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            This site is not affiliated with the Province of Alberta. While much
            effort has been put into making the data displayed here as accurate
            as possible, it is the user's responsibility to fish legally in the
            body of water they are in.
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={styles.buttonRow}>
          <Button
            onPress={() =>
              Linking.openURL("https://albertaregulations.ca/fishingregs/")
            }
            textColor={theme.colors.secondary}
          >
            View Regulations
          </Button>
          <Button onPress={updateConfirmation}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  buttonRow: { justifyContent: "space-between" },
});
