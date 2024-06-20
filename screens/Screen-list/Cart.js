import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { PageTitle } from '../../components/Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../components/Styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setupDatabase } from '../../database/database';
import { getAllUserList,RemoveUserListItem } from '../../database/services/ListService';
import {  getCategory } from '../../database/services/CategoryService';


const Cart = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [userList, setUserList] = useState([]);
  const [db, setDb] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const database = await setupDatabase();
        setDb(database);
        console.log('Database setup complete');

        const loginDetailsString = await AsyncStorage.getItem('userData');

        if (loginDetailsString) {
          const loginDetails = JSON.parse(loginDetailsString);
          setUserData(loginDetails);
          console.log(loginDetails.name);
          await handleCategory(database);
        } else {
          console.log("No login details found");
        }
      } catch (error) {
        console.error('Database setup failed:', error);
        setErrorMessage('Database setup failed. Please try again.');
      }
    };
    initializeDatabase();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (userData && userData.id) {
        handleUserListing(userData.id);
      }
    }, [userData])
  );

  const handleCategory = async () => {
    try {
      const CategoryList = await getCategory();
      console.log(CategoryList);

      setCategories(CategoryList);

      console.log('Category data fetched successfully');
    } catch (error) {
      console.error('Signup failed:', error);
      setErrorMessage('Signup failed. Please try again.');
    }
  };

  const handleUserListing = async (userId) => {
    console.log(userId);
    try {
      const listVal = await getAllUserList(userId);
      setUserList(listVal);
    } catch (error) {
        console.error('Signup failed:', error);
        setErrorMessage('Signup failed. Please try again.');
    }
  };

  const renderCategoryItems = (categoryId) => {
    const items = userList.filter(item => item.categoryId === categoryId);
    return items.map(item => (
      <View style={styles.box} key={item.id}>
        <Text style={styles.text}>{item.itemName}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => handleItemClose(item.id)}>
          <Icon name="close" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    ));
  };

  const renderCategories = () => {
    return categories
      .filter(category => userList.some(item => item.categoryId === category.id))
      .map(category => (
        <View style={{ flex: 1 }} key={category.id}>
          <Text style={{ paddingHorizontal: 20, fontSize: 18, fontWeight: '700', color: Colors.black, letterSpacing: 1, marginBottom: 10 }}>
            {category.name}
          </Text>
          <View style={styles.container}>
            {renderCategoryItems(category.id)}
          </View>
        </View>
      ));
  };

  const handleItemClose = async (itemId) => {
    try {
      await RemoveUserListItem(itemId, 1); // Update status to 1 (closed)
      await handleUserListing(userData.id); // Refresh user list after update
    } catch (error) {
      console.error('Error updating item status:', error);
      setErrorMessage('Failed to update item status. Please try again.');
    }
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white,
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: Colors.background,
          position: 'relative',
        }}>
          
    <ScrollView>
        <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
        <PageTitle welcome={true}>Your List</PageTitle>
        
        {renderCategories()}
        </ScrollView>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  box: {
    width: 120,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    margin: 10,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Cart;