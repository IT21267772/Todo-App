import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";

const Todos = ({}) => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    const todoQuery = query(
      collection(FIRESTORE_DB, "todos"),
      orderBy("timeStamps", "asc")
    );

    const subscriber = onSnapshot(todoQuery, {
      next: (snapshot) => {
        console.log("updated");
        const todos: any[] = [];
        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
          todos.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTodos(todos);
      },
    });

    return () => subscriber();
  }, []);

  const addTodo = async () => {
    const doc = await addDoc(collection(FIRESTORE_DB, "todos"), {
      title: todo,
      done: false,
      timeStamps: Date(),
      user:
        FIREBASE_AUTH.currentUser !== null
          ? FIREBASE_AUTH.currentUser.uid
          : null,
    });
  };

  const renderTodo = ({ item }: any) => {
    const ref = doc(FIRESTORE_DB, `todos/${item.id}`);
    const toggleDone = async () => {
      updateDoc(ref, { done: !item.done });
    };

    const deleteItem = async () => {
      deleteDoc(ref);
    };
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={toggleDone}>
          {item.done && (
            <Ionicons name="md-checkmark-circle" size={24} color="green" />
          )}
          {!item.done && <Entypo name="circle" size={24} color="black" />}
        </TouchableOpacity>
        <Text style={styles.itemText}>{item.title}</Text>
        <Ionicons
          name="trash-bin-outline"
          size={24}
          color="red"
          onPress={deleteItem}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Todo"
          value={todo}
          onChangeText={(text) => setTodo(text)}
        />
        <Button
          title="Add Todo"
          onPress={() => addTodo()}
          disabled={todo === ""}
        />
      </View>
      <View>
        {/* {todos.map((todo) => (
          <View key={todo.id}>
            <Text>{todo.title}</Text>
            <Text>{todo.user}</Text>
          </View>
        ))} */}
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={(item) => renderTodo(item)}
        />
      </View>
    </View>
  );
};

export default Todos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    display: "flex",
    justifyContent: "center",
    flex: 0.4,
  },
  input: {
    backgroundColor: "white",
    height: 70,
  },
  itemContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    margin: 5,
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
  },
});
