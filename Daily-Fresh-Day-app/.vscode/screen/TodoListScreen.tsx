import React from "react";
import { TodoListScreenNavigationProp } from "../types/type";
import { FlatList, Text, TouchableOpacity, View, Modal } from "react-native";

import { stylesApp } from "../styles/styles";
import Colors from "../styles/Colors";
import { AntDesign } from "@expo/vector-icons";

import tempData from "../components/tempData";
import TodoList from "../components/TodoList";
import AddListModel from "../components/AddListModal";

type Props = {
  navigation: TodoListScreenNavigationProp;
};

const TodoListScreen: React.FC<Props> = ({navigation}): React.JSX.Element => {
  return (
    <View>
      <Text>TodoListScreen</Text>
    </View>
  );
};

export default class App extends React.Component {
    state = {
      addTodoVisible: false,
      lists: tempData,
    };
  
    toggleAddTodoModal() {
      this.setState({ addTodoVisible: !this.state.addTodoVisible });
    }
  
    renderList = (list:any) => {
      return <TodoList list={list} updateList={this.updateList} />;
    };
  
    addList = (list:any) => {
      this.setState({
        lists: [
          ...this.state.lists,
          { ...list, id: this.state.lists.length + 1, todos: [] },
        ],
      });
    };
  
    updateList = (list:any) => {
      this.setState({
        lists:this.state.lists.map(item => {
          return item.id === list.id ? list :item
        })
      })
    };
  
    render() {
      return (
        <View style={stylesApp.container}>
          <Modal
            animationType="slide"
            visible={this.state.addTodoVisible}
            onRequestClose={() => this.toggleAddTodoModal}
          >
            <AddListModel
              closeModal={() => this.toggleAddTodoModal()}
              addList={this.addList}
            />
          </Modal>
  
          <View style={{ flexDirection: "row" }}>
            <View style={stylesApp.divider} />
            <Text style={stylesApp.title}>
              Todo
              <Text style={{ fontWeight: "300", color: Colors.blue }}>Lists</Text>
            </Text>
            <View style={stylesApp.divider} />
          </View>
  
          <View style={{ marginVertical: 48 }}>
            <TouchableOpacity
              style={stylesApp.addList}
              onPress={() => this.toggleAddTodoModal()}
            >
              <AntDesign name="plus" size={30} color={Colors.blue} />
            </TouchableOpacity>
  
            <Text style={stylesApp.add}>add List</Text>
          </View>
          <View style={{ height: 275, paddingLeft: 32 }}>
            {/* <FlatList
              data={this.state.lists}
              keyExtractor={(item) => item.name}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => this.renderList(item)}
              keyboardShouldPersistTaps="always"
            /> */}
          </View>
        </View>
      );
    }
  }
  