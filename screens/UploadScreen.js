import React, { useState, useEffect } from "react";
import { View, Image, Button, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function UploadScreen({ route }) {
  const [image, setImage] = useState(route.params?.photo.uri || null);
  const [woodType, setWoodType] = useState(null);
  const [confidence, setConfidence] = useState(null);

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log("Picked image URI:", result.uri); // Debug: Log the picked image URI
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return; // Early return if no image is selected

    const formData = new FormData();
    formData.append("image", {
      uri: image,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await axios.post(
        "https://6486-102-88-69-172.ngrok-free.app/predict", // Replace with your machine's IP address
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setWoodType(response.data.wood_type);
      setConfidence(response.data.confidence);
      console.log(response.data);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response ? error.response.data : error.message
      );
      alert("Image upload failed!");
    }
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {woodType && (
        <Text style={styles.text}>Identified Wood Type: {woodType}</Text>
      )}
      {confidence && (
        <Text style={styles.text}>Confidence: {confidence.toFixed(2)}</Text>
      )}
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  text: {
    margin: 20,
    fontSize: 18,
  },
});
