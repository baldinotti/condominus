import React, { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import firebase from "../../config/firebase"
import styles from "./style"
import { MaterialCommunityIcons } from "@expo/vector-icons"

let auxCodCond;
let auxNomeCond;
let auxNovoCond;
let auxList;
let auxFinal;
const list = [];
let user;
let email;


export default function NewCond({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nomeCond, setNomeCond] = useState("");
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [torre, setTorre] = useState("");
    const [numeroCasa, setNumeroCasa] = useState("");
    const [errorRegister, setErrorRegister] = useState("");
    const database = firebase.firestore();

    function zeroEsquerda(value, totalWidth, paddingChar) {
        var length = totalWidth - value.toString().length + 1;
        return Array(length).join(paddingChar || '0') + value;
      };

      async function register(){
  
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                user = userCredential.user;
                //email = user.email;
                let unsubscribe = database.collection("Condominios").orderBy("cod",'asc').onSnapshot((query) => {
                    query.forEach((doc) => {
                        list.push({ ...doc.data(), cod : doc.cod });
                        auxList = (doc.data().cod)
                    })

                    unsubscribe()
                    console.log(auxList)
                    auxList = parseInt(auxList) + 1
                    auxNovoCond = zeroEsquerda(auxList,4)
                    console.log(auxList)
                    console.log(auxNovoCond)
                    escreveNovoCond()
            }
            
            )
        
        }
        )
            .catch((error) => {
                setErrorRegister(true)
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(error)
            });
        
        }



       function escreveNovoCond(){
        
        database.collection('Condominios').doc(auxNovoCond).set({
            cod: auxNovoCond,
            nomeCond : nomeCond
        })

        database.collection('cond').doc(email).set({
            cod: auxNovoCond,
            estadoUser: "Administrador",
            nome: nome,
            sobrenome: sobrenome,
            cpf: cpf,
            telefone : telefone,
            torre : torre,
            numeroCasa : numeroCasa,
            optNotification : "Ativado"
        })
}

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.title}>CRIAR CONTA GESTORA DE CONDOMÍNIO CONDOMINUS</Text>
            <Text style={styles.subtitle}>Para criar um novo condomínio, você deve criar uma nova conta (que não estará associada a nenhum condomínio. Esse usuário será criado como administrador</Text>
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
                placeholder="Informe o nome do seu Condomínio"
                type="text"
                onChangeText={(text) => setNomeCond(text)}
                value={nomeCond}
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
                <View />
            }

            {email === "" || password === "" || nomeCond === "" || nome === "" || sobrenome === "" || telefone === "" || torre === "" || cpf === "" || numeroCasa === ""
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
                    onPress={() => { register();}}
                >
                    <Text style={styles.textButtonRegister}>Cadastrar</Text>
                </TouchableOpacity>
            }

            <Text style={styles.registration}>
                Já é registrado?
                <Text
                    style={styles.linkLogin}
                    onPress={() => navigation.navigate("Login")}
                >
                    Voltar
                </Text>
            </Text>

        </KeyboardAvoidingView>
    );

}