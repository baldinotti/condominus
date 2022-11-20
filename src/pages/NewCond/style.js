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
    fontWeight:"bold",
    textAlign: "center"
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
    linkLogin:{
        color:"#1046c4",
        fontSize:16
    }
    }
    );
    export default styles