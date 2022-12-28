import { ScrollView } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  ProgressBar,
  useTheme,
} from "react-native-paper";
import { useRegulationsContext } from "../../../components/regulations.context";
import { useWelcomeModalSteps } from "./welcome-modal-steps.hooks";
import { welcomeModalStyles } from "./welcome-modal.styles";
import { WelcomeView1 } from "./welcome-view-1";
import { WelcomeView2 } from "./welcome-view-2";
import { WelcomeView3 } from "./welcome-view-3";

const welcomeViews = [WelcomeView1, WelcomeView2, WelcomeView3];

export const WelcomeModal = () => {
  const theme = useTheme();
  const {
    currentStep,
    hasNextStep,
    hasPreviousStep,
    goToNextStep,
    goToPreviousStep,
  } = useWelcomeModalSteps(welcomeViews.length);

  const { confirmed, welcomed, updateWelcomed } = useRegulationsContext();

  if (!confirmed || welcomed) {
    return null;
  }
  const handleWelcomeComplete = () => updateWelcomed();

  const stepProgress = currentStep / (welcomeViews.length - 1);
  const WelcomeView = welcomeViews[currentStep];

  return (
    <Portal>
      <Dialog visible={true}>
        <Dialog.Title>Welcome to AB Fishing</Dialog.Title>
        <Dialog.ScrollArea
          style={{
            paddingHorizontal: 0,
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
          }}
        >
          <ScrollView>
            <Dialog.Content>
              <ProgressBar
                progress={stepProgress}
                color={theme.colors.tertiary}
              />
              <WelcomeView />
            </Dialog.Content>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions style={welcomeModalStyles.buttonRow}>
          {!hasPreviousStep && (
            <Button
              textColor={theme.colors.secondary}
              onPress={handleWelcomeComplete}
            >
              Skip
            </Button>
          )}
          {hasPreviousStep && (
            <Button
              textColor={theme.colors.secondary}
              onPress={goToPreviousStep}
            >
              Back
            </Button>
          )}
          {hasNextStep && <Button onPress={goToNextStep}>Next</Button>}
          {!hasNextStep && (
            <Button onPress={handleWelcomeComplete}>Finish</Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
