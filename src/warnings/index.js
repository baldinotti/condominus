import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, } from "react-native";
import firebase from "../config/firebase.js";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./style";
import emailjs from 'emailjs-com';
let auxUser;
let condAtual;
let auxMensagem;
let statusUserAtual;


function dispara(mensagem) {

  const database = firebase.firestore();
  const user = firebase.auth().currentUser.email

  database.collection("cond").onSnapshot((query) => {
    query.forEach((doc) => {
      if (doc.id === user) {
        condAtual = (doc.data().cod)
      }

    });
  })

  database.collection("cond").onSnapshot(async(query) => {
    const list = []
    for (let doc of query.docs) {
      if (condAtual === doc.data().cod) {
        var templateParams = {
          remetente: user,
          destinatario: doc.id,
          destinatarioemail: doc.id,
          mensagem: mensagem
        };
        list.push(templateParams)
        console.log(templateParams);
      }
    }
    for (let elemento of list){

      try{
      const response = await emailjs.send('service_6ap2rfc', 'template_6xh483m', elemento, 'hIA2EHNk3NdSX8gwt')
      console.log('Success!!!!', response.status, response.text);
      }
      catch(error){
        console.log('Failed...', error);
      }
    }
  })

};


export default function Warnings({ navigation }) {
  const [task, setTask] = useState([]);
  const [warning, setWarning] = useState([]);
  const database = firebase.firestore();
  const user = firebase.auth().currentUser.email

  function deleteWarning(id) {
    database.collection("Avisos").doc(id).delete();
  }

  useEffect(() => {


    database.collection("cond").onSnapshot((query) => {
      query.forEach((doc) => {
        if (doc.id === user) {
          condAtual = (doc.data().cod)
          statusUserAtual = (doc.data().estadoUser)
        }

        database.collection("Avisos").onSnapshot((query) => {
          const list = [];
          query.forEach((doc) => {
            if (condAtual === doc.data().cod)
            list.push({ ...doc.data(), id: doc.id });
          });
          setWarning(list);
        });

      })
    });
  }, []);



  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={warning}
        renderItem={({ item }) => {
          return (
            <View style={styles.Tasks}>
              <TouchableOpacity
                style={styles.deleteTask}
                onPress={() => {
                  deleteWarning(item.id)
                }}
              >
                <FontAwesome
                  name="trash"
                  size={23}
                  color="#1046c4"
                >
                </FontAwesome>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.enviaWarning}
                onPress={() => { dispara(item.description) }}
              >
                <FontAwesome
                  name="star"
                  size={23}
                  color="#1046c4"
                >
                </FontAwesome>
              </TouchableOpacity>
              <Text
                style={styles.DescriptionTask}
              >
                {item.description}
              </Text>
            </View>
          )
        }}
      />
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={() => navigation.navigate("Adicionar Warning")}
      >
        <Text style={styles.iconButton}>+</Text>
      </TouchableOpacity>



    </View>
  )
}