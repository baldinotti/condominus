import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Task from "./src/pages/Task/";
import NewTask from "./src/pages/NewTask/";
import Details from "./src/pages/details/";
import Login from "./src/pages/login/";
import NewUser from "./src/pages/NewUser/";
import Warnings from "./src/warnings";
import NewWarning from "./src/pages/newWarning/";
import Dashboard from "./src/pages/dashboard/";
import Esqueci from "./src/pages/esqueci/";
import NewCond from "./src/pages/NewCond/";
import Admin from "./src/pages/admin/";
import Config from "./src/pages/config/";

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
          name="NewCond"
          component={NewCond}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={{
            headerTintColor: "#1046c4"
          }}
        />
        <Stack.Screen
          name="Config"
          component={Config}
          options={{
            headerTintColor: "#1046c4"
          }}
        />
        <Stack.Screen
          name="Esqueci"
          component={Esqueci}
          options={{
            headerShown: false,
          }}
        />
          <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
          }}
        />   
        <Stack.Screen
          name="Custos"
          component={Task}
          options={{
            headerTintColor: "#1046c4"
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