import { DeviceMotion, DeviceMotionMeasurement } from "expo-sensors";
import { Card, Text } from "react-native-paper";
import { Platform, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  card: {
    marginTop: 25,
    marginBottom: 25
  }
});

const DeviceMotionComponent = () => {
  const [data, setData] = useState<DeviceMotionMeasurement>({
    acceleration: null,
    accelerationIncludingGravity: {
      x: 0,
      y: 0,
      z: 0,
    },
    interval: 0,
    orientation: 0,
    rotation: {
      alpha: 0,
      beta: 0,
      gamma: 0,
    },
    rotationRate: null,
  });
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(
      DeviceMotion.addListener((result) => {
        setData(result);
      })
    );
    DeviceMotion.setUpdateInterval(100);
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
      <Card.Title title="Device Motion" titleVariant="displaySmall" />
      <Card.Content>
        <Text variant="titleLarge">Alpha: {data.rotation.alpha}</Text>
        <Text variant="titleLarge">Beta: {data.rotation.beta}</Text>
        <Text variant="titleLarge">Gamma: {data.rotation.gamma}</Text>
      </Card.Content>
    </Card>
  );
};

export default DeviceMotionComponent;
