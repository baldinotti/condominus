import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList, Alert, } from "react-native";
import firebase from "../../config/firebase.js";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./style";
import { TextInput } from "react-native-gesture-handler";

let statusUserAtual;
let condAtual;
let nome;
let sobrenome;
let cpf;
let telefone;
let torre;
let numeroCasa;
let optNotification;


export default function Dashboard({ navigation, route }) {
  const database = firebase.firestore();
  const user = firebase.auth().currentUser.email
  const statusUserAtual = route.params.statusUserAtual;
  const condAtual = route.params.condAtual;
  console.log(statusUserAtual)

  function logout() {
    firebase.auth().signOut().then(() => {
      navigation.popToTop("Login")
    }).catch((error) => {
    });

  }

  function configura(){
    database.collection("cond").onSnapshot((query) => {
      query.forEach((doc) => {
        if (doc.id === user) {
          nome = (doc.data().nome)
          sobrenome = (doc.data().sobrenome)
          telefone = (doc.data().telefone)
          cpf = (doc.data().cpf)
          torre = (doc.data().torre)
          numeroCasa = (doc.data().numeroCasa)
          optNotification = (doc.data().optNotification)
          navigation.navigate("Config",{
            nome: nome,
            sobrenome : sobrenome,
            telefone : telefone,
            cpf : cpf,
            torre : torre,
            numeroCasa : numeroCasa,
            statusUserAtual : statusUserAtual,
            condAtual : condAtual,
            optNotification : optNotification
          })
        }
        });

      })


  }

  // useEffect(() => {

  //   database.collection("cond").onSnapshot((query) => {
  //     query.forEach((doc) => {
  //       if (doc.id === user) {
  //         condAtual = (doc.data().cod)
          
  //         statusUserAtual = (doc.data().estadoUser)
  //         console.log(statusUserAtual)
  //       }
  //       });

  //     })
  //   },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CONDOMINUS</Text>
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={() => navigation.navigate("Custos")}
      >
        <Text style={styles.iconButton}>Tela de Custos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonWarnings}
        onPress={() => navigation.navigate("Warnings")}
      >
        <Text style={styles.iconButton}>Tela de Warnings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonLogout}
        onPress={() => configura()}
      >
        <Text style={styles.iconButton}>Configurações</Text>
      </TouchableOpacity>
      {statusUserAtual === "Administrador"
      ?      
      <TouchableOpacity
        style={styles.buttonLogout}
        onPress={() => navigation.navigate("Admin")}
      >
        <Text style={styles.iconButton}>Administração do Condomínio</Text>
      </TouchableOpacity>
      :
      null
      }
      <TouchableOpacity
        style={styles.buttonLogout}
        onPress={() => logout()}
      >
        <Text style={styles.iconButton}>Logout</Text>
      </TouchableOpacity>
    </View>
    
  )
}