import React, {Component} from 'react';
import { View, Text, Image, KeyboardAvoidingView, SafeAreaView, TextInput, ScrollView, Linking,  Alert, TouchableOpacity, Platform} from 'react-native';
import { Button, Checkbox, RadioButton } from 'react-native-paper';
import style  from '../styles/Main.StyleSheets'
import axios from '../config/Request';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

export default class SignUpScreen extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this.state = {
            units: [], unit_id: '', first_name: '', last_name: '',
            name: '', email: '', phone: '', curp: '', password: '', 
            password_confirmation: '', checked: false,
            errors: []
        };
        
        this.loadUnits();
    }

    loadUnits=async()=>{
        const units = await axios.get('units');
        this.setState({units: units.data});
    }

    redirect=()=>{
        Linking.openURL('https://www.icatech.gob.mx/avisos-de-privacidad').catch((err) => console.error('An error occurred', err));
    }

    register=async()=>{
        try {
            const response = await axios.post('sanctum/register', this.setUserInfo());
            Alert.alert(
                "Mensaje",
                "Usuario registrado correctamente, ya puedes acceder a la aplicación",
                [
                  { text: "Entendido", onPress: () => console.log("OK Pressed") }
                ]
              );    
            this.props.navigation.replace('Login')
        } catch (error) {
            this.setState({
                errors: error.response.data.errors 
            })
        }
    }

    setUserInfo=()=>{
        return {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
            phone: this.state.phone,
            unit_id: this.state.unit_id
        }
    }

    render() {
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ flex: 0.4 }}>
                        <View style={{ flex: 0.4 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
                                <Image source={require('../assets/logo.png')} style={{ width: 100, height: 100 }} />
                            </View>
                            <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 10}}>Crear cuenta</Text>
                        </View>
                    </View>
                    <SafeAreaView style={{ flex: 1 }}>
                        <ScrollView style={{ flex: 1 }}>
                            <View style={{ flex: 1, backgroundColor: 'white' }}>
                                <View style={{ flex: 1, padding: 20 }}>
                                    <TextInput style={style.inputs} placeholderTextColor="black" placeholder="Nombres" onChangeText={(text) => this.setState({ first_name: text })}></TextInput>
                                    { (this.state.errors && this.state.errors.first_name != undefined)  && <Text style={style.errors}>{this.state.errors.first_name[0]}</Text> }
                                    <TextInput style={style.inputs}  placeholderTextColor="black" placeholder="Apellidos" onChangeText={(text) => this.setState({ last_name: text })}></TextInput>
                                    { (this.state.errors && this.state.errors.last_name != undefined)  && <Text style={style.errors}>{this.state.errors.last_name[0]}</Text> }
                                    <TextInput style={style.inputs} placeholderTextColor="black" placeholder="Email" onChangeText={(text) => this.setState({ email: text })}></TextInput>
                                    { (this.state.errors && this.state.errors.email != undefined)  && <Text style={style.errors}>{this.state.errors.email[0]}</Text> }
                                    <TextInput style={style.inputs} placeholderTextColor="black" placeholder="Teléfono" keyboardType="numeric" onChangeText={(text) => this.setState({ phone: text })}></TextInput>
                                    { (this.state.errors && this.state.errors.phone != undefined)  && <Text style={style.errors}>{this.state.errors.phone[0]}</Text> }
                                    <TextInput style={style.inputs}placeholderTextColor="black" placeholder="Contraseña" secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })}></TextInput>
                                    { (this.state.errors && this.state.errors.password != undefined)  && <Text style={style.errors}>{this.state.errors.password[0]}</Text> }
                                    <TextInput style={style.inputs} placeholderTextColor="black" placeholder="Confirmación contraseña" secureTextEntry={true} onChangeText={(text) => this.setState({ password_confirmation: text })}></TextInput>
                                    { (this.state.errors && this.state.errors.password != undefined)  && <Text style={style.errors}>{this.state.errors.password[0]}</Text> }

                                    <Text style={{ textAlign: 'center', color: '#541533', marginBottom: 5 }}>Porfavor elige una unidad de capacitación cerca de ti</Text>

                                    <View>
                                        <Picker
                                            style={{ width: '100%' }}
                                            selectedValue={parseInt(this.state.unit_id)}
                                            onValueChange={(itemValue, itemIndex) =>
                                                this.setState({ unit_id: itemValue })
                                            }>
                                            {
                                                this.state.units.map((item,key) => {
                                                    return <Picker.Item label={item.name} value={item.id} key={key} STF = {11}/>
                                                })
                                            }
                                        </Picker>
                                        
                                    </View>

                                    <View style={{ flexDirection: 'row', padding: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                                        <View>
                                            <Text>Al oprimir Registrarme estás aceptando  </Text>
                                        </View>
                                        <TouchableOpacity onPress={this.redirect}>
                                            <View>
                                                <Text>
                                                    las politicas del 
                                                    <Text style={{ color: '#541533' }}> aviso de privacidad</Text>
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <Button mode="contained" style={style.btnPrimary} onPress={this.register}>
                                        <Text style={{ color: 'white' }}>REGISTRARME</Text>
                                    </Button>
                                </View>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </View>
        );
    }
}