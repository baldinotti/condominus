import React, { useState, useEffect } from "react";
import {  View,  Text,  TouchableOpacity,  FlatList,} from "react-native";
import firebase from "../../config/firebase.js";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./style";

export default function Task({ navigation }) {
    const [task, setTask] = useState([]);
    const database = firebase.firestore();

    function logout(){
      firebase.auth().signOut().then(() => {
        navigation.navigate("Login")
      }).catch((error) => {
      }); 

    }

    function deleteTask(id) {
      database.collection("Custos").doc(id).delete();
    }
  
    useEffect(() => {
      database.collection("Custos").onSnapshot((query) => {
        const list = [];
        query.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setTask(list);
      });
    }, []);

    return (
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={task}
            renderItem={( { item } )=>{
               return(
              <View style={styles.Tasks}>
                <TouchableOpacity
                  style={styles.deleteTask}
                  onPress={() => {
                    deleteTask(item.id)
                  }}
                >
                <FontAwesome
                  name="trash"
                  size={23}
                  color="#1046c4"
                >
                </FontAwesome>
                </TouchableOpacity>
                <Text
                  style={styles.DescriptionTask}
                  onPress={()=>
                    navigation.navigate("Detalhes",{
                      id: item.id,
                      description: item.description,
                      valor: item.valor
                    })
                  }
                >
                {item.description}
                {"        "}
                {"R$"}
                {item.valor}  
                </Text>  
    
              </View>
              )
            }}
          />
          <TouchableOpacity
            style={styles.buttonNewTask}
            onPress={() => navigation.navigate("Adicionar Custo")}
          >
            <Text style={styles.iconButton}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWarnings}
            onPress={() => navigation.navigate("Warnings")}
          >
            <FontAwesome
                  name="bell"
                  size={23}
                  color="#ffffff"
                >
                </FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonLogout}
            onPress={() => logout()}
          >
            <FontAwesome
                  name="power-off"
                  size={23}
                  color="#ffffff"
                >
                </FontAwesome>
          </TouchableOpacity>
        </View>
      )
        }