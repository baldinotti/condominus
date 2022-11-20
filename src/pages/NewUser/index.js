import React, { useState, useEffect }from "react"
import {View, Text, TextInput, TouchableOpacity,KeyboardAvoidingView, Platform}  from "react-native";
import firebase from "../../config/firebase"
import styles from "./style"
import { MaterialCommunityIcons } from "@expo/vector-icons"

let auxCodCond;

export default function NewUser({ navigation }){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [codCond, setCodCond] = useState("");
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [torre, setTorre] = useState("");
    const [numeroCasa, setNumeroCasa] = useState("");
    const [errorRegister, setErrorRegister] = useState("");
    const database = firebase.firestore();

    const register = () => {
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
    let user = userCredential.user;
    console.log(user.email)
    database.collection('cond').doc(user.email).set({
        cod : auxCodCond,
        estadoUser : "Em Aprovação",
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        telefone : telefone,
        torre : torre,
        numeroCasa : numeroCasa,
        optNotification : "Ativado"
      })
    navigation.navigate("Custos", {idUser: user.uid});
    
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
            <TextInput
            style={styles.input}
            placeholder="Informe o código do seu Condomínio"
            type="text"
            onChangeText={(text) => setCodCond(text)}
            value={codCond}
            />
            <TextInput
            style={styles.input}
            placeholder="Informe seu nome"
            type="text"
            onChangeText={(text) => setNome(text)}
            value={nome}
            />
            <TextInput
            style={styles.input}
            placeholder="Informe seu sobrenome"
            type="text"
            onChangeText={(text) => setSobrenome(text)}
            value={sobrenome}
            />
            <TextInput
            style={styles.input}
            placeholder="Informe seu CPF"
            type="text"
            onChangeText={(text) => setCpf(text)}
            value={cpf}
            />
            <TextInput
            style={styles.input}
            placeholder="Informe seu telefone"
            type="text"
            onChangeText={(text) => setTelefone(text)}
            value={telefone}
            />
            <TextInput
            style={styles.input}
            placeholder="Informe o bloco/torre/ala da sua residência"
            type="text"
            onChangeText={(text) => setTorre(text)}
            value={torre}
            />
            <TextInput
            style={styles.input}
            placeholder="Informe o número da sua residência"
            type="text"
            onChangeText={(text) => setNumeroCasa(text)}
            value={numeroCasa}
            />
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

            { email === "" || password === "" || codCond === "" || nome === "" || sobrenome === "" || telefone === "" || torre === "" || cpf === "" || numeroCasa === ""
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
            onPress={() =>{auxCodCond=codCond;register();console.log(auxCodCond)}}
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