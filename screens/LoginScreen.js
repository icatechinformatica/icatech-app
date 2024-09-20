import React, {Component} from 'react';
import { View, Text, Image, KeyboardAvoidingView, Linking, TextInput, Dimensions, Alert, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import style  from "../styles/Main.StyleSheets"
import { connect } from 'react-redux';
import { login } from '../actions/user'
import axios from '../config/Request';

class LoginScreen extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        };
    }

    componentDidMount() {
        
    }

    loadAlert=()=>{
        Alert.alert('Example');
    }
    
    restorePassword=()=>{
        Linking.openURL('https://red.icatech.gob.mx/forgot-password').catch((err) => console.error('An error occurred', err));
    }

    login=async()=> {
        try {
            let response = await axios.post('sanctum/token', { email: this.state.email, password: this.state.password });
            await AsyncStorage.setItem('token', response.data.token);
            this.props.login(response.data.user);
            this.props.navigation.navigate('App');
        } catch (error) {
            Alert.alert(
                "Mensaje",
                "Los datos son incorrectos",
                [
                  { text: "Entendido", onPress: () => console.log("OK Pressed") }
                ]
              );
            this.setState({ error: 'Los datos no son validos' })
        }
    }

    render() {
        return(
            <KeyboardAvoidingView 
                style={{ flex: 1}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ flex: 1}}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: Dimensions.get('window').width * 0.3}}>
                                <Image source={require('../assets/logo.png')} style={{ width: 150, height: 150 }} />
                            </View>
                            {
                                this.state.error != '' && <Text style={{ textAlign: 'center', color: 'red' }}>{this.state.error}</Text>
                            }
                        </View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        <View style={{ flex: 1, marginTop: 10, padding: 20 }}>
                            <TextInput style={style.inputs} placeholderTextColor="black" placeholder="Email" onChangeText={(text) => this.setState({ email: text })}></TextInput>
                            <TextInput style={style.inputs} placeholderTextColor="black" placeholder="Contraseña" secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })}></TextInput>
                            <View style={{ padding: 0  }}>
                                <Button mode="contained" style={style.btnPrimary}
                                        onPress={this.login}>
                                        <Text style={{ color: 'white' }}>Entrar</Text>
                                </Button>
                                <View style={{ marginTop: 10 }}>
                                    <Button style={{  marginTop: 10 }} mode='text' onPress={()=> this.props.navigation.navigate('SignUp')}>
                                        <Text style={{ color: '#541533' }}>No tienes una cuenta?</Text>
                                    </Button>
                                </View>
                            </View>

                            <View style={{ padding: 0 , marginTop: 5 }}>
                                <Button mode='text' onPress={this.restorePassword} style={{ marginTop: 0 }}>
                                    <Text style={{ color: '#541533' }}>¿Olvidaste tu contraseña?</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default connect(
    (state) => ({ user: state.user }),
    {
        login: login
    }
)(LoginScreen)