import { Magnetometer } from "expo-sensors";
import { Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  card: {
    marginTop: 25,
    marginBottom: 25
  }
});

interface MagnetometerData {
  x;
  y;
  z: number;
}

const MagnetometerComponent = () => {
  const [data, setData] = useState<MagnetometerData>({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((result) => {
        setData(result);
      })
    );
    Magnetometer.setUpdateInterval(100);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <Card style={styles.card}>
      <Card.Title title="Magnetometer" titleVariant="displaySmall" />
      <Card.Content>
        <Text variant="titleLarge">x: {data.x}</Text>
        <Text variant="titleLarge">y: {data.y}</Text>
        <Text variant="titleLarge">z: {data.z}</Text>
      </Card.Content>
    </Card>
  );
};

export default MagnetometerComponent;
