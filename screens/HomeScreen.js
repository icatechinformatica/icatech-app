import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';

class HomeScreen extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
    }

    logout = async ()=> {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth')
    }

    render() {
        return(
            <View style={{ paddingTop: 200 }}>
                <Text>Welcome {this.props.user.name}</Text>
                <Button onPress={this.logout}>Logout</Button>
            </View>
        );
    }
}

export default connect(
    (state) => ({ user: state.user }),
)(HomeScreen)