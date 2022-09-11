import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import firebase from '../../config/firebase.js'
import styles from "./style";

export default function NewTask({ navigation }, props) {

    const [description, setDescription] = useState(null);
    const [valor, setValor] = useState(null);
    const database = firebase.firestore();
  
    function addTask(){
      database.collection('Custos').add({
        description: description,
        valor : valor
      })
      navigation.navigate("Custos");
    }

    return(
        <View style={styles.container}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
          style={styles.input}
          placeholder="Descrição do custo"
          onChangeText={setDescription}
          value={description}
          />
          <TextInput
          style={styles.input}
          placeholder="Valor do custo"
          onChangeText={setValor}
          value={valor}
          />
          <TouchableOpacity 
            style={styles.buttonNewTask}
            onPress={()=>{
              addTask()
            }}
          >
            <Text style={styles.iconButton}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )
    }

    