import React, {Component} from 'react';
import { View, Text, Image, Dimensions, Linking, Appearance} from 'react-native';
import { Button } from 'react-native-paper';
import style  from "../styles/Main.StyleSheets";

export default class MainScreen extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
    }

    redirect=()=>{
        Linking.openURL('https://www.icatech.gob.mx/avisos-de-privacidad').catch((err) => console.error('An error occurred', err));
    }

    render() {
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1.5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: Dimensions.get('window').width * 0.4 }}>
                        <Image source={require('../assets/logo.png')} style={{ width: 200, height: 200 }} />
                    </View>
                </View>
                <View style={{ flex: 1, marginTop: Dimensions.get('window').width * 0.2, padding: 30 }}>
                        <Button mode="contained" style={style.btnPrimary}
                                onPress={() => this.props.navigation.navigate('SignUp') }>
                                    <Text style={{ color: 'white' }}>Registro</Text>
                                </Button>
                        <Button mode="contained" style={{ ...style.btnSecondary, marginTop: 10 }}
                                onPress={() => this.props.navigation.navigate('Login')}><Text style={{ color: '#541533' }}>Iniciar sesión</Text></Button>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline', textAlign: 'center' }}>
                        <Text style={{ textAlign: 'right', marginTop: 10 }}>Visita nuestro aviso de privacidad 
                        </Text>
                        <Button color="#541533" style={{ textAlign: 'center', color: 'red' }} onPress={this.redirect}>Aquí</Button>
                    </View>
                </View>
            </View>
        );
    }
}