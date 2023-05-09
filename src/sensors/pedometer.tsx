import { Pedometer } from "expo-sensors";
import { Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  card: {
    marginTop: 25,
    marginBottom: 75
  }
});

const PedometerComponent = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const _subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      return Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = _subscribe();

  }, []);

  return (
    <Card style={styles.card}>
      <Card.Title title="Pedometer" titleVariant="displaySmall" />
      <Card.Content>
        {isPedometerAvailable ? (
          <>
            <Text variant="titleLarge">
              Steps taken in last 24h: {pastStepCount}
            </Text>
            <Text variant="titleLarge">
              Current step count: {currentStepCount}
            </Text>
          </>
        ) : (
          <Text variant="titleLarge">Pedometer is unavailable</Text>
        )}
      </Card.Content>
    </Card>
  );
};

export default PedometerComponent;
