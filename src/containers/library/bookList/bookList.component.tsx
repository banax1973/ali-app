import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { ActivityIndicator } from '@src/components/common';
import { Book2List } from './book2List.component';
import { UserStat } from './userStat.component';
import styles, { WIDTH } from './styles';

interface ComponentProps {
  isLoading:       boolean;
  user:            Object;
  books:           any[];
  loadMoreData:    boolean;
  showLoadingMore: boolean;
  onLoadMoreData: (index: number, status: string) => void;
}


export class BookList extends React.Component<ComponentProps, State> {

  public state: State = {
    index: 0,
    routes: [{ key: 0, title: 'Leídos' }, 
             { key: 1, title: 'Leyendo' },
             { key: 2, title: 'Por leer' },
             { key: 3, title: 'Abandonados' },
            ]
  };

 
  private onLoadMoreData = () => {
    this.props.onLoadMoreData(this.state.index, this.state.routes[this.state.index].title); //add the tab index to ask for data
  }

  _handleIndexChange = index => { this.setState({ index })};

  _renderScene = ({ route }) => {
    return <Book2List
            data              ={this.props.books[route.key]}
            qty               ={this.props.booksQty[route.key]}
            loadMoreData      ={this.props.loadMoreData}
            showLoadingMore   ={this.props.showLoadingMore}
            onLoadMoreData    ={this.onLoadMoreData} //callback
          />;
  };

  _renderTabBar = props => (
    <TabBar
      {...props}
      renderLabel={({ route, focused, color }) => (<Text style={styles.tabBarLabel}>{`${route.title.toUpperCase()} (${this.props.booksQty[route.key] })`}</Text>)}
      indicatorStyle={styles.tabBarIndicator}
      style={styles.tabBar}
      scrollEnabled={true}
      bounces={true}

    />
  );

  //mock statistics
  private getStatistics= (): any => {
    let stat= { stat_1: {number: 1, name: 'Libros'},
                stat_2: {number: 4, name: 'Reseñas'},
                stat_3: {number: 2, name: 'Seguidores'},
                stat_4: {number: 1, name: 'Seguidos'},
                stat_5: {number: 5, name: 'Listas'}
              }

    return stat;
  }
  public render(): React.ReactNode {
    const { isLoading, user } = this.props;
    const initialLayout = { width: Dimensions.get('window').width };

    if(isLoading){
      return( <ActivityIndicator/> )
    }
    else 
    {    
      return (
        <View style={styles.mainContainer}> 
            <View style={styles.userStat}>
              <UserStat 
                user       ={user}
                statistics ={this.getStatistics()}
              />
            </View>
            <View style={styles.tabs}>
              <TabView
                initialLayout={initialLayout}
                navigationState={this.state}
                //scrollEnabled= {true}
                renderScene={this._renderScene}
                renderTabBar={this._renderTabBar}
                onIndexChange={this._handleIndexChange}  
              />
            </View>  
        </View>
      );
    }
  }
}