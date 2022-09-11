import React, { useState } from "react"
import {View, Text, TextInput, TouchableOpacity}  from "react-native"

import firebase from "../../config/firebase"
import styles from "./style"

export default function Details({navigation, route}){
    const [descriptionEdit, setDescriptionEdit] = useState(route.params.description);
    const [valorEdit, setValorEdit] = useState(route.params.valor);
    const idTask = route.params.id
    const database = firebase.firestore();
  
    function editTaskDescription(description, id){
      database.collection('Custos').doc(id).update({
        description: description
      })
      navigation.navigate("Custos")
    }

    function editTaskValor(valor, id){
      database.collection('Custos').doc(id).update({
        valor: valor
      })
      navigation.navigate("Custos")
    }

    return(
        <View style={styles.container}>
          <Text style={styles.label}>Description</Text>
          { <TextInput
          style={styles.input}
          placeholder="Descrição do Custo"
          onChangeText={setDescriptionEdit}
          value={descriptionEdit}
          /> }
          <TextInput
          style={styles.input}
          placeholder="Valor do Custo"
          onChangeText={setValorEdit}
          value={valorEdit}
          /> 
          <TouchableOpacity 
            style={styles.buttonNewTask}
            onPress={()=>{
              editTaskDescription(descriptionEdit, idTask),
              editTaskValor(valorEdit, idTask)
            }}
          >
            <Text style={styles.iconButton}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )
    } 