import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
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

  const createFormData = (photoUri: string | null, body: any) => {
    const data = new FormData();

    if (photoUri) {
      const uri =
        Platform.OS === "ios" ? photoUri.replace("file://", "") : photoUri;
      const photo = {
        uri,
        type: "image/png",
        name: "photo.png",
      };

      data.append("imagen", {
        uri: photo.uri,
        type: photo.type,
        name: photo.name,
      } as any); // Convertir a cualquier tipo para evitar errores de TypeScript

      console.log("Imagen seleccionada:", photo);
    }

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    console.log("Body:", data);

    return data;
  };

  const addItem = async () => {
    const formData = createFormData(image, {
      nombre: name,
      descripcion: description,
      estado: state,
      categoria: category,
      precio: price,
    });

    try {
      const response = await axios.post("http://localhost:4756/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Respuesta del servidor:", response.data);
      setItems([...items, response.data]);
      setName("");
      setDescription("");
      setState("");
      setCategory("");
      setPrice("");
      setImage(null);
    } catch (error) {
      console.error("Error al agregar el item:", error);
    }
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

    console.log("Resultado de ImagePicker:", result);

    if (!result.cancelled) {
      console.log("URI de la imagen seleccionada:", result.assets[0].uri); // Acceder correctamente a la URI de la imagen seleccionada
      setImage(result.assets[0].uri); // Establecer la imagen seleccionada en el estado
    } else {
      console.log("Selección de imagen cancelada");
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
        placeholder="Descripción"
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
        placeholder="Categoría"
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
          <Text>Fotografía del Item</Text>
        )}
      </TouchableOpacity>
      <Button title="Guardar" onPress={addItem} />
      <Button
        title="Detalle de Items"
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
