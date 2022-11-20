import React, { useState, useEffect } from "react";
import {View, Text, TextInput}  from "react-native"
import ToggleSwitchExample from './toggleSwitch';
import firebase from "../../config/firebase"
import styles from "./style"




export default function Config({navigation, route}){
    const [nome, setNome] = useState(route.params.nome);
    const [sobrenome, setSobrenome] = useState(route.params.sobrenome);
    const [cpf, setCpf] = useState(route.params.cpf);
    const [telefone, setTelefone] = useState(route.params.telefone);
    const [torre, setTorre] = useState(route.params.torre);
    const [numeroCasa, setNumeroCasa] = useState(route.params.numeroCasa);
    const [statusUserAtual, setStatusUserAtual] = useState(route.params.statusUserAtual);
    const [condAtual, setCondAtual] = useState(route.params.condAtual);
    const [optNotification, setOptNotification] = useState(route.params.condAtual);
    optNotification
    const database = firebase.firestore();

    const user = firebase.auth().currentUser.email


    return(
        <View style={styles.container}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
          disabled={true}
          style={styles.input}
          placeholder="Nome"
          value={nome}
          />
          <Text style={styles.label}>Sobrenome</Text>
          <TextInput
          disabled={true}
          style={styles.input}
          placeholder="Sobrenome"
          value={sobrenome}
          /> 
          <Text style={styles.label}>CPF</Text>
          <TextInput
          disabled={true}
          style={styles.input}
          placeholder="CPF"
          value={cpf}
          /> 
          <Text style={styles.label}>Telefone</Text>
          <TextInput
          disabled={true}
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          /> 
          <Text style={styles.label}>Código Condomínio</Text>
          <TextInput
          disabled={true}
          style={styles.input}
          placeholder="CPF"
          value={condAtual}
          /> 
          <Text style={styles.label}>Perfil do Usuário</Text>
          <TextInput
          disabled={true}
          style={styles.input}
          placeholder="Perfil do Usuário"
          value={statusUserAtual}
          /> 
          <Text style={styles.label}>Torre/Prédio/Ala</Text>
          <TextInput
          disabled={true}
          style={styles.input}
          placeholder="Torre/Prédio/Ala"
          value={torre}
          /> 
          <Text style={styles.label}>Número da Residência</Text>
          <TextInput
          disabled={true}
          style={styles.input}
          placeholder="Número da Residência"
          value={numeroCasa}
          /> 
          <Text style={styles.label}>Notificações do Aplicativo</Text>
          <TextInput
          disabled={true}
          style={styles.input}
          placeholder="Notificações do Aplicativo"
          value={optNotification}
          /> 
             <ToggleSwitchExample />


          {/* <TouchableOpacity 
            style={styles.buttonNewTask}
            onPress={()=>{
              editTaskDescription(descriptionEdit, idTask),
              editTaskValor(valorEdit, idTask)
            }}
          >
            <Text style={styles.iconButton}>Salvar</Text>
          </TouchableOpacity> */}
        </View>
      )
    } 