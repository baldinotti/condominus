import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList, Alert, } from "react-native";
import firebase from "../../config/firebase.js";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./style";
import { TextInput } from "react-native-gesture-handler";

let auxHomolog;
let auxExlude;
let statusUserAtual;
let condAtual;

export default function Task({ navigation }) {
  const [task, setTask] = useState([]);
  const database = firebase.firestore();
  const [filtro, setFiltro] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleHomolog, setModalVisibleHomolog] = useState(false);




  const user = firebase.auth().currentUser.email


  function logout() {
    firebase.auth().signOut().then(() => {
      navigation.navigate("Login")
    }).catch((error) => {
    });

  }

  function deleteTask(id) {
    database.collection("Custos").doc(id).delete();
  }


  function homologTask(id) {
    console.log(id)


    database.collection("Custos").doc(id).update({
      estado: "Custo homologado"
    });
  }

  function filtrar(filtro) {
    setFiltro(filtro)

    

    database.collection("cond").onSnapshot((query) => {
      query.forEach((doc) => {
        if (doc.id === user) {
          condAtual = (doc.data().cod)
          console.log(condAtual)
        }

        database.collection("Custos").onSnapshot((query) => {
          const list = [];
          query.forEach((doc) => {
            if (doc.data().description.includes(filtro)) {
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
          statusUserAtual = (doc.data().estadoUser)
        }

        database.collection("Custos").onSnapshot((query) => {
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
            {statusUserAtual === "Em Aprovação" 
      ?
              <Text style={styles.titleAprova}>USUÁRIO AGUARDANDO APROVAÇÃO</Text>
      :   
      <><View>
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
                        <Text style={styles.modalText}>Tem certeza que deseja excluir esse custo?</Text>
                        <TouchableOpacity
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text style={styles.textStyle}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.button, styles.buttonDelete]}
                          onPress={() => { deleteTask(auxExlude); setModalVisible(!modalVisible); } }
                        >
                          <Text style={styles.textStyleExcluir}>Excluir</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>

                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleHomolog}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalVisibleHomolog(!modalVisibleHomolog);
                    } }
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.modalText}>Tem certeza que deseja homologar esse custo?</Text>
                        <TouchableOpacity
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => { setModalVisibleHomolog(!modalVisibleHomolog); } }
                        >
                          <Text style={styles.textStyle}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.button, styles.buttonHomolog]}
                          onPress={() => { homologTask(auxHomolog); setModalVisibleHomolog(!modalVisibleHomolog); } }
                        >

                          <Text style={styles.textStyleExcluir}>Homologar</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>

                  {user === item.responsavel
                    ?
                    <TouchableOpacity
                      style={styles.deleteTask}
                      onPress={() => { setModalVisible(true); { auxExlude = item.id; } } }
                    >
                      <FontAwesome
                        name="trash"
                        size={23}
                        color="#1046c4"
                      >
                      </FontAwesome>
                    </TouchableOpacity>
                    :

                    <TouchableOpacity
                      style={styles.deleteTask}
                      disabled={true}
                    >
                      <FontAwesome
                        name="lock"
                        size={23}
                        color="#f21505"
                      >
                      </FontAwesome>
                    </TouchableOpacity>}
                  {user === item.responsavel || item.estado === "Custo homologado"
                    ?
                    <TouchableOpacity
                      style={styles.enviaWarning}
                      disabled={true}

                    >
                      <FontAwesome
                        name="lock"
                        size={23}
                        color="#f21505"
                      >
                      </FontAwesome>
                    </TouchableOpacity>

                    :
                    <TouchableOpacity
                      style={styles.enviaWarning}

                      onPress={() => { setModalVisibleHomolog(true); { auxHomolog = item.id; } } }
                    >
                      <FontAwesome
                        name="check"
                        size={23}
                        color="#1046c4"
                      >
                      </FontAwesome>
                    </TouchableOpacity>}
                  <Text
                    style={styles.DescriptionTask}
                    onPress={() => navigation.navigate("Detalhes", {
                      id: item.id,
                      description: item.description,
                      valor: item.valor,
                      tipo: item.tipo,
                      responsavel: item.responsavel,
                      due: item.due,
                      estado: item.estado
                    })}
                  >
                    {"Descrição: "}
                    {item.description}
                    {'\n'}
                    {"Valor: R$"}
                    {item.valor}
                    {'\n'}
                    {"Responsável: "}
                    {item.responsavel}
                    {'\n'}
                    {"Data: "}
                    {item.due}
                    {'\n'}
                    {"Status do custo: "}
                    {item.estado}
                  </Text>
                </View>
              );

            } } /></View>
            <View></View>
            <View>
            <TouchableOpacity
              style={styles.buttonNewTask}
              onPress={() => navigation.navigate("Adicionar Custo")}
            >
            <Text style={styles.iconButton}>+</Text>
          </TouchableOpacity>
          
          {/* <TouchableOpacity
            style={styles.buttonWarnings}
            onPress={() => navigation.navigate("Warnings")}
          >
            <FontAwesome
              name="bell"
              size={23}
              color="#ffffff"
            >
            </FontAwesome>
          </TouchableOpacity> */}
          
          {/* <TouchableOpacity
            style={styles.buttonLogout}
            onPress={() => logout()}
          >
            <FontAwesome
              name="power-off"
              size={23}
              color="#ffffff"
            >
            </FontAwesome>
          </TouchableOpacity> */}
          {/* {statusUserAtual === "Administrador"
      ?
          <TouchableOpacity
            style={styles.buttonAdm}
            onPress={() => navigation.navigate("Admin")}
          >
            <FontAwesome
              name="wrench"
              size={23}
              color="#ffffff"
            >
            </FontAwesome>
          </TouchableOpacity>
      :
      <></>
} */}
</View>

          </>
}</View>

           )
}