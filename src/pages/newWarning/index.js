import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import firebase from '../../config/firebase.js'
import styles from "./style";

export default function NewWarning({ navigation }, props) {

    const [description, setDescription] = useState(null);
    const [data, setData] = useState(null);
    const [responsavel, setResponsavel] = useState(null);
    const database = firebase.firestore();
  
    function addWarning(){
      database.collection('Avisos').add({
        description: description,
        data : data,
        responsavel : responsavel
      })
      navigation.navigate("Warnings");
    }

    return(
        <View style={styles.container}>
          <Text style={styles.label}>Novo Aviso</Text>
          <TextInput
          style={styles.input}
          placeholder="Descrição do Aviso"
          onChangeText={setDescription}
          value={description}
          />
          <TextInput
          style={styles.input}
          placeholder="Data do Acontecimento"
          onChangeText={setData}
          value={data}
          />
          <TextInput
          style={styles.input}
          placeholder="Responsável pelo Aviso"
          onChangeText={setResponsavel}
          value={responsavel}
          />
          <TouchableOpacity 
            style={styles.buttonNewTask}
            onPress={()=>{
              addWarning()
            }}
          >
            <Text style={styles.iconButton}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )
    }

    