import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from 'yup'; // Import Yup for validation
import { Image, View, TouchableOpacity, StyleSheet, ScrollView, Text } from "react-native";
import { Ionicons, Octicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';

import {
    StyledContainer,
    SubTitle,
    StyledFormArea,
    StyledTextInput,
    StyledInputLabel,
    LeftIcon,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    MessageBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    coreStyles,
} from '../../components/Styles';
import { setupDatabase } from "../../database/database";
import { saveUser, checkUser } from "../../database/services/AuthService";

const { darkLight, brand } = Colors;

const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));
    const [dob, setDob] = useState('');
    const [db, setDb] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate.toISOString().split('T')[0]); // Format the date as YYYY-MM-DD
    };

    const showDatePicker = () => {
        setShow(true);
    };

    useEffect(() => {
        setupDatabase().then(database => {
            setDb(database);
            console.log('Database setup complete');
        }).catch(error => {
            console.error('Database setup failed:', error);
        });
    }, []);

    const handleSignup = async (values) => {
        try {
            if (!db) {
                console.error('Database is not initialized');
                setErrorMessage('Database is not initialized');
                return;
            }

            // Check if the user already exists
            const existingUser = await checkUser(values);
            if (existingUser) {
                Toast.show({
                    type: 'error',
                    text1: 'User already exists with this email or mobile number',
                    visibilityTime: 2500,
                    position: 'top',
                });
                return;
            }

            const userData = {
                ...values,
                dob, // Ensure dob is included
            };

            // Debugging: log values
            console.log('Signup values:', userData);

            // Insert the new user
            await saveUser(userData);

            Toast.show({
                type: 'success',
                text1: 'User Registered successfully',
                visibilityTime: 2500,
                position: 'top',
            });
            navigation.navigate('Login');
        } catch (error) {
            console.error('Signup failed:', error);
            setErrorMessage('Signup failed. Please try again.');
        }
    };

    // Create a validation schema with Yup
    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        mobile: Yup.string().required('Mobile Number is required').matches(/^\d+$/, 'Mobile number is not valid'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
    });

    const handleSubmit = (values, { setSubmitting }) => {
        console.log('Submitting form...', values); // Log values to check if handleSubmit is triggered
        handleSignup(values); // Call your handleSignup function
        setSubmitting(false); // Set submitting to false once the operation is complete
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <StyledContainer>
                <View style={styles.imageWrapper}>
                    <View style={styles.imageBg}>
                        <Image style={styles.image} source={require('../../assets/onboarding images/png-images/yellow-pouch-full-logo.png')} />
                    </View>
                </View>
                <SubTitle>Account Signup</SubTitle>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
                <Formik
                    initialValues={{ fullName: '', email: '', mobile: '', password: '', confirmPassword: '', dob: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}  // Use the simplified handleSubmit function
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <StyledFormArea>
                            <MyTextInput
                                label="Full Name"
                                icon="person"
                                placeholder="sample"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('fullName')}
                                onBlur={handleBlur('fullName')}
                                value={values.fullName}
                                hasError={errors.fullName && touched.fullName}
                            />
                            {errors.fullName && touched.fullName ? (
                                <Text style={coreStyles.errorText}>{errors.fullName}</Text>
                            ) : null}
                            <MyTextInput
                                label="Email Address"
                                icon="mail"
                                placeholder="sample@gmail.com"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                                hasError={errors.email && touched.email}
                            />
                            {errors.email && touched.email ? (
                                <Text style={coreStyles.errorText}>{errors.email}</Text>
                            ) : null}
                            <MyTextInput
                                label="Mobile Number"
                                icon="device-mobile"
                                placeholder="+1234567890"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('mobile')}
                                onBlur={handleBlur('mobile')}
                                value={values.mobile}
                                keyboardType="phone-pad"
                                hasError={errors.mobile && touched.mobile}
                            />
                            {errors.mobile && touched.mobile ? (
                                <Text style={coreStyles.errorText}>{errors.mobile}</Text>
                            ) : null}
                            <MyTextInput
                                label="Date of Birth"
                                icon="calendar"
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('dob')}
                                onBlur={handleBlur('dob')}
                                value={dob ? dob : values.dob}
                                isDate={true}
                                editable={false}
                                showDatePicker={showDatePicker}
                                hasError={errors.dob && touched.dob}
                            />
                            {errors.dob && touched.dob ? (
                                <Text style={coreStyles.errorText}>{errors.dob}</Text>
                            ) : null}
                            <MyTextInput
                                label="Password"
                                icon="lock"
                                placeholder="* * * * * "
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                                hasError={errors.password && touched.password}
                            />
                            {errors.password && touched.password ? (
                                <Text style={coreStyles.errorText}>{errors.password}</Text>
                            ) : null}
                            <MyTextInput
                                label="Confirm Password"
                                icon="lock"
                                placeholder="* * * * * "
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                                hasError={errors.confirmPassword && touched.confirmPassword}
                            />
                            {errors.confirmPassword && touched.confirmPassword ? (
                                <Text style={coreStyles.errorText}>{errors.confirmPassword}</Text>
                            ) : null}
                            <MessageBox>{errorMessage}</MessageBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Signup</ButtonText>
                            </StyledButton>
                            <Line />
                            <ExtraView>
                                <ExtraText>Already have an account </ExtraText>
                                <TextLink onPress={() => navigation.navigate('Login')}>
                                    <TextLinkContent>Login</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                    )}
                </Formik>
            </StyledContainer>
        </ScrollView>
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, hasError, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}></Octicons>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput
                style={hasError ? [coreStyles.input, coreStyles.errorInput] : coreStyles.input}
                {...props}
            />}
            {isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput {...props} style={hasError ? coreStyles.errorInput : {}} />
                </TouchableOpacity>
            )}
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default Signup;
