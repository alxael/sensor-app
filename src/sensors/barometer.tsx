import { Barometer } from "expo-sensors";
import { Card, Surface, Text } from "react-native-paper";
import { StyleSheet, Platform } from "react-native";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  card: {
    marginTop: "1rem",
    marginBottom: "1rem"
  },
});

interface BarometerData {
  pressure: number;
  relativeAltitude: number;
}

const BarometerComponent = () => {
  const [data, setData] = useState({
    pressure: 0,
    relativeAltitude: 0,
  } as BarometerData);
  const [subscription, setSubscription] = useState(null);

  const toggleListener = () => {
    subscription ? _unsubscribe() : _subscribe();
  };

  const _subscribe = () => {
    setSubscription(Barometer.addListener(setData as any));
    Barometer.setUpdateInterval(100);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return _unsubscribe();
  }, []);

  return (
    <Card style={styles.card}>
      <Card.Title title="Barometer" titleVariant="displaySmall" />
      <Card.Content>
        <Text variant="titleLarge">Pressure: {data.pressure} hPa</Text>
        <Text variant="titleLarge">
          Relative altitude:{" "}
          {Platform.OS === "ios"
            ? `${data.relativeAltitude} m`
            : "Only available on IOS."}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default BarometerComponent;
