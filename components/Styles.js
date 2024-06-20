
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import styled from 'styled-components/native';
const StatusBarHeight = Constants.statusBarHeight;
import { Dimensions } from 'react-native';

//colors
export const Colors = {
    primary: '#ffffff',
    secondary: '#E5E7EB',
    tertiary: '#1F2937',
    darkLight: '#9CA3AF',
    brand: '#2F2E41',
    green: '#23AA49',
    red: '#EF4444',
    white: '#ffffff',
    black: '#000000',
    lightGray: '#B3B4B6',
    accent: '#FFC231',
    accentRed: '#FB5D2E',
    accentPink: '#F96165',
    background: '#FFDDDD'
}

const { primary, secondary, tertiary, darkLight, brand, green, red, accentPink, accentRed, accent, lightGray, black, background } = Colors;
const screenWidth = Dimensions.get('window').width;

export const StyledContainer = styled.View`
    background-color: ${background};
    width: 100%;
    align-items: center;
    justify-content: center;
    flex: 1;
`
export const InnerContainer = styled.View`
    flex:1;
    width: 100%;
    align-items: center;
    background-color: ${background};
`;

export const ProfileContainer = styled.View`
    flex: 1;
    top:0;
    backgroundColor:  ${background};
`;

export const WelcomeContainer = styled(InnerContainer)`
    padding: 25px;
    padding-top: 10px;
    justify-content: center;
`;

export const BottomTabContainer = styled.View`
    width: 100%;
`;

export const PageLogo = styled.Image`
    width: 250px;
    height: 200px;
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin:auto;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${secondary};
    margin-bottom: 10px;
    margin-top: 10px;

`;

export const WelcomeImage = styled.Image`
    height: 50%;
    min-width: 100%;
`;

export const ProfileImage = styled.Image`
    height: 50%;
    min-width: 100%;
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    top:0;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding:10px;

    ${(props) => props.welcome && `
        font-size: 35px
    `}
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};

    ${(props) => props.welcome && `
        margin-bottom: 5px;
        font-weight: normal;
    `}
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${primary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius:5px;
    border-style: solid;
    border-color:${black};
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${black}
`;

export const StyledInputLabel = styled(Text)`
    color:${tertiary};
    font-size: 13px;
    text-align: left;
    font-weight: bold;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const Space = styled.View`
    margin-bottom:30%;
`

export const StyledButtonWrap = styled.TouchableOpacity`
    width: 60%;
    flex: 1;
    justify-content: flex-start;
`;

export const StyledButton = styled.TouchableOpacity`
    width: 100%;
    backgroundColor: ${brand};
    padding: 16px;
    marginTop: 15px;
    border-radius: 45px;

    ${(props) => props.google == true && `
        background-color:${green};
        flex-direction:row;
        justify-content: center;
    `}
`;

export const ButtonText = styled(Text)`
    color: ${primary};
    text-align: center;
    font-size: 18px;

    ${(props) => props.google == true && `
    `}
`;

export const MessageBox = styled(Text)`
    text-align: center;
    font-size: 13px;
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${brand};
    margin-vertical: 10px; 
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    text-align: center;
    color:${tertiary};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled(Text)`
    color: ${brand};
    font-size: 15px;
`;


export const ScreenDetailView = styled.View`
    width: 120px;
    height: 180px;
    justify-content: space-evenly;
    align-items: center;
    background-color: ${primary};
    border-radius: 20px;
    margin: 10px;
    elevation: 5;
`;

export const coreStyles = StyleSheet.create({
    errorText: {
        color: 'red',
        marginTop: 0,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    errorInput: {
        borderColor: 'red',
    },
});