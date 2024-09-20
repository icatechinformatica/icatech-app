import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import Header from '../../components/Header';
import axios from '../../../config/Request';
import style  from "../../../styles/Main.StyleSheets";
import { NavigationActions, StackActions } from 'react-navigation';

class CourseShow extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this.state = {
            course: {}
        };

        this.setCourses();
        console.log("===========");
        console.log(this.props.user.curp === "");
        console.log("==========")
    }

    setCourses=async(path = 'courses')=>{
        const result = await axios.get(`${path}/${this.props.navigation.state.params.course}`);
        this.setState({ course: result.data });
    }

    validateCurp=()=>{
        return this.props.user.curp === "";
    }

    setFavorites=async()=>{
        const result = await axios.post(`favorites/${this.props.user.id}/${this.props.navigation.state.params.course}`);
        this.props.navigation.replace('DashboardTabScreen', {favorites: true});
    }

    removeFavorites=async()=>{
        const result = await axios.post(`favorites/${this.props.user.id}/${this.props.navigation.state.params.course}`);
        this.props.navigation.replace('DashboardTabScreen', {remove_favorites: true});
    }

    removePre=async()=>{
        const result = await axios.post(`course/${this.props.user.id}/${this.props.navigation.state.params.course}`);
        this.props.navigation.replace('DashboardTabScreen', {remove_course: true});
    }

    setPre=async()=>{
        if(this.validateCurp()) {
            return this.props.navigation.replace('Profile', { message: "Por favor ingresa tu CURP para que puedas preinscribirte al curso" });
        }

        const result = await axios.post(`course/${this.props.user.id}/${this.props.navigation.state.params.course}`);
        this.props.navigation.replace('DashboardTabScreen', {redirectToBaul: true});
    }

    render(){
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header title='Cursos' navigation={this.props.navigation}></Header>
                <View style={{ padding: 0, backgroundColor: 'white' }}>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack() }>
                        <Icon name='arrow-back-outline' size={25} color="#541533" />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 ,flexDirection: 'row', marginTop: 5, justifyContent: 'space-around', padding: 30 }}>
                    <Image source={{uri: this.state.course.thumbnail }} style={{ width: 100, height: 100, borderRadius: 5 }} />
                    <View style={{ marginLeft: 50 }}>
                        <Text style={{ fontSize: 15}}>{this.state.course.name}</Text>
                        <Text>{this.state.course.unit}</Text>
                        <Text style={{ color: '#541533' }}>{this.state.course.modality}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#541533' }}>{this.state.course.duration} Horas</Text>
                            <Text style={{ marginLeft: 5, color: '#541533' }}>{this.state.course.capacity} Alumnos</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.5, padding: 20 }}>
                    <View>
                        <Text style={{ fontSize: 15, color: '#541533', fontWeight: 'bold' }}>Objetivo del curso</Text>
                        <Text>{this.state.course.objective}</Text>
                    </View>
                    <View style={{marginTop: 2}}>
                        <Text style={{ fontSize: 15, color: '#541533', fontWeight: 'bold' }}>Perfil del curso</Text>
                        <Text>{this.state.course.profile}</Text>
                    </View>
                    <View style={{ marginTop: 2 }}>
                        <Text style={{ fontSize: 15, color: '#541533', fontWeight: 'bold' }}>Requisitos del curso</Text>
                        <Text>{this.state.course.requirement}</Text>
                    </View>
                    <View style={{ marginTop: 2 }}>
                        <Text style={{ fontSize: 15, color: '#541533', fontWeight: 'bold' }}>Material del curso</Text>
                        <Text>{this.state.course.material}</Text>
                    <View style={{ flex: 0.2 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, color: '#541533' }}>HORARIOS: </Text>
                            <Text>{this.state.course.hour}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, color: '#541533' }}>FECHA DE INICIO: </Text>
                            <Text>{this.state.course.start_date}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, color: '#541533' }}>COSTO: </Text>
                            <Text>${this.state.course.cost}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, color: '#541533' }}>CONTACTO: </Text>
                            <Text>{this.state.course.email}</Text>
                        </View>
                    </View>

                    <View style={{ flex: 0.4, padding: 20 }}>  
                        {
                            this.state.course.favorites && <Button mode='contained'  onPress={this.setFavorites} style={style.btnSecondary}><Text style={{ color: '#541533' }}>Agregar a favoritos</Text></Button>
                        }
                        {
                            !this.state.course.favorites && <Button mode='contained'  onPress={this.removeFavorites} style={style.btnSecondary}><Text style={{ color: '#541533' }}>Quitar de favoritos</Text></Button>
                        }
                        {
                            this.state.course.courses && <Button mode='contained' onPress={this.setPre} style={{...style.btnPrimary, marginTop:10}}>
                                <Text style={{ color: 'white' }}>Pre-inscribirse</Text>
                            </Button>
                        }
                        {
                            !this.state.course.courses && <Button mode='contained' onPress={this.removePre} style={{...style.btnPrimary, marginTop:10}}>
                                <Text style={{ color: 'white' }}>Eliminar</Text>
                            </Button>
                        }
                    </View>
                    </View>
                </View>
            </View>
            </ScrollView>
        );  
    }
}

export default connect(
    (state) => ({ user: state.user })
)(CourseShow);