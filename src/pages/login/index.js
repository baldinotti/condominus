import React, { useState, useEffect }from "react"
import {View, Text, TextInput, TouchableOpacity,KeyboardAvoidingView, Platform}  from "react-native";
import firebase from "../../config/firebase"
import styles from "./style"
import { MaterialCommunityIcons } from "@expo/vector-icons"
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Login({navigation}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const loginFirebase = ()=> {

    //const auth = getAuth();
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    let user = userCredential.user;
    navigation.navigate("Custos", {idUser: user.uid})
  })
  .catch((error) => {
    setErrorLogin(true)
    let errorCode = error.code;
    let errorMessage = error.message;
  });   

    }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
              // User is signed in
              const uid = user.uid;
              navigation.navigate("Custos", {idUser: user.uid})
            } else {
              // User is signed out
              // ...
            }
          });
    },[]   
    )

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

        </KeyboardAvoidingView>
    );

}

