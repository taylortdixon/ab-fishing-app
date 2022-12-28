import { View } from "react-native";
import { List, Paragraph, Surface, Text } from "react-native-paper";
import { fishLimitsIconMap } from "../../../components/fish-icons/fish-icons";
import { welcomeModalStyles } from "./welcome-modal.styles";

const PikeIcon = fishLimitsIconMap.northern_pike;
const WalleyeIcon = fishLimitsIconMap.walleye;

export const WelcomeView1: React.FC = () => {
  return (
    <>
      <List.Section style={{ marginHorizontal: 16 }}>
        <List.Item
          title="Walleye"
          description="2 fish"
          left={() => <WalleyeIcon width={50} height={50} />}
        />
        <List.Item
          title="Pike"
          description="1 over 63 cm"
          left={() => <PikeIcon width={50} height={50} />}
        />
      </List.Section>
      <Text variant="titleMedium" style={welcomeModalStyles.subHeading}>
        Find out what you can catch!
      </Text>
      <Paragraph style={welcomeModalStyles.paragraph}>
        Look up the fishing regulations for lakes and rivers in Alberta.
        Available even when you don't have cell service.
      </Paragraph>
    </>
  );
};
