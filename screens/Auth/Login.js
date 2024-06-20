import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { View, StyleSheet, Image, ScrollView, Text } from "react-native";
import { Ionicons, Octicons, Fontisto } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    StyledContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledTextInput,
    StyledInputLabel,
    LeftIcon,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent, Space,coreStyles
} from '../../components/Styles';
import { setupDatabase } from "../../database/database";
import Toast from 'react-native-toast-message';
import { userLogin } from "../../database/services/AuthService";
import { saveCategory,saveCatItem } from "../../database/services/CategoryService";

const initializeData = async () => {
    console.log('done');
    try {
        const isInitialized = await AsyncStorage.getItem('isInitialized');
        if (isInitialized === null) {
            const categoryPromises = [
                saveCategory('Grocery', '../assets/Logo/grocery.png'),
                saveCategory('Food', '../assets/Logo/burger.png'),
                saveCategory('Games', '../assets/Logo/Logo.png'),
                saveCategory('Electronics', '../assets/Logo/mobile.png')
            ];

            await Promise.all(categoryPromises);

            const items = [
                { categoryId: 1, name: 'Yogurt', description: 'Product Description', quantity: 10, image: '../../assets/Logo/grocery.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 1, name: 'Meat', description: 'Product Description', quantity: 12, image: '../../assets/Logo/meat.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 1, name: 'Chocolate', description: 'Product Description', quantity: 13, image: '../../assets/Logo/chocolate.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 1, name: 'Milk', description: 'Product Description', quantity: 14, image: '../../assets/Logo/milk.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 1, name: 'Icecream', description: 'Product Description', quantity: 14, image: '../../assets/Logo/ice.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 1, name: 'Vegitable', description: 'Product Description', quantity: 14, image: '../../assets/Logo/vegitable.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                
                { categoryId: 2, name: 'Burger', description: 'Product Description', quantity: 19, image: '../../assets/Logo/burger.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 2, name: 'Pizza', description: 'Product Description', quantity: 100, image: '../../assets/Logo/pizza.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 2, name: 'Taccos', description: 'Product Description', quantity: 102, image: '../../assets/Logo/tacos.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 2, name: 'Kuboos', description: 'Product Description', quantity: 103, image: '../../assets/Logo/kuboos.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 2, name: 'Noodles', description: 'Product Description', quantity: 103, image: '../../assets/Logo/noodles.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 2, name: 'Salad', description: 'Product Description', quantity: 103, image: '../../assets/Logo/salad.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                
                { categoryId: 3, name: 'PlayStation 3', description: 'Product Description', quantity: 15, image: '../../assets/Logo/Logo.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 3, name: 'PlayStation 4', description: 'Product Description', quantity: 16, image: '../../assets/Logo/Logo.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 3, name: 'PlayStation 5', description: 'Product Description', quantity: 17, image: '../../assets/Logo/Logo.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 3, name: 'Xbox', description: 'Product Description', quantity: 18, image: '../../assets/Logo/Logo.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 3, name: 'Football', description: 'Product Description', quantity: 18, image: '../../assets/Logo/Logo.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 3, name: 'Basket', description: 'Product Description', quantity: 18, image: '../../assets/Logo/Logo.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
        
                { categoryId: 4, name: 'Mobile', description: 'Product Description', quantity: 104, image: '../../assets/Logo/Logo.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 4, name: 'Laptop', description: 'Product Description', quantity: 105, image: '../../assets/Logo/Logo.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 4, name: 'PC', description: 'Product Description', quantity: 106, image: '../../assets/Logo/Logo.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 4, name: 'Tablet', description: 'Product Description', quantity: 107, image: '../../assets/Logo/Logo.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 4, name: 'Camera', description: 'Product Description', quantity: 107, image: '../../assets/Logo/Logo.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
                { categoryId: 4, name: 'Led Tv', description: 'Product Description', quantity: 107, image: '../../assets/Logo/Logo.png', extraImages: '../assets/Logo/Logo.png,../assets/Logo/Logo.png,../assets/Logo/Logo.png' },
            ];

            for (const item of items) {
                await saveCatItem(item);
            }

            await AsyncStorage.setItem('isInitialized', 'true');
        } else {
            console.log('Data has already been initialized.');
        }
    } catch (error) {
        console.error('Error initializing data:', error);
    }
};
const Login = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [db, setDb] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        setupDatabase().then(database => {
            setDb(database);
            console.log('Database setup complete');
        }).catch(error => {
            console.error('Database setup failed:', error);
        });

        // Check and initialize data
        initializeData();
    }, []);

    const handleLogin = async (values) => {
        try {
            if (!db) {
                console.error('Database is not initialized');
                return;
            }

            // Check if the user exists
            const existingUser = await userLogin(values);
            console.log(existingUser);
            if (!existingUser) {
                Toast.show({
                    type: 'error',
                    text1: 'User not found',
                    text2: 'No user found with this email address.',
                    visibilityTime: 2500,
                    position: 'top',
                });
                return navigation.navigate('Login');;
            }

            // Validate password
            if (existingUser.password !== values.password) {
                Toast.show({
                    type: 'error',
                    text1: 'Incorrect Password',
                    text2: 'The password you entered is incorrect.',
                    visibilityTime: 2500,
                    position: 'top',
                });
                return navigation.navigate('Login');
            }

            // Successful login
            Toast.show({
                type: 'success',
                text1: 'User successfully logged in',
                visibilityTime: 2500,
                position: 'top',
            });
            await AsyncStorage.setItem('userData', JSON.stringify(existingUser));
            navigation.navigate('Welcome');
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Login failed. Please try again.');
        }
    };

    // Create a validation schema with Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    });
    
    return (
        
            <StyledContainer>
                <View style={styles.imageWrapper}>
                    <View style={styles.imageBg}>
                        <Image style={styles.image} source={require('../../assets/onboarding images/png-images/yellow-pouch-full-logo.png')} />
                    </View>
                </View>
                <PageTitle>Yellow Pouch</PageTitle>
                <SubTitle>Account Login</SubTitle>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema} 
                    onSubmit={handleLogin}>
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <StyledFormArea>
                            <MyTextInput
                                label="Email Address"
                                icon="mail"
                                placeholder="sample@gmail.com"
                                placeholderTextColor={Colors.darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                                error={errors.email && touched.email}
                            />
                            {errors.email && touched.email ? (
                                <Text style={coreStyles.errorText}>{errors.email}</Text>
                            ) : null}
                            <MyTextInput
                                label="Password"
                                icon="lock"
                                placeholder="* * * * * "
                                placeholderTextColor={Colors.darkLight}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                                error={errors.password && touched.password}
                            />
                            {errors.password && touched.password ? (
                                <Text style={coreStyles.errorText}>{errors.password}</Text>
                            ) : null}
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>
                            <Line />
                            <StyledButton google={true} onPress={handleSubmit}>
                                <Fontisto name="google" color={Colors.primary} size={25} />
                                <ButtonText google={true}>   Signin With Google</ButtonText>
                            </StyledButton>
                            <ExtraView>
                                <ExtraText>Don't have an account already? </ExtraText>
                                <TextLink onPress={() => navigation.navigate('Signup')}>
                                    <TextLinkContent>Signup</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                            <Space />
                        </StyledFormArea>
                    )}
                </Formik>
                <Toast/>
            </StyledContainer>
        
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, error, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={Colors.brand}></Octicons>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput
            style={error ? [coreStyles.input, coreStyles.errorInput] : coreStyles.input}
             {...props} 
             />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={Colors.darkLight} />
                </RightIcon>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    imageWrapper: {
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
        color: '#fff',
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
        flex: 2
    },
    bottomImage: {}
});

export default Login;