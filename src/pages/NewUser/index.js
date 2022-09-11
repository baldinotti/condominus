import React, { useState, useEffect }from "react"
import {View, Text, TextInput, TouchableOpacity,KeyboardAvoidingView, Platform}  from "react-native";
import firebase from "../../config/firebase"
import styles from "./style"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function NewUser({ navigation }){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorRegister, setErrorRegister] = useState("");

    const register = () => {
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
    let user = userCredential.user;
    navigation.navigate("Custos", {idUser: user.uid})
    
  })
  .catch((error) => {
    setErrorRegister(true)
    let errorCode = error.code;
    let errorMessage = error.message;
  });   
    }

    return(
<KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding": "height"}
            style={styles.container}
        >
            <Text style={styles.title}>CRIAR CONTA CONDOMINUS</Text>
            <TextInput
            style={styles.input}
            placeholder="Insira o email para cadastro"
            type="text"
            onChangeText={(text) => setEmail(text)}
            value={email}
            />
            <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Insira sua senha"
            type="text"
            onChangeText={(text) => setPassword(text)}
            value={password}
            />
            {/* <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Confirme sua senha"
            type="text"
            onChangeText={(text) => setPassword(text)}
            value={password}
            /> */}
            {errorRegister === true
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
            style={styles.ButtonRegister}
            >
            <Text style={styles.textButtonRegister}>Cadastrar</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
            style={styles.ButtonRegister}
            onPress={register}
            >
            <Text style={styles.textButtonRegister}>Cadastrar</Text>
            </TouchableOpacity>
            }

<Text style={styles.registration}>
            Já é registrado?
                <Text 
                style={styles.linkLogin}
                onPress={()=> navigation.navigate("Login")}
                >
                    Voltar
                </Text>
            </Text>

        </KeyboardAvoidingView>
    );

}