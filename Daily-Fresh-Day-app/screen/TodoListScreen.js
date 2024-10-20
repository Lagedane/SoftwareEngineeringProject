import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";

import Colors from "../styles/Colors";
import { AntDesign } from "@expo/vector-icons";
import {styles} from "../styles/stylesTodoScreen";
import tempData from "../components/tempData";
import TodoList from "../components/TodoList";
import AddListModel from "../components/AddListModal";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../components/Fire";

// ยัง Log out ไม่ได้
const Logout = ({ navigation }) => {
  signOut(FIREBASE_AUTH).then(() =>{
    navigation.navigate("Welcome");
  });
}
//

const TodoListScreen = ({ navigation }) => {
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
    user: {},
    loading: true,
  };

  /*componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert("Uh oh,something went wrong");
      }
      firebase.getList((lists) => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });

      this.setState({ user });
    });
  }

  componentWillUnmount(): void {
    firebase.detach();
  } */

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  addList = (list) => {
    this.setState({
      list: [
        ...this.state.lists,
        { ...list, id: this.state.lists.length + 1, todos: [] },
      ],
    });
    /* firebase.addList({
      name: list.name,
      color: list.color,
      todos: [],
    }); */
  };

  updateList = (list) => {
    this.setState({
      lists: this.state.lists.map((item) => {
        return item.id === list.id ? list : item;
      }),
    });
  };
  
  render() {
    /* if (this.state.loading) {
      return (
        <View>
        <ActivityIndicator size="large" color={Colors.black} />
        </View>
        );
        } */
       
       return (
         <View style={styles.container}>
        <View style={styles.logoutContainer}>
          <TouchableOpacity 
            onPress={Logout}
            >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddListModel
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
          />
        </Modal>
        {/*<View>
          <Text>User:{this.state.user.uid}</Text>
        </View>*/}

        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Todo
            <Text style={{ fontWeight: "300", color: Colors.blue }}>Lists</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodoModal()}
          >
            <AntDesign name="plus" size={20} color={Colors.blue} />
          </TouchableOpacity>

          <Text style={styles.add}> Add List</Text>
        </View>
        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={tempData}
            keyExtractor={(item) => item.id.toString}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}