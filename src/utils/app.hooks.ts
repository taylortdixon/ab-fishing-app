import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import {
  waterbodyGroups as defaultWaterbodyGroups,
  REGULATIONS_VERSION as defaultRegulationsVersion,
} from "../../regulations/fishing-regulations";
import { RegulationsDefinition } from "../../regulations/waterbody.type";

const CONFIRMATION_STORAGE_KEY = "@confirmation";
const REGULATIONS_STORAGE_KEY = "@regulations";
const REGULATIONS_REMOTE_URL = "https://abfishing.ca/regulations.json";

export const useAppInitialization = () => {
  const [initialized, setInitialized] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const [regulations, setRegulations] =
    useState<RegulationsDefinition>(undefined);

  // Determine the initial waterbody groups to present to the user when the app is initialized.
  useEffect(() => {
    async function loadGroups() {
      try {
        const value = await AsyncStorage.getItem(REGULATIONS_STORAGE_KEY);

        if (value !== null) {
          const parsedValue: RegulationsDefinition = JSON.parse(value);
          setRegulations(parsedValue);
        }
        if (value === null) {
          setRegulations({
            version: defaultRegulationsVersion,
            waterbody_groups: defaultWaterbodyGroups,
          });
        }
      } catch (e) {
        AsyncStorage.clear();
      } finally {
        setInitialized(true);
      }
    }

    loadGroups();
  }, []);

  useEffect(() => {
    async function updateStoredRegulations() {
      if (!regulations) {
        return;
      }

      try {
        const value = JSON.stringify(regulations);
        await AsyncStorage.setItem(REGULATIONS_STORAGE_KEY, value);
      } catch (e) {}
    }

    updateStoredRegulations();
  }, [regulations]);

  useEffect(() => {
    async function fetchLatestRegulations() {
      // Allow waterbody groups to load into the app before requesting latest
      if (!regulations) {
        return;
      }

      try {
        const existingStoredValue = await AsyncStorage.getItem(
          REGULATIONS_STORAGE_KEY
        );

        // bail if no regulations are stored on device.
        if (existingStoredValue === null) {
          return;
        }

        const existingRegulationsDefinition: RegulationsDefinition =
          JSON.parse(existingStoredValue);

        const response = await fetch(REGULATIONS_REMOTE_URL);
        const updatedRegulationsDefinition: RegulationsDefinition =
          await response.json();

        if (
          dayjs(updatedRegulationsDefinition.version).isAfter(
            existingRegulationsDefinition.version
          )
        ) {
          setRegulations(updatedRegulationsDefinition);
        }
      } catch (e) {}
    }

    fetchLatestRegulations();
  }, [regulations]);

  useEffect(() => {
    async function fetchConfirmation() {
      try {
        const storedConfirmation = await AsyncStorage.getItem(
          CONFIRMATION_STORAGE_KEY
        );

        setConfirmed(!!storedConfirmation);
      } catch (e) {
        setConfirmed(true);
      }
    }

    fetchConfirmation();
  }, []);

  const updateConfirmation = async () => {
    try {
      await AsyncStorage.setItem(CONFIRMATION_STORAGE_KEY, "true");
    } catch (e) {
    } finally {
      setConfirmed(true);
    }
  };

  return {
    initialized,
    regulations: regulations,
    confirmed,
    updateConfirmation,
  } as const;
};
