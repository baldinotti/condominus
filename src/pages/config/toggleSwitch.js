import React, {useState, useEffect} from 'react';
import { Text, View , StyleSheet, Alert} from 'react-native';
import { Switch} from 'react-native-paper' ;
import firebase from "../../config/firebase.js";



const ToggleSwitchExample = () =>{
    const [switchOn, setSwitchOn] = useState()
    const user = firebase.auth().currentUser.email
    const database = firebase.firestore();

    database.collection("cond").onSnapshot((query) => {
        query.forEach((doc) => {
            if (doc.data().optNotification) {
                console.log("dentro if",doc.data().optNotification)
                setSwitchOn(doc.data().optNotification)
                
            }
        })
    })
    return(
        <View style ={styles.container}>
            <Text>Toggle Switch</Text>
            <Switch value={switchOn} onValueChange={() => {
                setSwitchOn(!switchOn)
                console.log(!switchOn)
                database.collection('cond').doc(user).update({
                    optNotification: !switchOn
                  })} }/>
        </View>
    )
}
  
export default ToggleSwitchExample ;
  
const styles = StyleSheet.create({
     container:{
         padding:45,
         flexDirection:'row',
         justifyContent:'space-around'
     }
})