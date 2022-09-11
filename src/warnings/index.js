import React, { useState, useEffect } from "react";
import {  View,  Text,  TouchableOpacity,  FlatList,} from "react-native";
import firebase from "../config/firebase.js";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./style";

export default function Warnings({ navigation }) {
    const [warning, setWarning] = useState([]);
    const database = firebase.firestore();

    function deleteWarning(id) {
      database.collection("Avisos").doc(id).delete();
    }
  
    useEffect(() => {
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
                //implementar função que dispara notificação
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