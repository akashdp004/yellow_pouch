import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../components/Styles';
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setupDatabase } from '../../database/database';
import { getCategory, getCatItem } from '../../database/services/CategoryService';
import { saveUserList, isItemInUserList } from '../../database/services/ListService';
const { width: screenWidth } = Dimensions.get('window');
const Home = ({ navigation }) => {
  const [currentSelected, setCurrentSelected] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoriesItem, setCategoriesItem] = useState([]);
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
          setUserData(loginDetails)
          console.log(loginDetails.name);
        } else {
          console.log("No login details found");
        }
        await handleCategory(database);
      } catch (error) {
        console.error('Database setup failed:', error);
        setErrorMessage('Database setup failed. Please try again.');
      }
    };
    initializeDatabase();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        const loginDetailsString = await AsyncStorage.getItem('userData');
        if (loginDetailsString) {
          const loginDetails = JSON.parse(loginDetailsString);
          setUserData(loginDetails);
          console.log(loginDetails.name);
        } else {
          console.log("No login details found");
        }
      };
      fetchUserData();
    }, [])
  );

  const handleCategory = async () => {
    try {
      const CategoryList = await getCategory();
      setCategories(CategoryList);
      console.log('Category data fetched successfully');
    } catch (error) {
      console.error('Signup failed:', error);
      setErrorMessage('Signup failed. Please try again.');
    }
  };

  const handleCategoryItem = async (CategoryId) => {

    try {
      if (!db) {
        console.error('Database is not initialized');
        setErrorMessage('Database is not initialized')
        return;
      }

      const Item = await getCatItem(CategoryId);
      console.log(Item);
      setCategoriesItem(Item);
      console.log('Category item data fetched successfully');
    } catch (error) {
      console.error('Signup failed:', error);
      setErrorMessage('Signup failed. Please try again.');
    }
  };

  useEffect(() => {
    // When categories state updates, select the first category and fetch its items
    if (categories.length > 0) {
      const firstCategory = categories[0]; // Select the first category
      setCurrentSelected(firstCategory.id); // Set it as currentSelected
      handleCategoryItem(firstCategory.id); // Fetch items for the selected category
    }
  }, [categories]);


  const renderCategories = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setCurrentSelected(item.id);
          handleCategoryItem(item.id);  // Fetch items for the selected category
        }}>
        <View
          style={{
            width: 120,
            height: 60,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: currentSelected === item.id ? Colors.brand : Colors.white,
            borderRadius: 20,
            margin: 10,
            elevation: 5,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: currentSelected == item.id ? Colors.white : Colors.black,
              fontWeight: '600',
            }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleItemListing = async (item) => {
    const listValue = {
      userId: userData.id,
      categoryId: item.item.categoryId,
      itemId: item.item.id,
      itemName: item.item.name,
      status: 0
    };
    try {
      // Check if the item is already in the user's list
      const isAlreadyInList = await isItemInUserList(userData.id, item.item.id);

      if (isAlreadyInList) {
        Toast.show({
          type: 'info',
          text1: 'Item is already in your list',
          visibilityTime: 2500,
          position: 'top',
        });
      } else {
        const checkUser = await saveUserList(listValue);
        console.log(checkUser);
        if (checkUser) {
          Toast.show({
            type: 'success',
            text1: 'Added to your list',
            visibilityTime: 2500,
            position: 'top',
          });
        }
      }
    } catch (error) {
      console.error('Signup failed:', error)
      setErrorMessage('Signup failed. Please try again.');
    }
  };
  // navigation.push('Category', {
  //   name: data.name,
  //   price: data.price,
  //   image: data.image,
  //   size: data.size,
  //   crust: data.crust,
  //   delivery: data.delivery,
  //   ingredients: data.ingredients,
  //   isTopOfTheWeek: data.isTopOfTheWeek,
  //   navigation: navigation,
  // })
  const renderItems = (data, index) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.9}
        style={{
          width: (screenWidth / 2) - 20,
          height: 260, // Adjusted height to accommodate image, name, and add icon
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20, // Adjust spacing between rows
          margin: 5,
          paddingHorizontal: 10, // Add padding to match contentContainerStyle
        }}
        onPress={() => handleItemListing(data)}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: Colors.white,
            borderRadius: 20,
            elevation: 4,
            padding: 15,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Image Section */}
          <View style={{ width: '100%', height: '50%', marginBottom: 10 }}>
            <Image
             source={{ uri: data.item.image }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                borderRadius: 20,
              }}
            />
          </View>

          {/* Name and Description Section */}
          <View style={{ width: '100%' }}>
            <Text
              style={{
                fontSize: 18,
                color: Colors.black,
                fontWeight: 'bold',
                marginBottom: 5,
              }}
            >
              {data.item.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: Colors.black,
                opacity: 0.5,
                marginBottom: 10,
              }}
            >
              {data.item.description}
            </Text>
          </View>

          {/* Add Icon Section */}
          <TouchableOpacity
            style={{
              width: 90,
              height: 40,
              backgroundColor: Colors.brand,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center'
            }}
            onPress={() => console.log('Add to cart button pressed for:', data.item.name)}
          >
            <Entypo
              name="plus"
              style={{ fontSize: 18, color: Colors.white }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const Logout = async () => {
    await AsyncStorage.removeItem('userData');
    return navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
      <Image
        source={require('../../assets/background.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../../assets/profile.jpg')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={Logout}>
          <Material name="logout" style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome {userData.name}!</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.searchContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategories}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center',margin:5 }}>
          <View style={{ flex: 1, height: 2, backgroundColor: 'black' }} />
          <View>
            <Text style={{ width: 50, textAlign: 'center' }}>List</Text>
          </View>
          <View style={{ flex: 1, height: 2, backgroundColor: Colors.brand }} />
        </View>
        {/* <View style={styles.line} /> */}
        {/* <Text style={[styles.categoryTitle, { margin: 5 }]}>List</Text> */}
        <FlatList
          data={categoriesItem}
          renderItem={renderItems}
          keyExtractor={data => data.id.toString()}
          numColumns={2} // Renders two columns
          contentContainerStyle={{ paddingHorizontal: 10 }} // Adjust overall padding
          showsVerticalScrollIndicator={false} // Optional: hides scroll indicator
        />

      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: -100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 500,
    borderColor: Colors.black,
  },
  logoutIcon: {
    fontSize: 28,
    color: Colors.black,
  },
  welcomeContainer: {
    padding: 10,
  },
  welcomeText: {
    fontSize: 25,
    color: Colors.brand,
    fontWeight: '600',
    letterSpacing: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    paddingHorizontal: 45,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
  },

  sectionTitle: {
    paddingHorizontal: 15,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
  },

  categoriesList: {
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  itemsList: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 50,
    paddingBottom: 20,
  },
  moreButton: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.brand,
    elevation: 5,
  },
  moreText: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: '600',
  },
  line: {
    height: 2,
    backgroundColor: Colors.brand, // Adjust line color
    marginVertical: 20, // Adjust margin vertical as needed
  },
});

export default Home;