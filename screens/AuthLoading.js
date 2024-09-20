import React, {Component} from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

class AuthLoading extends Component {
    componentDidMount() {
        this.props.navigation.navigate(this.props.user.id !== undefined ? 'App' : 'Auth');
    }

    render(){
        return (
            <View style={{ flex:1 ,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{ flex:1, padding: 20 }}>
                    <Image source={require('../assets/loading.png')} style={{ width: '100%' }} />
                </View>
            </View>
        );  
    }
}

export default connect(
    (state) => ({ user: state.user })
)(AuthLoading);