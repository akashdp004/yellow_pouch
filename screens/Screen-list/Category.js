import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../components/Styles';

const Category = ({route, navigation}) => {
  const {
    name,
    price,
    image,
    size,
    crust,
    delivery,
    ingredients,
    isTopOfTheWeek,
  } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{ paddingRight: 10 }}
        >
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: Colors.background,
        position: 'relative',
      }}
    >
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.lightGray,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FontAwesome
            name="angle-left"
            style={{
              fontSize: 16,
              color: Colors.black,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            backgroundColor: Colors.brand,
            opacity: isTopOfTheWeek ? 1 : 0.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AntDesign name="star" style={{ fontSize: 15, color: Colors.white }} />
        </View>
      </View>
      <Text
        style={{
          fontSize: 38,
          color: Colors.black,
          fontWeight: '800',
          paddingHorizontal: 20,
          maxWidth: 310,
        }}
      >
        {name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: Colors.accentRed,
            fontWeight: '900',
            paddingRight: 5,
            paddingBottom: 8,
          }}
        >
          ₹
        </Text>
        <Text
          style={{
            fontSize: 38,
            color: Colors.accentRed,
            fontWeight: '900',
          }}
        >
          {price}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          maxHeight: 300,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ paddingVertical: 20 }}>
            <Text
              style={{
                fontSize: 12,
                color: Colors.black,
                opacity: 0.5,
              }}
            >
              Size
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: Colors.black,
                fontWeight: '600',
              }}
            >
              {size}
            </Text>
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Text
              style={{
                fontSize: 12,
                color: Colors.black,
                opacity: 0.5,
              }}
            >
              Crust
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: Colors.black,
                fontWeight: '600',
              }}
            >
              {crust}
            </Text>
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Text
              style={{
                fontSize: 12,
                color: Colors.black,
                opacity: 0.5,
              }}
            >
              Delivery
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: Colors.black,
                fontWeight: '600',
              }}
            >
              {delivery} min
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 380,
            height: 380,
          }}
        >
          <Image
            source={image}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
      <Text
        style={{
          paddingTop: 20,
          paddingHorizontal: 20,
          fontSize: 20,
          fontWeight: '700',
          color: Colors.black,
        }}
      >
        Ingredients
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {ingredients.map((data, index) => {
          return (
            <View
              key={index}
              style={{
                margin: 12,
                width: 80,
                height: 80,
                borderRadius: 20,
                backgroundColor: Colors.white,
                elevation: 5,
              }}
            >
              <Image
                source={data}
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
              />
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: '90%',
            height: 50,
            backgroundColor: Colors.brand,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: Colors.white,
              letterSpacing: 1,
              marginRight: 10,
            }}
          >
            Place on Order
          </Text>
          <Entypo name="chevron-right" style={{ fontSize: 16, color: Colors.white }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Category;