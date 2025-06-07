import React from 'react';
import { Button, Dialog, Paragraph, Portal, useTheme } from "react-native-paper";
import { Linking, StyleSheet } from 'react-native';

type InfoDialogProps = {
  visible: boolean;
  onDismiss: () => void;
};

export const InfoDialog: React.FC<InfoDialogProps> = ({ visible, onDismiss }) => {
  const theme = useTheme();
  
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>About AB Fishing</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={styles.disclaimer}>
            DISCLAIMER: This app is not affiliated with or endorsed by the Government of Alberta.
          </Paragraph>
          <Paragraph>
            AB Fishing helps anglers access up-to-date fishing regulations for Alberta's lakes and rivers in a user-friendly format.
          </Paragraph>
          <Paragraph>
            All information is sourced directly from the official Alberta Government fishing regulations available at:
          </Paragraph>
          <Paragraph 
            style={styles.link}
            onPress={() => Linking.openURL("https://albertaregulations.ca/fishingregs/")}
          >
            albertaregulations.ca/fishingregs
          </Paragraph>
          <Paragraph>
            While we strive for accuracy, it remains your responsibility to verify information and follow all applicable regulations when fishing.
          </Paragraph>
          <Paragraph style={styles.privacySection}>
            Your privacy matters to us. Read our privacy policy:
          </Paragraph>
          <Paragraph 
            style={styles.link}
            onPress={() => Linking.openURL("https://www.abfishing.ca/privacy-policy")}
          >
            abfishing.ca/privacy-policy
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button 
            onPress={() => Linking.openURL("https://albertaregulations.ca/fishingregs/")}
            textColor={theme.colors.secondary}
          >
            Official Regulations
          </Button>
          <Button onPress={onDismiss}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    zIndex: 1000,
    elevation: 24,
  },
  disclaimer: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  link: {
    color: '#0066cc',
    textDecorationLine: 'underline',
    marginVertical: 5,
  },
  privacySection: {
    marginTop: 10,
  }
});


