import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from '@src/components/common';
import { Book } from '@src/core/model';
import { BookListItem, BookListItemProps} from './bookListItem.component';
import { LinearGradient } from 'expo-linear-gradient';
import { Container, Content, Text, List } from 'native-base';

interface ComponentProps {
  onLoadMoreData:      () => void;
}

export class Book2List extends React.Component<ComponentProps> {

  shouldComponentUpdate(nextProps, nextState){
    return (nextProps.loadMoreData != this.props.loadMoreData); //only rerender when props are different
  }
 
 //bottom reached start loading data
  private onLoadMoreData () {
      this.props.onLoadMoreData();
  }

  public render(): React.ReactNode {
    const { isLoading, data, qty, loadMoreData, showLoadingMore } = this.props;

    //console.log('loadMoreData :',loadMoreData)
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
      const paddingToBottom = 300;
      let result = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
      //true if the end is reached other wise false
      return result;
    };

    //initially display loader at the center
    let listSection =
      <View style={ styles.container}> <ActivityIndicator /></View>

    if (data.length > 0) {
      var key = 0;
      listSection = data.map((record) => {
          key ++;
          return (
            <View key={key}>
              <BookListItem
                style   ={styles.item}
                book    ={record}
              /> 
            </View>
          );
        })
    } 
    else {
      listSection = null;
    }
    

    if ( data.length == 0) {
      return (
        <View style={styles.container}>
          <Text>Aún no has agregado libros aquí</Text>
        </View>
      )
    } 
    else {
      return (
        <Container style={styles.container}>
          <Content
            onScroll={({ nativeEvent }) => {
              if ((data.length < qty) && isCloseToBottom(nativeEvent)) {
                //prevent multiple hits for same page number
                if(loadMoreData){
                  this.onLoadMoreData()
                }
              }
            }}>
            <List>
              {listSection}
            </List>
            {showLoadingMore ? <ActivityIndicator/>: null}
           
          </Content>
        </Container>
      )
    }
  }
}

const styles = StyleSheet.create({

  container: {
      flex: 1,
      flexDirection: 'column',
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: '#EDEDEDFF',

  },
  item: {
      marginVertical: 5,
      backgroundColor: 'white',
  } 

});