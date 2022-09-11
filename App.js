import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Task from "./src/pages/Task/";
import NewTask from "./src/pages/NewTask/";
import Details from "./src/pages/Details/";
import Login from "./src/pages/Login/";
import NewUser from "./src/pages/NewUser/";
import Warnings from "./src/warnings";
import NewWarning from "./src/pages/newWarning/";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
          name="Warnings"
          component={Warnings}
          options={{
            headerTintColor: "#1046c4",
          }}
        />
          <Stack.Screen
          name="Adicionar Warning"
          component={NewWarning}
          options={{
            headerTintColor: "#1046c4",
          }}
        />    
      <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />       
        <Stack.Screen
          name="NewUser"
          component={NewUser}
          options={{
            headerShown: false,
          }}
        />  
        <Stack.Screen
          name="Custos"
          component={Task}
          options={{
            headerTintColor: "#1046c4",
            headerLeft: null
          }}
        />
        <Stack.Screen
          name="Adicionar Custo"
          component={NewTask}
          options={{
            headerTintColor: "#1046c4",
          }}
          
        />
        <Stack.Screen
          name="Detalhes"
          component={Details}
          options={{
            headerTintColor: "#1046c4",
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}