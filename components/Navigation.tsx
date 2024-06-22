import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Detalles from "./Detalles";
import ItemDetalles from "./ItemDetalles";
import { RootStackParamList } from "../types";

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detalles} />
        <Stack.Screen name="ItemDetail" component={ItemDetalles} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
