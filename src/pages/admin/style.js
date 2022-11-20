import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#ffffff",
    //paddingTop: 20
 },
 
 input:{
  width:"90%",
  marginTop:10,
  padding:10,
  height:50,
  borderBottomWidth: 1,
  borderBottomColor:"#1046c4",
  marginLeft:"auto",
  marginRight:"auto"
 },
 Tasks:{
  width:"100%",
  flexDirection:"row",
  justifyContent:"space-between",
  marginTop:5
 },
 enviaWarning:{
  justifyContent:"center"
},
flat:{
 heigth:50,
 flexGrow: 0
},
 deleteTask:{
   justifyContent:"center",
   paddingLeft:15,
 },
 DescriptionTask:{
  width:"90%",
  alignContent:"flex-start",
  backgroundColor:"#f5f5f5cf",
  padding:12,
  paddingHorizontal: 20,
  borderRadius:15,
  marginBottom: 5,
  marginRight:15,
  color:"#282b2db5",
 },
 buttonNewTask:{
  width:60,
  height:60,
  position:"absolute",
  bottom: 30,
  right:180,
  backgroundColor:"#1046c4",
  borderRadius:50,
  justifyContent:"center",
  alignItems: "center"
 },
 title: {
  color: "#1046c4",
  fontSize:48,
  maginBottom: 10,
  fontWeight:"bold"
  },
 buttonWarnings:{
  width:60,
  height:60,
  position:"absolute",
  bottom: 30,
  right:100,
  backgroundColor:"#1046c4",
  borderRadius:50,
  justifyContent:"center",
  alignItems: "center",
  icon:"bell"
 },
 buttonLogout:{
  width:60,
  height:60,
  position:"absolute",
  bottom: 30,
  right:20,
  backgroundColor:"#1046c4",
  borderRadius:50,
  justifyContent:"center",
  alignItems: "center",
 },
 buttonAdm:{
  width:60,
  height:60,
  position:"absolute",
  bottom: 30,
  right:260,
  backgroundColor:"#1046c4",
  borderRadius:50,
  justifyContent:"center",
  alignItems: "center",
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
  marginTop: 15
},
buttonDelete: {
  backgroundColor: "#f21505",
  marginTop: 15
},
buttonHomolog: {
  backgroundColor: "#2cfc03",
  marginTop: 15
},  
buttonAdmin: {
    backgroundColor: "#2cfc03",
    marginTop: 15
  },  
  buttonMorador: {
    backgroundColor: "#2cfc03",
    marginTop: 15
  },  
  buttonReprovado: {
    backgroundColor: "#f21505",
    marginTop: 15
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
});

export default styles