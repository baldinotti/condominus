import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:"#ffffff",
    paddingTop: 20,
    alignItems: "center",
    justifyContent:"center"
 },
 buttonNewTask:{
    width:"50%",
    height:100,
    backgroundColor:"#1046c4",
    borderRadius:30,
    textAlign:"center",
    textAlignVertical:"center",
    marginTop:20,
    justifyContent: "center",
    alignItems: "center"
 },
 buttonWarnings:{
    width:"50%",
    height:100,
    backgroundColor:"#1046c4",
    borderRadius:30,
    textAlign:"center",
    textAlignVertical:"center",
    marginTop:20,
    justifyContent: "center",
    alignItems: "center"
 },
 buttonLogout:{
    width:"50%",
    height:100,
    backgroundColor:"#1046c4",
    borderRadius:30,
    textAlign:"center",
    textAlignVertical:"center",
    marginTop:20,
    justifyContent: "center",
    alignItems: "center"
 },
 iconButton:{
  color:"#ffffff",
  fontSize:25,
  fontWeight:"bold"
 },
 modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  //alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
button: {
  borderRadius: 20,
  padding: 10,
  elevation: 2
},
buttonOpen: {
  backgroundColor: "#F194FF",
},
buttonClose: {
  backgroundColor: "#1046c4",
},
buttonDelete: {
  backgroundColor: "#f21505",
},
buttonHomolog: {
  backgroundColor: "#2cfc03",
},  
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},
textStyleExcluir: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},
modalText: {
  marginBottom: 15,
  textAlign: "center"
},
title: {
    color: "#1046c4",
    fontSize:48,
    maginBottom: 10,
    fontWeight:"bold"
    },
});

export default styles