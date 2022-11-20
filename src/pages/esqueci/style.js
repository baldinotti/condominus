import  { StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
    color: "#1046c4",
    fontSize:48,
    maginBottom: 10,
    fontWeight:"bold"
    },
    input:{
        width:300,
        marginTop:10,
        padding:10,
        height:50,
        borderBottomWidth: 1,
        borderBottomColor:"#1046c4",
        marginLeft:"auto",
        marginRight:"auto"
    },
    ButtonRegister:{
        width:200,
        height:50,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#1046c4",
        borderRadius:50,
        marginTop:30
    },
    textButtonRegister:{
        color:"#ffffff"
    },
    contenteAlert:{
        marginTop:20,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    warningAlert:{
        paddingLeft:10,
        color:"#fc0505",
        fontSize:16
    },
    registration:{
        marginTop:20
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
      modalText: {
            marginBottom: 15,
            textAlign: "center"
          },
    linkLogin:{
        color:"#1046c4",
        fontSize:16
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
    
    }
    );
    export default styles