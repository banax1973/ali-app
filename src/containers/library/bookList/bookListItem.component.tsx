import { imageNoPhoto } from '@src/config';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableOpacityProps, ImageBackground } from 'react-native';
import { VerticalDotsIcon } from '@src/assets/icons';
import { Book } from '@src/core/model';
import { textStyle } from '@src/components/common';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

interface ComponentProps extends TouchableOpacityProps {
  book:  Book;
}

export class BookListItem extends React.Component<ComponentProps> {

  _menu = null;
 
  private setMenuRef = ref => this._menu = ref;
  private hideMenu = () => this._menu.hide();
  private showMenu = () => this._menu.show();

  private onDummyPress  = () => {
    //do nothing
    this.hideMenu()
  }

  private showQualification  = () => {
    const { book } = this.props;
    return (
      <View style={styles.qualificationContainer}>
        <Text  style={styles.itemQualification}> { `Calificación general:` } </Text>  
        <Text  style={styles.itemTitle}> { book.qualification.toFixed(1) } </Text> 
      </View>
    )
  }
  private showStatus  = () => {
    const { book } = this.props;
    return (
        <Text  style={styles.itemStatus}> { book.status } </Text> 
    )
  }

  public render(): React.ReactNode {
    const { style, book, ...restProps } = this.props;
  
    return (

      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          {...restProps}
          style={[styles.itemContainer, style]}
          onPress={this.showMenu}
          >
          <View style={styles.itemImage}>
            <ImageBackground
              style={styles.itemImage}
              source={(book.photo!=='' && book.photo!=null) ? { uri: book.photo } : { uri: imageNoPhoto }}
            >
            </ImageBackground> 
          </View>
          <View style={styles.itemTextContainer}>
         
            <View style={styles.itemLabels}> 
              <View style={styles.itemFirstRowContainer}> 
                <View style={styles.itemCategoryContainer}>       
                  <Text  style={styles.itemCategory}> {  book.category.toUpperCase() } </Text> 
                </View>

                <View style={styles.itemIconContainer}>             
                  <VerticalDotsIcon width={styles.itemIcon.width} height={styles.itemIcon.height} tintColor= { styles.itemIcon.color }/>
                   <Menu ref={this.setMenuRef}>
                   
                    <MenuItem onPress={this.onDummyPress}>Eliminar</MenuItem>
                    <MenuItem onPress={this.onDummyPress}>Añadir a lista</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.onDummyPress}>Cancelar</MenuItem>
                  </Menu> 
                </View>  
              </View>
              <View style={styles.itemSecondRowContainer}>       
                  <Text  style={styles.itemTitle}> {  book.title } </Text> 
                  <Text  style={styles.itemAuthor}> {  book.author } </Text> 
              </View>
              <View style={styles.itemThirdRowContainer}>  
                {this.showQualification()}
                {this.showStatus()}
              </View>  
            </View>
         </View>    
        </TouchableOpacity> 
      </View>      
    );
  }
}

const styles = StyleSheet.create({

   itemContainer: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 120,
        borderRadius: 10,
        overflow: 'hidden',
    },
    itemImage: {
        flex: 4,
    },
    itemTextContainer: {
        flex: 8,
    },
    itemLabels: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 7,
        paddingVertical: 7,
    },
    itemCategory:{
      ...textStyle.subtitle,
      color: '#999999FF',
      fontSize: 10,
    },

    itemTitle:{
       ...textStyle.title,
      color: '#1F546FFF',
      fontSize: 13,
      fontWeight: 'bold'
    },
    itemAuthor:{
      ...textStyle.subtitle,
      color: '#999999FF',
      fontSize: 10,
    },
    itemQualification:{
      ...textStyle.subtitle,
      color: '#D1D1D1FF',
      fontSize: 10,
    },
    itemStatus:{
      ...textStyle.subtitle,
      color:'#1F546FFF',
      fontSize: 10,
    },

    //Action from user --------------------------
    itemFirstRowContainer:{
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
   
    },
    itemSecondRowContainer:{
      flex: 2
    },
    itemThirdRowContainer:{
      flex: 2
    },

    itemCategoryContainer:{
      flex: 10,
      alignSelf: 'flex-start',

    },
    qualificationContainer:{
      flex:1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    itemIconContainer:{
      flex: 1,
      alignSelf: 'flex-start',
    },
    itemIcon:{
        width: 20,
        height: 20,
        color: '#565656FF',

    }
})
