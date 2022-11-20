import React, { useState, useEffect }from "react"
import {View, Text, Modal, TextInput, TouchableOpacity,KeyboardAvoidingView, Platform}  from "react-native";
import firebase from "../../config/firebase"
import styles from "./style"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function Esqueci({ navigation }){

    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const register = () => {
    
    firebase.auth().sendPasswordResetEmail(email)
    .then((userCredential) => {
    //let user = userCredential.user;
    setModalVisible(true)
    
  })
  .catch((error) => {
    //setErrorEmail(true)
    setModalVisible(true)
    let errorCode = error.code;
    let errorMessage = error.message;
  });   
    }

    return(
<KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding": "height"}
            style={styles.container}
        >
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
        }}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Se o e-mail informado estiver correto e for cadastrado na nossa base enviaremos um e-mail de redefinição de senha. Verifique sua caixa de entrada.</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              
              onPress={() => {setModalVisible(!modalVisible);navigation.navigate("Login")}}
            >
              <Text style={styles.textStyle}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

            <Text style={styles.title}>ESQUECI MINHA SENHA CONDOMINUS</Text>
            <TextInput
            style={styles.input}
            placeholder="Insira o email cadastrado para o envio de uma nova senha"
            type="text"
            onChangeText={(text) => setEmail(text)}
            value={email}
            />
            {errorEmail === true
            ?
            <View style={styles.contentAlert}>
                <MaterialCommunityIcons
                name="alert-circle"
                size={23}
                color="#fc0505"
                />
                <Text style={styles.warningAlert}>Email inválido</Text>
            </View>
            :
            <View/>
            }

            { email === ""
            ?
            <TouchableOpacity
            disabled={true}
            style={styles.ButtonRegister}
            >
            <Text style={styles.textButtonRegister}>Solicitar Nova Senha</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
            style={styles.ButtonRegister}
            onPress={register}
            >
            <Text style={styles.textButtonRegister}>Solicitar Nova Senha</Text>
            </TouchableOpacity>
            }


                <Text 
                style={styles.linkLogin}
                onPress={()=> navigation.navigate("Login")}
                >
                    Voltar
            </Text>

        </KeyboardAvoidingView>
    );

}