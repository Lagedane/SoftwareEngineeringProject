import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Animated,
} from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Swipeable,GestureHandlerRootView } from "react-native-gesture-handler";
import Colors from "../styles/Colors";
import { styles } from "../styles/stylesTodoModal";

export default class TodoModal extends React.Component {
  state = {
    newTodo: "",
  };

  toggleTodoCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  };

  addTodo = () => {
    let list = this.props.list;

    if (!list.todos.some((todo) => todo.title === this.state.newTodo)) {
      list.todos.push({ title: this.state.newTodo, completed: false });

      this.props.updateList(list);
    }

    this.setState({ newTodo: "" });
    Keyboard.dismiss();
  };

  deleteTodo = (index) => {
    let list = this.props.list;
    list.todos.splice(index, 1);

    this.props.updateList(list);
  };

  renderTodo = (todo, index) => {
    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={(_, dragX) => this.rightActions(dragX, index)}
        >
          <View style={styles.todoContainer}>
            <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
              <Ionicons
                name={todo.completed ? "square" : "square-outline"}
                size={24}
                color={Colors.grey}
                style={{ width: 32 }}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.todo,
                {
                  textDecorationLine: todo.completed ? "line-through" : "none",
                  color: todo.completed ? Colors.grey : Colors.black,
                },
              ]}
            >
              {todo.title}
            </Text>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  rightActions = (dragX, index) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.9],
      extrapolate: "clamp",
    });

    const opacity = dragX.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.9, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={() => this.deleteTodo(index)}>
        <Animated.View style={[styles.deleteButton, { opacity: opacity }]}>
          <Animated.Text
          tyle={{
              color: Colors.white,
              fontWeight: "800",
              transform: [{ scale }]
            }}
          >
            Delete
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  render() {
    const list = this.props.list;

    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 40, right: 32, zIndex: 10 }}
            onPress={this.props.closeModal}
          >
            <AntDesign name="close" size={24} color={Colors.black} />
          </TouchableOpacity>

          <View
            style={[
              styles.section,
              styles.header,
              { borderBottomColor: list.color },
            ]}
          >
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                {completedCount} of {taskCount} tasks
              </Text>
            </View>
          </View>

          <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
            <FlatList
              data={list.todos}
              renderItem={({ item, index }) => this.renderTodo(item, index)}
              keyExtractor={(item) => item.title}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: list.color }]}
              onChangeText={(text) => this.setState({ newTodo: text })}
              value={this.state.newTodo}
            />
            <TouchableOpacity
              style={[styles.addTodo, { backgroundColor: list.color }]}
              onPress={() => this.addTodo()}
            >
              <AntDesign name="plus" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
