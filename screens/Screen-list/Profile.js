import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons, Octicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setupDatabase } from "../../database/database";
import Toast from 'react-native-toast-message';
import { checkUser, updateUser } from '../../database/services/AuthService';
import {
  StyledTextInput,
  StyledInputLabel,
  LeftIcon,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  coreStyles,
  Avatar,
  PageTitle,
  ProfileContainer
} from '../../components/Styles';

const validationSchema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile: yup.string().required('Phone Number is required'),
  dateOfBirth: yup.date().required('Date of Birth is required')
});

const Profile = ({ navigation }) => {
  const [db, setDb] = useState(null);
  const [userData, setUserData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [show, setShow] = useState(false);
  const [dob, setDob] = useState('');
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [initialValues, setInitialValues] = useState({
    fullName: '',
    email: '',
    mobile: '',
    dateOfBirth: new Date(2000, 0, 1)
  });

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
          await getUser(loginDetails);
        } else {
          console.log("No login details found");
        }
      } catch (error) {
        console.error('Database setup failed:', error);
        setErrorMessage('Database setup failed. Please try again.')
      }
    };
    initializeDatabase();
  }, []);

  const getUser = async (values) => {
    try {
      const user = await checkUser(values);
      console.log('get:',user);
      if (user) {
        const dobDate = new Date(user.dob); // Parse the dob string into a Date object
        if (!isNaN(dobDate.getTime())) { // Check if date is valid
          setInitialValues({
            fullName: user.name,
            email: user.email,
            mobile: user.mobile,
            dateOfBirth: dobDate,
          });
          setDob(user.dob); // Set dob as string for display (if needed)
          setDate(dobDate);
        } else {
          console.error('Invalid date received:', user.dob);
          setErrorMessage('Invalid date received from the server.');
        }
      } else {
        console.error('User not found or user data is incomplete');
        setErrorMessage('User not found or user data is incomplete.');
      }
    } catch (error) {
      console.error('Fetching user failed:', error);
      setErrorMessage('Fetching user failed. Please try again.');
    }
  };

  const saveUser = async (values) => {
    console.log('Saving user with values:', values)
    try {
      const date = new Date(values.dateOfBirth);

      // Extract year, month, and day from the Date object
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero indexed, so we add 1
      const day = ("0" + date.getDate()).slice(-2);

      // Form the desired date format
      const formattedDate = `${year}-${month}-${day}`;
      const updateValue = {
        id:userData.id,
        fullName: values.fullName,
        mobile: values.mobile,
        dob: formattedDate
      }
      console.log(updateValue);
      await updateUser(updateValue); 
        Toast.show({
          type: 'success',
          text1: 'Profile Updated Successfully',
          visibilityTime: 2500,
          position: 'top',
        });
        const existingUserData = await AsyncStorage.getItem('userData');
        if (existingUserData !== null) {
            const userData = JSON.parse(existingUserData);
            userData.name = updateValue.fullName;
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            
            console.log('User name updated successfully:', userData);
        } else {
            console.log('No user data found');
        }
    } catch (error) {
      console.error('Updating user failed:', error);
      setErrorMessage('Updating user failed. Please try again.');
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate.toISOString().split('T')[0]); // Format the date as YYYY-MM-DD
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <ProfileContainer>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values) => {
            saveUser(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
            <View>
              <View style={styles.header}>
                <PageTitle style={styles.pageTitle}>Your Profile</PageTitle>
              </View>
              {/* <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Avatar
                    resizeMode="cover"
                    source={require('../../assets/Logo/logo-main.jpg')}
                  />
                </View>
              </View> */}
              <View style={styles.formArea}>
                <MyTextInput
                  label="Full Name"
                  icon="person"
                  placeholder="sample"
                  placeholderTextColor={Colors.darkLight}
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
                  placeholderTextColor={Colors.darkLight}
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
                  placeholderTextColor={Colors.darkLight}
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
                  placeholderTextColor={Colors.darkLight}
                  onChangeText={handleChange('dateOfBirth')}
                  onBlur={handleBlur('dateOfBirth')}
                  value={dob}
                  isDate={true}
                  editable={false}
                  showDatePicker={showDatePicker}
                  hasError={errors.dateOfBirth && touched.dateOfBirth}
                />
                {errors.dateOfBirth && touched.dateOfBirth && (
                  <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
                )}

                <View>
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Save</ButtonText>
                  </StyledButton>
                </View>
              </View>

              {show && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
          )}
        </Formik>
      </ScrollView>
    </ProfileContainer>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, hasError, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={Colors.brand}></Octicons>
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && (
        <StyledTextInput
          style={hasError ? [coreStyles.input, coreStyles.errorInput] : coreStyles.input}
          {...props}
        />
      )}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} style={hasError ? coreStyles.errorInput : {}} />
        </TouchableOpacity>
      )}
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={Colors.darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  formArea: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  leftIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
});

export default Profile;