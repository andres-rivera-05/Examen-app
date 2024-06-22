import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type ItemDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ItemDetail"
>;

const ItemDetalles = () => {
  const route = useRoute();
  const navigation = useNavigation<ItemDetailScreenNavigationProp>();
  const { item } = route.params;

  const deleteItem = () => {
    // Implement item deletion logic here
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Detalle</Text>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}
      <Text>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>{item.price}</Text>
      <Button title="Eliminar" onPress={deleteItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});

export default ItemDetalles;
