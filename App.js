import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: ''
    }
    console.disableYellowBox = true;
  }

  makeRequest = () => {
    axios.get('https://tutorialsha.com/api/users?1')
    .then(res => {
      this.setState({
        data: res.data.data
      })
    })
  }

  componentDidMount(){
    this.makeRequest();
  }

  render() {
    console.log(this.state.data)
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={(item) => item.first_name}
          renderItem={({item, index}) => {
            console.log(item);
            <View style={styles.itemView}>
              <View style={styles.imgContainer}>
                <Image source={{uri:item.avatar}} style={styles.imageStyle}></Image>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.name}>{item.first_name + ' ' + item.last_name}</Text>  
                <Text numberOfLines={1}>{item.email}</Text>  
              </View>
            </View>
          }}
        >
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  itemView: {

  },
  imgContainer: {

  },
  imageStyle: {

  },
  itemInfo: {

  }
});

export default App;
