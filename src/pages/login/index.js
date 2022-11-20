import React, { useState, useEffect }from "react"
import {View, Text, TextInput, TouchableOpacity,KeyboardAvoidingView, Platform}  from "react-native";
import firebase from "../../config/firebase"
import styles from "./style"
import { MaterialCommunityIcons } from "@expo/vector-icons"
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

let statusUserAtual;
let condAtual;

export default function Login({navigation}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");
    const database = firebase.firestore();
    const loginFirebase = ()=> {

    //const auth = getAuth();
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    let user = userCredential.user;

    database.collection("cond").onSnapshot((query) => {
        query.forEach((doc) => {
          if (doc.id === user.email) {
            condAtual = (doc.data().cod)
            
            statusUserAtual = (doc.data().estadoUser)
            console.log(statusUserAtual)
          }
          console.log(user)
          });
          navigation.navigate("Dashboard", {idUser: user.uid, statusUserAtual: statusUserAtual, condAtual: condAtual})
        })

    
  })
  .catch((error) => {
    setErrorLogin(true)
    let errorCode = error.code;
    let errorMessage = error.message;
  });   

    }

    function leftPad(value, totalWidth, paddingChar) {
        var length = totalWidth - value.toString().length + 1;
        return Array(length).join(paddingChar || '0') + value;
      };

 
    // useEffect(()=>{
    //     firebase.auth().onAuthStateChanged(function (user) {
    //         if (user) {
    //           // User is signed in
    //           const uid = user.uid;
    //           navigation.navigate("Dashboard", {idUser: user.uid})
    //         } else {
    //           // User is signed out
    //           // ...
    //         }
    //       });
    // },[]   
    // )

    return(
        //função para teclado não cobrir os text input, verifica se ios e se não for vai ser android, necessario para funcionamento
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding": "height"}
            style={styles.container}
        >
            <Text style={styles.title}>CONDOMINUS</Text>
            <TextInput
            style={styles.input}
            placeholder="Entre com seu Email"
            type="text"
            onChangeText={(text) => setEmail(text)}
            value={email}
            />
            <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Entre com sua senha"
            type="text"
            onChangeText={(text) => setPassword(text)}
            value={password}
            />
            {errorLogin === true
            ?
            <View style={styles.contentAlert}>
                <MaterialCommunityIcons
                name="alert-circle"
                size={23}
                color="#fc0505"
                />
                <Text style={styles.warningAlert}>Email ou senha inválidos</Text>
            </View>
            :
            <View/>
            }

            { email === "" || password === ""
            ?
            <TouchableOpacity
            disabled={true}
            style={styles.ButtonLogin}
            >
            <Text style={styles.textButtonLogin}>Entrar</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
            style={styles.ButtonLogin}
            onPress={loginFirebase}

            >
            <Text style={styles.textButtonLogin}>Entrar</Text>
            </TouchableOpacity>
            }

            <Text style={styles.registration}>
            Não tem registro? 
                <Text 
                style={styles.linkSubscribe}
                onPress={()=> navigation.navigate("NewUser")}
                >
                    Se registrar agora
                </Text>
            </Text>

            <Text style={styles.registration}>
            Não tem um condomínio registrado? 
                <Text 
                style={styles.linkSubscribe}
                onPress={()=> navigation.navigate("NewCond")}
                >
                    Registrar novo condomínio
                </Text>
            </Text>

            <Text style={styles.registration}>
            Esqueceu sua senha? 
                <Text 
                style={styles.linkSubscribe}
                onPress={()=> navigation.navigate("Esqueci")}
                >
                    Solicitar nova senha
                </Text>
            </Text>

        </KeyboardAvoidingView>
    );

}

