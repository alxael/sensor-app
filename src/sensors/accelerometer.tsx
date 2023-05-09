import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import { Typography } from "@mui/material";
import { Text, Surface, Card } from "react-native-paper";

const styles = StyleSheet.create({
  card: {
    marginTop: 75,
    marginBottom: 25
  }
});

interface AccelerometerData {
  x;
  y;
  z: number;
}

const AccelerometerComponent = () => {
  const [data, setData] = useState<AccelerometerData>({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
    Accelerometer.setUpdateInterval(100);
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
      <Card.Title title="Accelerometer" titleVariant="displaySmall" />
      <Card.Content>
        <Text variant="titleLarge">x: {data.x}</Text>
        <Text variant="titleLarge">y: {data.y}</Text>
        <Text variant="titleLarge">z: {data.z}</Text>
      </Card.Content>
    </Card>

  );
};

export default AccelerometerComponent;
