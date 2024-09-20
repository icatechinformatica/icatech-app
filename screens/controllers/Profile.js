import React, {Component} from 'react';
import { View, Text, Image, TextInput, ScrollView, Alert, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import style  from "../../styles/Main.StyleSheets";
import { Button } from 'react-native-paper';
import axios from '../../config/Request';
import {Picker} from '@react-native-picker/picker';
import {refresh} from '../../actions/user';
import {logOut} from '../../actions/user';
import { Checkbox, RadioButton } from 'react-native-paper';

class MyCourses extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);

        this.state = {
            current_view: 'personal', units: [], areas: [], userAreas: [] , errors: [],
            first_name: '', last_name: '', address: '',
            curp: '', age: '', phone: '', username: '', unit_id: ''
        };

    }

    async componentDidMount() {
        await this.setInfo();
        await this.loadUnits();
        await this.loadAreas();
        await this.loadUserAreas();

        if(this.props.navigation.state.params != undefined && this.props.navigation.state.params.message != undefined) {
            Alert.alert(
                "Notificación",
                this.props.navigation.state.params.message,
                [
                    { text: "Entendido", onPress: () => console.log("Entendido") }
                ]
            )
        }
    }
    
    loadUnits=async()=>{
        const units = await axios.get('units');
        this.setState({units: units.data});
    }

    setInfo=async()=>{
        await this.setState({ first_name: this.props.user.first_name  });
        await this.setState({ last_name: this.props.user.last_name });
        await this.setState({ address: this.props.user.address });
        await this.setState({ age: this.props.user.age });
        await this.setState({ curp: this.props.user.curp });
        await this.setState({ phone: this.props.user.phone });
        await this.setState({ username: this.props.user.username });
        await this.setState({ unit_id: this.props.user.unit_id });
    }

    loadProfile=async()=>{
        const user = await axios.post(`users`, this.getUserInfo());
    }

    loadAreas=async()=>{
        const areas = await axios.get(`specialities`);
        this.setState({ areas: areas.data })
    }

    loadUserAreas=async()=>{
        const userAreas = await axios.get(`/user/specialities`);
        await this.setState({ userAreas: userAreas.data });
    }

    getUserInfo=()=>{
        const formData = new FormData();

        formData.append('first_name', this.state.first_name);
        formData.append('last_name', this.state.last_name);
        formData.append('address', this.state.address);
        formData.append('curp', this.state.curp);
        formData.append('age', this.state.age);
        formData.append('phone', this.state.phone);
        formData.append('username', this.state.username);
        formData.append('unit_id', this.state.unit_id);

        return formData;
    }

    update=async()=>{
        try {
            const response = await axios.post(`users`, this.getUserInfo());
            this.props.refresh(response.data.data);

            Alert.alert(
                "Notificación",
                "Datos actualizados correctamente",
                [
                    { text: "Entendido", onPress: () => this.props.navigation.replace('DashboardTabScreen') }
                ]
            )
        } catch (error) {
            this.setState({
                errors: error.response.data.errors 
            })
        }
    }

    updateSpecialities=async()=>{
        const response = await axios.post(`specialities`, {
            'ids': this.state.userAreas
        });

        Alert.alert(
            "Notificación",
            "Datos actualizados correctamente",
            [
                { text: "Entendido", onPress: () => this.props.navigation.replace('DashboardTabScreen') }
            ]
        )
    }

    removeItem=(e)=>{
        let array = [...this.state.userAreas];
        var indexToRemove = 0;

        for(let i = 0; i < this.state.userAreas.length; i++)
        {
            if(e == this.state.userAreas[i]) {
                indexToRemove = i;
            }
        }

        array.splice(indexToRemove, 1);
        this.setState({userAreas: array});
    }

    logOut=async()=>{
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        this.props.navigation.navigate('Auth');
    }

    convertToUppercase=(text)=>{
        var CURP = text.toUpperCase();
        this.setState({ curp: CURP });
    }

    render(){
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Header title='Perfil' navigation={this.props.navigation}></Header>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'white' }}>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack() }>
                        <Icon name='arrow-back-outline' size={25} color="#541533" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.logOut}>
                        <Icon name='log-out-outline' size={25} color="#541533" style={{ marginRight: 10}} />
                    </TouchableOpacity>
                </View>

                <ScrollView>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' ,padding: 10, backgroundColor: 'white' }}>
                    <View style={{ flex: 1}}> 
                        <TouchableOpacity onPress={()=> this.setState({current_view: 'personal'}) }>
                            <Icon style={{ textAlign: 'center' }} name='person-outline' size={25} color="#541533" />
                            <Text style={{ textAlign:'center', color: '#B09A5E' }}>Datos Generales</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}> 
                        <TouchableOpacity onPress={()=> this.setState({current_view: 'areas'}) }>
                            <Icon style={{ textAlign: 'center' }} name='newspaper-outline' size={25} color="#541533" />
                            <Text style={{ textAlign:'center', color: '#B09A5E' }}>Areas de Interes</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    this.state.current_view == 'personal' && 
                    <>
                        <View style={{ flex: 10, backgroundColor: 'white' }}>
                            <Text style={{ textAlign: 'center',  marginBottom: 10}}>Datos Generales</Text>    
                            <TextInput style={style.inputs} placeholderTextColor="black" placeholder="Nombres" value={this.state.first_name} onChangeText={(text) => this.setState({ first_name: text })}></TextInput>
                            <TextInput style={style.inputs} placeholderTextColor="black" placeholder="Apellidos" value={this.state.last_name} onChangeText={(text) => this.setState({ last_name: text })}></TextInput>            
                            <TextInput style={style.inputs} placeholderTextColor="black" placeholder="Dirección" value={this.state.address} onChangeText={(text) => this.setState({ address: text })}></TextInput>
                            <TextInput autoCapitalize="characters" placeholderTextColor="black" style={style.inputs} placeholder="CURP" value={this.state.curp} onChangeText={(text) => this.setState({ curp: text })}></TextInput>
                            { (this.state.errors && this.state.errors.curp != undefined)  && <Text style={style.errors}>{this.state.errors.curp[0]}</Text> }

                            <TextInput style={style.inputs} placeholderTextColor="black" placeholder="Edad" keyboardType="numeric" value={this.state.age} onChangeText={(text) => this.setState({ age: text })}></TextInput>
                            <TextInput style={style.inputs} placeholderTextColor="black" placeholder="Teléfono" keyboardType="numeric" value={this.state.phone} onChangeText={(text) => this.setState({ phone: text })}></TextInput>
                            <TextInput style={style.inputs}  placeholderTextColor="black" placeholder="username" value={this.state.username} onChangeText={(text) => this.setState({ username: text })}></TextInput>
                            
                            <Text style={{ textAlign: 'center', color: '#541533' }}>Modificar unidad de capacitación</Text>
                            <View >
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


                            <View style={{ flex: 1, padding: 20 }}>  
                                <Button mode='contained' style={style.btnPrimary} onPress={this.update}>
                                    <Text style={{ color: 'white' }}>Actualizar</Text>
                                </Button>
                            </View>
                        </View>
                    </>
                }

                {
                    this.state.current_view == 'areas' && 
                    <>
                        <View style={{ flex: 1, backgroundColor: 'white' }}>
                            <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 10}}>Selecionas tus areas de interes</Text> 
                            
                                <View style={{flex: 0, padding: 0 }}>
                                    {
                                        this.state.areas.map((item) => {
                                            return <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} key={item.id}>
                                                    <RadioButton.Android
                                                        color="#541533"
                                                        value="first"
                                                        style={{ borderColor: 'black', borderWidth: 20, backgroundColor: 'red' }}
                                                        status={ this.state.userAreas.includes(item.id) ? 'checked' : 'unchecked' }
                                                        onPress={(e) => {
                                                            if(this.state.userAreas.includes(item.id)) {
                                                                this.removeItem(item.id);
                                                            } else {
                                                                this.setState({
                                                                    userAreas: this.state.userAreas.concat(item.id)
                                                                })
                                                            }
                                                        }} 
                                                    />
                                                    <TouchableOpacity onPress={()=>{
                                                        if(this.state.userAreas.includes(item.id)) {
                                                            this.removeItem(item.id);
                                                        } else {
                                                            this.setState({
                                                                userAreas: this.state.userAreas.concat(item.id)
                                                            })
                                                        }
                                                    }}>
                                                        <Text>{item.name}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                        })
                                    }

                                    <View style={{ flex: 1, padding: 20 }}>  
                                        <Button mode='contained' style={style.btnPrimary} onPress={this.updateSpecialities}>Actualizar</Button>
                                    </View>
                                </View>
                            
                        </View>
                    </>
                }
                </ScrollView>
            </View>
        );  
    }
}

export default connect(
    (state) => ({ user: state.user }),
    {
        refresh: refresh,
        logOut: logOut
    }
)(MyCourses);