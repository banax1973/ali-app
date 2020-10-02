import React from 'react';
import { URL_BASE, BUSINESS_ID, httpTimeout} from '@src/config';
import { NavigationScreenProps } from 'react-navigation';
import { StackActions, NavigationActions } from 'react-navigation'
import { AsyncStorage, Alert } from 'react-native';
import { BookList } from './bookList.component';

interface State {
  pageNo:           any;
  pageSize:         number,
  showLoadingMore:  boolean,
  books:            any,
  booksQty:         any,
  loadMoreData:     boolean,//whether bottom of list is reached
  isLoading:        boolean;
}

export class BookListContainer extends React.Component<NavigationScreenProps, State> {

  constructor(props){
    super(props);
  
    this.state = {
      user:           { id:'', name:'', avatar:null },

      pageNo:         [1,1,1,1], //init page numbers for all statuses
      pageSize:       10,
      books:          [],
      booksQty:       [],
      showLoadingMore:false,
      loadMoreData:   true, //whether bottom of list is reached
      isLoading:      true
    }
  }

  componentDidMount(){
   
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      AsyncStorage.multiGet(['@JWT_TOKEN','@USER_NAME','@AVATAR_IMG','@USER_ID']).then((data) => {
        //if jwt_token exists, thats means the user is logged in so... we show its name
        const token = data[0][1];
        if (token!==null){
          this.setState({ user:{ name: data[1][1], id: data[3][1], avatar: data[2][1]} })
        }
        this.fetchInitData(token);    
      });
    });
  }
 
  componentWillUnmount() {
    this._navListener.remove('didFocus')  
  }

  private fetchInitData(token: string) {
   
    const controller  = new AbortController();
    const { signal }  = controller;
    const timerHandle = setTimeout(() => controller.abort(), httpTimeout); 

    return fetch(URL_BASE + '/api/library/getLibraryInitData',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ 
        businessId:   BUSINESS_ID, 
        pageSize:     this.state.pageSize
      }),
      signal,
    })
    .then((response) =>  { //discriminates responses based on status codes received
        if (response.status==409) { Alert.alert('ERROR', 'Problema al recibir la lista de libros.');}
        if (response.status==403 || response.status==405 ) { //token error
          Alert.alert('Credenciales Vencidas', 'Por favor ingrese sus credenciales nuevamente.')
        
        }
        return response.json();
    })
    .then((responseJson) => {
      clearTimeout(this.timerHandle);  
      if (responseJson.success) {
          this.setState({
            books:            responseJson.bookArray,
            booksQty:         responseJson.qtyArray,
            loadMoreData:     true,
            showLoadingMore:  false,
            isLoading:        false
          })
      }
      else{
       
        this.props.navigation.navigate({ routeName: 'Auth' });
        //this.setState({ isLoading:false })
      }
    })
    .catch(error => {
        console.log(error)
        Alert.alert('ERROR', 'Problema al recibir la lista de libros.Chequee por favor su conexión de Internet');
        this.setState({ isLoading: false }); 
    });
  }


  private fetchMoreData(index:number, status: string) {
    //when we try to fetch more data show loader at the bottom
    this.setState({ showLoadingMore:true })
    

    const controller  = new AbortController();
    const { signal }  = controller;
    const timerHandle = setTimeout(() => controller.abort(), httpTimeout); 

    return fetch(URL_BASE + '/api/library/getLibraryMoreData',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        businessId:   BUSINESS_ID, 
        status:       status,
        pageNo:       this.state.pageNo[index],
        pageSize:     this.state.pageSize
      }),
      signal,
     })
    .then((response) =>  { //discriminates responses based on status codes received
        if (response.status==409) { Alert.alert('ERROR', 'Problema al recibir la lista de libros.');}
        return response.json();
    })
    .then((responseJson) => {
      clearTimeout(this.timerHandle);
      if (responseJson.success) {
          //add data to list and change the state to render new content
          let receivedDataList  = responseJson.list;
          let currentDataList   = this.state.books[index];
          let newDataList       = currentDataList.concat(receivedDataList);   //append to existing list
          
          //realize a re-arrange of the book array to avoid mutate the state
          const newBooksArray = [
                            ...this.state.books.slice(0, index),
                            newDataList, 
                            ...this.state.books.slice(index + 1)
                          ]
          //update the page number memory array                
          const newPageNoArray = [
                            ...this.state.pageNo.slice(0, index),
                            this.state.pageNo[index] + 1, 
                            ...this.state.pageNo.slice(index + 1)
                          ]

          this.setState({
            pageNo:           newPageNoArray,
            books:            newBooksArray,
            loadMoreData:     true,  //once new list is set we are ready to load more data if bottom is reached
            showLoadingMore:  false,
            isLoading:        false
          })
      }
      else {
        //no more data to be loaded
        this.setState({
            showLoadingMore:false,
            isLoading:      false
          })
      }
    })
    .catch(error => {
        console.log(error)
        Alert.alert('ERROR', 'Problema al recibir la lista de libros.');
        this.setState({ isLoading: false }); 
    });

  }

  //bottom reached start loading data
  private onLoadMoreData = (index: number, status: string) => {
    this.setState({ loadMoreData: false });
    this.fetchMoreData(index, status);
  }

  public render(): React.ReactNode {
    
    return (
      <BookList
        isLoading         ={this.state.isLoading}
        user              ={this.state.user}
        books             ={this.state.books}
        booksQty          ={this.state.booksQty}
        loadMoreData      ={this.state.loadMoreData}
        showLoadingMore   ={this.state.showLoadingMore}

        onLoadMoreData    ={this.onLoadMoreData} //callback
        onIndexChange     ={this.onIndexChange} //callback
      />
    );
  }
}
