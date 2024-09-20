import React, {Component} from 'react';
import { View, Text, Image, TextInput, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import style  from "../../../styles/Main.StyleSheets"
import {Picker} from '@react-native-picker/picker';
import axios from '../../../config/Request';
import Icon from 'react-native-vector-icons/Ionicons';
import Course from '../../components/Course';
import DropDownPicker from 'react-native-dropdown-picker';

class CourseIndex extends Component {
    static navigationOptions = {
        headerShown: false
    };
    
    constructor(props) {
        super(props);

        this.state = {
            courses: [],
            onLineCourses: [],
            offLineCourses: [],
            paginate: 1,
            last_page: 1,
            searchFlag: false,
            searchWord: '',
            current_view: 'online'
        };
    }

    componentDidMount(){
        this.setCourses();
        
    }

    setCourses=async()=> {
        const result = await axios.get('courses?page=' + this.state.page);
        this.setState({
            courses: this.state.courses.concat(result.data.data),
            last_page: result.data.meta.last_page
        });

        this.setOlineCourses();
        this.setOfflineCourses();
    }

    setOlineCourses=async()=>{
        const data = this.state.courses.filter((item) =>{
            return item.modality == "Online";
        });

        this.setState({onLineCourses: data});
    }

    setOfflineCourses=async()=>{
        const data = this.state.courses.filter((item) =>{
            return item.modality == "Presencial";
        });

        this.setState({offLineCourses: data});
    }

    reset=async()=>{
        await this.setState({ searchFlag: false, searchWord: '' });
        this.setState({ courses: [] });
        this.setCourses();
    }

    searchCourses=async()=>{
        const result = await axios.get('search/courses?word=' + this.state.searchWord);
        this.setState({ courses: [] });
        this.setState({ courses: this.state.courses.concat(result.data.data), })
    }

    render(){
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Header title='Cursos' navigation={this.props.navigation}></Header>
                <View style={{  flexDirection: 'row',  alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'white' }}>

                    {
                        !this.state.searchFlag && <TouchableOpacity onPress={()=> this.setState({ searchFlag: !this.state.searchFlag }) }>
                            <Icon name='search-outline' size={25} color="#541533" />
                        </TouchableOpacity>
                    }

                    {
                        this.state.searchFlag && <TouchableOpacity onPress={this.reset}>
                            <Icon name='refresh-outline' size={25} color="#541533" />
                        </TouchableOpacity>
                    }

                </View> 

                {
                    this.state.searchFlag && <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                        <TextInput style={{flex: 1, ...style.inputs}} placeholder='Ingresar busqueda' onChangeText={(text)=> this.setState({searchWord: text })}></TextInput>
                        <Button onPress={this.searchCourses} color="#541533">Buscar</Button>
                    </View>
                
                }
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5, marginBottom: 10}}>
                    <View style={{ backgroundColor: 'white' }}> 
                        <TouchableOpacity onPress={()=> this.setState({current_view: 'online'}) }>
                            <Icon style={{ textAlign: 'center' }} name='earth-outline' size={25} color="#541533" />
                            <Text style={{ textAlign:'center', color: '#B09A5E' }}>Cursos En linea</Text>
                        </TouchableOpacity>
                    </View>

                    <View > 
                        <TouchableOpacity onPress={()=> this.setState({current_view: 'offline'}) }>
                            <Icon style={{ textAlign: 'center' }} name='person-outline' size={25} color="#541533" />
                            <Text style={{ textAlign:'center', color: '#B09A5E' }}>Cursos Presenciales</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    this.state.current_view == 'online' && 
                    <>
                        <View>
                            <Text style={{ textAlign: 'center' }}>Cursos en linea</Text>
                            <Course courses={this.state.onLineCourses} navigation={this.props.navigation} />
                        </View>
                    </>
                }
                {
                    this.state.current_view == 'offline' &&  <>
                        <View>
                            <Text style={{ textAlign: 'center' }}>Cursos presenciales</Text>
                            <Course courses={this.state.offLineCourses} navigation={this.props.navigation} />
                        </View>
                    </>
                }
            </View>
        );  
    }
}

export default connect(
    (state) => ({ user: state.user })
)(CourseIndex);