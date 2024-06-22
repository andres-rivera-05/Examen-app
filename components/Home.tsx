import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const Home = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const addItem = () => {
    const newItem = { name, description, state, category, price, image };
    setItems([...items, newItem]);
    setName("");
    setDescription("");
    setState("");
    setCategory("");
    setPrice("");
    setImage(null);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Lo sentimos, necesitamos permisos de cámara para hacer esto funcionar."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Descripcion"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Estado"
        value={state}
        onChangeText={setState}
        style={styles.input}
      />
      <TextInput
        placeholder="Categoria"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <TextInput
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
      />
      <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text>Fotografía Item</Text>
        )}
      </TouchableOpacity>
      <Button title="Guardar" onPress={addItem} />
      <Button
        title="Detalle Items"
        onPress={() => navigation.navigate("Detail", { items })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
  },
  imageButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default Home;
