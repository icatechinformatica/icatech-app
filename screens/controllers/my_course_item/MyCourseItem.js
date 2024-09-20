import React, {Component} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, EventSubscriptionVendor } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from '../../../config/Request';
import Course from '../../components/Course';

class MyCourses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coursesByUnit: [],
            coursesBySpecialitie: [],
            favorites: [],
            current_view: 'courses_by_unit'
        };
    }

    componentDidMount() {
        this.coursesByUnit();
        this.coursesBySpecialitie();
    }

    coursesBySpecialitie=async()=>{
        const result = await axios.get(`courses/user/specialities`);
        this.setState({ coursesBySpecialitie: result.data.data });
    }

    coursesByUnit=async()=>{
        const result = await axios.get(`course/unit`);
        this.setState({ coursesByUnit: result.data.data });
    }

    render(){
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Header title='Para tí' navigation={this.props.navigation}></Header>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-around' , marginTop: 5, marginBottom: 10}}>
                    <View style={{ }}> 
                        <TouchableOpacity onPress={() => this.setState({ current_view: 'courses_by_speciality' })}>
                            <Icon style={{ textAlign: 'center'}} name='list-circle-outline' size={25} color="#541533" />
                            <Text style={{ textAlign:'center', color: '#B09A5E' }}>Cursos para ti</Text>
                        </TouchableOpacity>
                    </View>

                    <View> 
                        <TouchableOpacity onPress={() => this.setState({ current_view: 'courses_by_unit' })}>
                            <Icon style={{ textAlign: 'center' }} name='location-outline' size={25} color="#541533" />
                            <Text style={{ textAlign:'center', color: '#B09A5E' }}>{this.props.user.unit_name}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    this.state.current_view == 'courses_by_speciality' && 
                    <>
                        <View style={{ flex: 8 }}>
                            <Text style={{ textAlign: 'center' }}>Cursos por especialidad</Text>
                            <Course courses={this.state.coursesBySpecialitie}  navigation={this.props.navigation} />
                        </View>
                    </>
                }

                {
                    this.state.current_view == 'courses_by_unit' && 
                    <>
                        <View style={{ flex: 8, backgroundColor: 'white', marginBottom: 50 }}>
                            <Text style={{ textAlign: 'center' }}>Cursos por unidad seleccionada</Text>
                            <Course courses={this.state.coursesByUnit}  navigation={this.props.navigation} />
                        </View>
                    </>
                }

            </View>
        );  
    }
}

export default connect(
    (state) => ({ user: state.user })
)(MyCourses);