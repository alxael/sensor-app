import { useState } from "react";
import {
  useMediaQuery,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { pink, deepPurple } from "@mui/material/colors";
import { NativeRouter, Navigate, Route, Routes } from "react-router-native";
import { View, StyleSheet, ScrollView } from "react-native";
import { DefaultTheme, Divider, Provider } from "react-native-paper";
import AccelerometerComponent from "./src/sensors/accelerometer";
import BarometerComponent from "./src/sensors/barometer";
import DeviceMotionComponent from "./src/sensors/deviceMotion";
import GyroscopeComponent from "./src/sensors/gyroscope";
import LightSensorComponent from "./src/sensors/lightSensor";
import MagnetometerComponent from "./src/sensors/magnetometer";
import PedometerComponent from "./src/sensors/pedometer";

const App = () => {
  const [light, setLight] = useState(false);

  const changeTheme = () => {
    setLight(!light);
  };

  const theme = {
    ...DefaultTheme,
    dark: true,
    changeTheme: changeTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "deepPurple",
      secondary: "pink",
    },
  };

  return (
    <Provider theme={theme}>
      <ScrollView>
        <AccelerometerComponent />
        <BarometerComponent />
        <DeviceMotionComponent />
        <GyroscopeComponent />
        <LightSensorComponent />
        <MagnetometerComponent />
        <PedometerComponent />
      </ScrollView>
    </Provider>
  );
};

export default App;
