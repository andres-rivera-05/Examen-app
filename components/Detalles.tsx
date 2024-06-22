import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Detail"
>;

const Detalles = () => {
  const route = useRoute();
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const { items } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
      <Text>{item.description}</Text>
      <Button
        title="Ver"
        onPress={() => navigation.navigate("ItemDetail", { item })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
  },
});

export default Detalles;
