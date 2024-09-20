import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView>
                <View style={{ flexDirection: 'row', justifyContent:'space-between', backgroundColor: '#541533', alignItems: 'baseline', padding: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>{this.props.title}</Text>
                    <View>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Profile')}>
                            {
                                this.props.user.username != '' && <Text style={{ color: 'white' }}>Hola {this.props.user.username}</Text>
                            }
                            {
                                this.props.user.username == '' && <Text style={{ color: 'white' }}>Hola {this.props.user.first_name}</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );  
    }
}

export default connect(
    (state) => ({ user: state.user })
)(Header);