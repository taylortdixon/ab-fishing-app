import { List, Paragraph, Text } from "react-native-paper";
import { welcomeModalStyles } from "./welcome-modal.styles";

export const WelcomeView2: React.FC = () => {
  return (
    <>
      <List.Item title="Aster Lake" style={{ marginTop: 8 }} />
      <List.Item title="Barnaby Lake" />
      <List.Item title="Bear Pond" />
      <List.Item title="Bearspaw Reservoir" />
      <Text variant="titleMedium" style={welcomeModalStyles.subHeading}>
        View all waterbodies in one place
      </Text>
      <Paragraph style={welcomeModalStyles.paragraph}>
        No need to sort through multiple PDFs to find what you're looking for.
        We still link you to the official regulations in case you're not sure.
      </Paragraph>
    </>
  );
};
