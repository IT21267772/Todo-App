import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const Home = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={{ height: 40, marginTop: 10 }}>
        <Button
          title="Open Todos"
          onPress={() => navigation.navigate("todos")}
        />
      </View>
      <View style={{ height: 40, marginTop: 10 }}>
        <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
