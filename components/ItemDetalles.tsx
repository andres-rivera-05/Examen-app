import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import axios from "axios";
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
  const { id } = route.params;

  const [itemDetail, setItemDetail] = useState<any[]>([]);

  useEffect(() => {
    fetchItemDetail();
  }, []);

  const fetchItemDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:4756/item/${id}`);
      setItemDetail(response.data);
    } catch (error) {
      console.error("Error fetching item detail:", error);
    }
  };

  const deleteItem = async () => {
    try {
      await axios.delete(`http://localhost:4756/item/delete/${id}`);
      navigation.goBack(); 
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Detalle</Text>
      {itemDetail.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Text>{`Nombre: ${item.nombre}`}</Text>
          <Text>{`Descripción: ${item.descripcion}`}</Text>
          <Text>{`Categoría: ${item.categoria}`}</Text>
          <Text>{`Precio: ${item.precio}`}</Text>
          <Text>{`Precio: ${item.estado}`}</Text>
          <Button title="Eliminar" onPress={deleteItem} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
});

export default ItemDetalles;
