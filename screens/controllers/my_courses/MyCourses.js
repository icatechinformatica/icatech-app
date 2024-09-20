import React, {Component} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from '../../../config/Request';
import Course from '../../components/Course';

class MyCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            pre: [],
            current_view: 'favorites'
        };
    }

    componentDidMount() {
        this.setCourses();
        this.setPre();
    }

    setCourses=async()=>{
        const result = await axios.get(`my_favorites`);
        this.setState({ favorites: result.data.data });
    }

    setPre=async()=>{
        const result = await axios.get(`my_courses`);
        this.setState({ pre: result.data.data });
    }

    render(){
        return (
            <View style={{ flex: 1 }}>
                <Header title='Mi Baúl' navigation={this.props.navigation}></Header>
                {/* <View style={{ padding: 10, backgroundColor: 'white' }}>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack() }>
                        <Icon name='arrow-back-outline' size={25} color="#541533" />
                    </TouchableOpacity>
                </View> */}
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' ,padding: 10, backgroundColor: 'white' }}>
                    <View style={{ flex: 1}}> 
                        <TouchableOpacity onPress={()=> this.setState({ current_view: 'favorites' })}>
                            <Icon style={{ textAlign: 'center', color: (this.state.current_view == 'favorites' ? '#541533' : 'black')}} name='star-outline' size={25}  />
                            <Text style={{ textAlign:'center', color: '#B09A5E' }}>Favoritos</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}> 
                        <TouchableOpacity onPress={()=> this.setState({ current_view: 'pre' })} >
                            <Icon style={{ textAlign: 'center', color: (this.state.current_view == 'pre' ? '#541533' : 'black')}} name='checkmark-circle-outline' size={25} />
                            <Text style={{ textAlign:'center', color: '#B09A5E' }}>Preinscritos</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    this.state.current_view == 'favorites' && 
                    <>
                        <View style={{ flex: 8, backgroundColor: 'white' }}>
                            <Text style={{ textAlign: 'center' }}>Favoritos</Text>
                            <Course courses={this.state.favorites}  navigation={this.props.navigation} />
                        </View>
                    </>
                }

                {
                    this.state.current_view == 'pre' && 
                    <>
                        <View style={{ flex: 8, backgroundColor: 'white' }}>
                            <Text style={{ textAlign: 'center' }}>Pre-Inscritos</Text>
                            <Course courses={this.state.pre}  navigation={this.props.navigation} />
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