import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import firebase from '../../config/firebase.js'
import styles from "./style";

export default function NewWarning({ navigation }, props) {

    const [description, setDescription] = useState(null);
    const [data, setData] = useState(null);
    const [responsavel, setResponsavel] = useState(null);
    const database = firebase.firestore();
    const user = firebase.auth().currentUser.email
    
    function addWarning(){
      let condAtual;
      
      database.collection("cond").onSnapshot((query) => {
             query.forEach((doc) => {
                  if (doc.id === user){
                     condAtual = (doc.data().cod)
                  }
                });
      database.collection('Avisos').add({
        description: description,
        responsavel : user,
        data: data,
        cod : condAtual
      })
      navigation.navigate("Warnings");
    
                         
  })
};

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

    