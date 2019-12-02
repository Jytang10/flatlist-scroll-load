import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      data: '',
      page: 1
    }
    console.disableYellowBox = true;
  }

  makeRequest = () => {
    axios.get(`https://tutorialsha.com/api/users?{this.state.page}`)
    .then(res => {
      this.setState({
        isLoading: false,
        data: [...this.state.data, ...res.data.data]
      })
    })
  }

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.makeRequest()
    })
  }

  renderFooter = () => {
    return (
      <View>
        <ActivityIndicator animating size = 'large'></ActivityIndicator>
      </View>
    )
  }

  componentDidMount(){
    this.makeRequest();
  }

  render() {

    if(this.state.isLoading){
      <View style={{flex:1, padding:20, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator animating size="large"></ActivityIndicator>
      </View>
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={(item) => item.first_name}
          onEndReached={this.handleLoadMore}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={200}
          renderItem={({item, index}) => {
            return (
            <View style={[styles.itemView, index % 2 > 0 ? styles.itemOdd : styles.itemEven]}>
              <View style={styles.imgContainer}>
                <Image source={{uri:item.avatar}} style={styles.imageStyle}></Image>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.name}>{item.first_name + ' ' + item.last_name}</Text>  
                <Text numberOfLines={1}>{item.email}</Text>  
              </View>
            </View>
          )}}
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
    flex: 1,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderStyle: 'solid',
    borderColor: 'green',
    borderBottomWidth: 1.5, 
  },
  imgContainer: {
    flex: 0,
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  name: {
    fontSize: 30,
    color: 'green',
    textAlign: 'left',
  },
  itemOdd: {
    backgroundColor: '#bdc3c7',
  },
  itemEven: {
    backgroundColor: '#ecf0f1',
  },
});

export default App;
