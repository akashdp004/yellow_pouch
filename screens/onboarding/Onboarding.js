import { Image, View, Text, StyleSheet, Pressable,TouchableOpacity } from "react-native";
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { StyledContainer } from "../../components/Styles";


const Dots = ({ selected }) =>{
    let backgroundColor;
    backgroundColor = selected ? '#ff2156' : '#808080'
    return (
        <View
          style={{
            height: 5,
            width: 5,
            marginHorizontal: 3,
            backgroundColor
          }}
        />
    )
}

const Done = ({ ...props }) =>(
    <TouchableOpacity
      style={{
        marginRight: 12
      }}
    {...props}
    >
        <Text style={{color: "#ff2156"}}>Done</Text>
    </TouchableOpacity>
)

const OnboardingScreen = ({ navigation }) => {
  return(
    <StyledContainer>
            <View style={styles.imageWrapper}>
                <View style={styles.imageBg}>
                    <Image style={styles.image} source={require('../../assets/onboarding images/png-images/yellow-pouch-full-logo.png')} />
                </View>                
            </View>
            <View style={styles.textWrap}>
                <Text style={styles.titleTxt}>Get your groceries delivered to your home</Text>
                <Text style={styles.smallTxt}>The best delivery app in town for delivering your daily fresh groceries</Text>
            </View>
            <View style={styles.buttonWrap}>
                <TouchableOpacity style={styles.button} android_ripple={{color: '#fff'}} 
                onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonTxt}>Explore</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomImageWrap}>
                <Image style={styles.bottomImage} source={require('../../assets/onboarding images/png-images/intro-image-with-elements.png')} />
            </View>
        </StyledContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
      backgroundColor: '#FFDDDD',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
  },
  imageWrapper: {        
      flex: 1,        
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: 35
  },
  imageBg: {
      padding: 20,
      backgroundColor: '#1A3848',
      borderRadius: 150,
  },
  image: {        
      width: 100,
      height: 100,
  },
  textWrap: {
      justifyContent: 'center',
      marginTop: 20,
      width: '80%',
      flex: 1
  },
  titleTxt: {
      fontSize: 28,        
      color: '#100F18',
      textAlign: 'center'
  },
  smallTxt: {
      marginTop: 10,
      color: '#617986',
      fontSize: 17,
      textAlign: 'center'
  },
  buttonWrap: {
      width: '60%',
      flex: 1,
      justifyContent: 'flex-start'
  },
  button: {
      width: '100%',
      backgroundColor: '#23AA49',
      padding: 16,
      marginTop: 15,
      borderRadius: 45,        
  },
  buttonTxt: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 18
  },
  bottomImageWrap: {
      flex: 2,
  },
  bottomImage: {}
});

export default OnboardingScreen