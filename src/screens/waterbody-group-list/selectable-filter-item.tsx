import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Button,
  Dialog,
  List,
  Portal,
  RadioButton,
  Text,
} from "react-native-paper";

export type SelectableFilterItemOption = {
  label: string;
  value: string;
};

type SelectableFilterItemProps = {
  title: string;
  subtitle?: React.ReactNode;
  icon: string;
  message?: string;
  options: SelectableFilterItemOption[];
  onSubmit: (newValue: any) => void;
};

export const SelectableFilterItem: React.FC<SelectableFilterItemProps> = ({
  icon,
  title,
  subtitle,
  message,
  options,
  onSubmit,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(undefined);

  return (
    <>
      <List.Item
        title={title}
        left={(props) => <List.Icon {...props} icon={icon} />}
        onPress={() => setDialogOpen(true)}
      />
      <Portal>
        <Dialog visible={dialogOpen} onDismiss={() => setDialogOpen(false)}>
          <Dialog.Title>Choose an option</Dialog.Title>

          <Dialog.ScrollArea style={styles.scrollArea}>
            <ScrollView>
              <Dialog.Content>
                {subtitle}
                <RadioButton.Group
                  onValueChange={(value) => setSelectedValue(value)}
                  value={selectedValue}
                >
                  {options.map((option) => (
                    <RadioButton.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </RadioButton.Group>
                {message && (
                  <Text variant="bodySmall" style={styles.message}>
                    {message}
                  </Text>
                )}
              </Dialog.Content>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => setDialogOpen(false)}>Cancel</Button>
            <Button
              onPress={() => onSubmit(selectedValue)}
              disabled={selectedValue === undefined}
            >
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  message: { marginTop: 20 },
  scrollArea: {
    maxHeight: 400,
  },
});
