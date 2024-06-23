import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
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

  const addItem = async () => {
    const formData = new FormData();
    formData.append("nombre", name);
    formData.append("descripcion", description);
    formData.append("estado", state);
    formData.append("categoria", category);
    formData.append("precio", price);

    if (image) {
      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];
      formData.append("imagen", {
        uri: image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      } as any); // Agrega 'as any' para evitar el error de TypeScript
    }

    try {
      const response = await fetch("http://localhost:4756/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert("Éxito", "Item guardado con éxito");
        setItems([...items, data]);
        setName("");
        setDescription("");
        setState("");
        setCategory("");
        setPrice("");
        setImage(null);
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.mensaje);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
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
      <Picker
        selectedValue={state}
        onValueChange={(itemValue) => setState(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Disponible" value="Disponible" />
        <Picker.Item label="No disponible" value="No disponible" />
      </Picker>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Utencilios" value="Utencilios" />
        <Picker.Item label="Herramientas" value="Herramientas" />
      </Picker>
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
      <TouchableOpacity style={styles.button} onPress={addItem}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Detail", { items })}
      >
        <Text style={styles.buttonText}>Detalles</Text>
      </TouchableOpacity>
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
    borderRadius: 10,
  },
  imageButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default Home;
