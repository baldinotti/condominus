import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import firebase from "../../config/firebase"
import styles from "./style";
import { getAuth } from "firebase/auth";


export default function NewTask({ navigation }, props) {

    const [description, setDescription] = useState(null);
    const [valor, setValor] = useState(null);
    //const [tipo, setTipo] = useState(null);
    const [due, setDue] = useState(null);
    const database = firebase.firestore();
    
    const user = firebase.auth().currentUser.email
    
  
    function addTask(){
      let condAtual;
      
      database.collection("cond").onSnapshot((query) => {
             query.forEach((doc) => {
                  if (doc.id === user){
                     // console.log(user)
                     // console.log(doc.id)
                     // console.log(doc.data().cod)
                     condAtual = (doc.data().cod)
                     console.log(condAtual)      
                     //list1.push({ ...doc.data(), id: doc.id });
                  }
                });
      database.collection('Custos').add({
        description: description,
        valor : valor,
        responsavel : user,
        due: due,
        estado : "Aguardando Homologação",
        cod : condAtual
      })
      navigation.navigate("Custos");
    
                         
  })
};
    
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
          <TextInput
          style={styles.input}
          placeholder="Data de pagamento"
          onChangeText={setDue}
          value={due}
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

    