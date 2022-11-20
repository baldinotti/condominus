import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList, Alert, } from "react-native";
import firebase from "../../config/firebase.js";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./style";
import { TextInput } from "react-native-gesture-handler";

let auxUser;
let condAtual;

export default function Admin({ navigation }) {
  const [task, setTask] = useState([]);
  const database = firebase.firestore();
  const [filtro, setFiltro] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleHomolog, setModalVisibleHomolog] = useState(false);




  const user = firebase.auth().currentUser.email

  function alteraAdmin(id) {
    database.collection("cond").doc(id).update({
      estadoUser: "Administrador"
    });
  }

  function alteraMorador(id) {
    database.collection("cond").doc(id).update({
        estadoUser: "Morador"
    });
  }

  function alteraReprovado(id) {
    database.collection("cond").doc(id).update({
        estadoUser: "Reprovado"
    });
  }

  function filtrar(filtro) {
    setFiltro(filtro)
    database.collection("cond").onSnapshot((query) => {
      query.forEach((doc) => {
        if (doc.id === user) {
          condAtual = (doc.data().cod)
        }

        database.collection("Custos").onSnapshot((query) => {
          const list = [];
          query.forEach((doc) => {
            if (doc.data().id.includes(filtro)) {
              if (condAtual === doc.data().cod) {
                list.push({ ...doc.data(), id: doc.id });
              }
            }
          })
          setTask([]);
          setTask(list);

        });

      })
    });
  };

  useEffect(() => {

    database.collection("cond").onSnapshot((query) => {
      query.forEach((doc) => {
        if (doc.id === user) {
          condAtual = (doc.data().cod)
        }

        database.collection("cond").onSnapshot((query) => {
          const list = [];
          query.forEach((doc) => {
            if (condAtual === doc.data().cod)
              list.push({ ...doc.data(), id: doc.id });
          });
          setTask(list);
        });

      })
    });
  }, []);

  return (
    
    <View style={styles.container}>  
        <View>
          <TextInput
            style={styles.input}
            placeholder="Filtrar por Descrição"
            onChangeText={filtrar}
            value={filtro}>
          </TextInput>
        </View>
        <View>
        <FlatList
            showsVerticalScrollIndicator={false}
            data={task}
            renderItem={({ item }) => {

              return (
                <View style={styles.Tasks}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalVisible(!modalVisible);
                    } }
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.modalText}>Qual perfil você deseja atribuir para esse usuário?</Text>
                        <TouchableOpacity
                          style={[styles.button, styles.buttonAdmin]}
                          onPress={() => { alteraAdmin(auxUser); setModalVisible(!modalVisible); } }
                        >
                          <Text style={styles.textStyleExcluir}>Síndico</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.button, styles.buttonMorador]}
                          onPress={() => { alteraMorador(auxUser); setModalVisible(!modalVisible); } }
                        >
                          <Text style={styles.textStyleExcluir}>Morador</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.button, styles.buttonReprovado]}
                          onPress={() => { alteraReprovado(auxUser); setModalVisible(!modalVisible); } }
                        >
                          <Text style={styles.textStyleExcluir}>Sem autorização</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text style={styles.textStyle}>Cancelar</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>

                    <TouchableOpacity
                      style={styles.deleteTask}
                      onPress={() => { setModalVisible(true); { auxUser = item.id; } } }
                    >
                      <FontAwesome
                        name="wrench"
                        size={23}
                        color="#1046c4"
                      >
                      </FontAwesome>
                    </TouchableOpacity>
                  <Text
                    style={styles.DescriptionTask}
                  >
                    {"Usuário: "}
                    {item.id}
                    {'\n'}
                    {"Perfil atual: "}
                    {item.estadoUser}
                  </Text>
                </View>
              );

            } } /></View>
</View>

           )
}