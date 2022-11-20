import React, { useState, useEffect } from "react";
import {  View,  Text,  TouchableOpacity,  FlatList,} from "react-native";
import firebase from "../config/firebase.js";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./style";
import emailjs from 'emailjs-com';
let auxUser;
let condAtual;

function disparo(remetente,destinatario,destinatarioemail,mensagem) {
console.log("teste")
  // const[remetente,setRemetente] = useState('');
  // const[destinatario,setDestinatario] = useState('');
  // const[destinatarioemail,setDestinatarioemail]=useState('');
  // const[mensagem,setMensagem]=useState('');

  // const handleRemetenteChange = (e) => {
  //   setRemetente(e.target.value);
  // }

  //será executada pelo form
  const SendEmail = (e) => {
    e.preventDefault();

    // var templateParams = {
    //   remetente: remetente,
    //   destinatario: destinatario,
    //   destinatarioemail: destinatarioemail,
    //   mensagem: mensagem
    // };

        var templateParams = {
      remetente: user,
      destinatario: "gbaldinotti@hotmail.com",
      destinatarioemail: "gbaldinotti@hotmail.com",
      mensagem: "teste mensagem"
    };

    emailjs.send('service_6ap2rfc','template_6xh483m',templateParams, 'hIA2EHNk3NdSX8gwt')
    .then(function(response){
      console.log('Success!!!!', response.status, response.text);
    }, function(error){
      console.log('Failed...', error);
    });
    console.log(templateParams);
  }}



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
            }
    
            database.collection("cond").onSnapshot((query) => {
              const list1 = [];
              query.forEach((doc) => {
                if (condAtual === doc.data().cod)
                  list1.push({ ...doc.data(), id: doc.id });
              });
              setTask(list1);
            });
    
          })
        });

      database.collection("Avisos").onSnapshot((query) => {
        const list = [];
        query.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setWarning(list);
      });
    }, []);

    return (
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={warning}
            renderItem={( { item } )=>{
               return(
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
                onPress={() => {SendEmail
                  //disparo(user,"gbaldinotti@hotmail.com","gbaldinotti@hotmail.com",item.description)
                }}
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