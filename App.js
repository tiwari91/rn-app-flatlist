import React from "react";
import { View, FlatList, SafeAreaView, StatusBar } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { getPeople } from "./api";

export default class App extends React.Component {
  state = {
    people: [],
  };

  componentDidMount() {
    getPeople()
      .then(response => {
        this.setState({ people: response.results });
        // console.log(Object.keys(response.results).length);
      })
      .catch(error => alert(error));
  }

  renderItem = ({ item }) => {
    return (
      <ListItem title={item.name} subtitle={`Birth Year: ${item.birth_year}`} />
    );
  };
  
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <List containerStyle={{ flex: 1 }}>
          <FlatList
            data={this.state.people}
            renderItem={this.renderItem}
            keyExtractor={item => item.created}
          />
        </List>
      </SafeAreaView>
    );
  }
}
