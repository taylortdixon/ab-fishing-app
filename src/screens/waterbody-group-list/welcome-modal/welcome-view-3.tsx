import { List, Paragraph, Text } from "react-native-paper";
import { SelectableFilterItem } from "../selectable-filter-item";
import { welcomeModalStyles } from "./welcome-modal.styles";

export const WelcomeView3: React.FC = () => {
  return (
    <>
      <List.Section title="Filter by">
        <List.Item
          title="Open Season"
          left={(props) => (
            <List.Icon {...props} icon="calendar-check-outline" />
          )}
        />
        <List.Item
          title="Fish Retention"
          left={(props) => <List.Icon {...props} icon="check-outline" />}
        />
        <List.Item
          title="Bait Restriction"
          left={(props) => <List.Icon {...props} icon="hook" />}
        />
        <List.Item
          title="Zone"
          left={(props) => <List.Icon {...props} icon="map-outline" />}
        />
        <List.Item
          title="Waterbody Type"
          left={(props) => <List.Icon {...props} icon="wave" />}
        />
      </List.Section>
      <Text variant="titleMedium" style={welcomeModalStyles.subHeading}>
        Filter to find your spot!
      </Text>
      <Paragraph style={welcomeModalStyles.paragraph}>
        Don't know where to go? Use the filters to find the place that's good
        for you.
      </Paragraph>
    </>
  );
};
