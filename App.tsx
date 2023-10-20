import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Todos from "./src/screens/Todos";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator
      screenOptions={{ headerShown: false, statusBarColor: "green" }}
      initialRouteName="home"
    >
      <InsideStack.Screen name="home" component={Home} />
      <InsideStack.Screen name="todos" component={Todos} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{ headerShown: false, statusBarColor: "green" }}
      >
        {user ? (
          <Stack.Screen name="inside" component={InsideLayout} />
        ) : (
          <Stack.Screen name="login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
