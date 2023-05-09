import { LightSensor } from "expo-sensors";
import { Card, Text } from "react-native-paper";
import { Platform, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  card: {
    marginTop: 25,
    marginBottom: 25
  }
});

interface LightSensorData {
  illuminance: number;
}

const LightSensorComponent = () => {
  const [data, setData] = useState({ illuminance: 0 });
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(
      LightSensor.addListener((result) => {
        setData(result);
      })
    );
    LightSensor.setUpdateInterval(100);
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
      <Card.Title title="Light Sensor" titleVariant="displaySmall" />
      <Card.Content>
        <Text variant="titleLarge">Illuminance: {Platform.OS === 'android' ? `${data.illuminance} lx` : `Only available on Android`}</Text>
      </Card.Content>
    </Card>
  );
}

export default LightSensorComponent;