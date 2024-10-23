import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
  Alert
} from "react-native";
import Colors from "../styles/Colors";
import { AntDesign } from "@expo/vector-icons";
import {styles} from "../styles/stylesTodoScreen";
import TodoList from "../components/TodoList";
import AddListModel from "../components/AddListModal";
import { Fire, FIREBASE_AUTH } from "../components/Fire";
import { signOut } from "firebase/auth";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

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
    lists: [],
    user: {},
    loading: true,
  };

  componentDidMount() {
     firebase = new Fire((error, user) => {
      if (error) {
        return alert("Uh oh,something went wrong");
      }
      firebase.getLists(lists => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });

      this.setState({ user });
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = list => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  Logout = async () => {
    signOut(FIREBASE_AUTH).then(() => {
      Alert.alert('User Signed out!');
    }
    );
  };

  addList = list => {
    /*this.setState({
      lists: [
        ...this.state.lists,
        { ...list, id: this.state.lists.length + 1, todos: [] }
      ]
    });*/
    firebase.addList({
      name: list.name,
      color: list.color,
      todos: [],
    });
  };

  updateList = list => {
    /*this.setState({
      lists: this.state.lists.map(item => {
        return item.id === list.id ? list : item;
      })
    });*/
    firebase.updateList(list);
  };
  
  render() {
       if (this.state.loading) {
        return (
          <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.blue} />
          </View>
        );
        } 
       
       return (
         <View style={styles.container}>
        <View style={styles.logoutContainer}>
          <TouchableOpacity onPress={ this.Logout }>
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
            data={this.state.lists}
            keyExtractor={item => item.id.toString()}
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