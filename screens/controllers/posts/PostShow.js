import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import axios from '../../../config/Request';
import style  from "../../../styles/Main.StyleSheets";
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import { Button } from 'react-native-paper';

class PostShow extends Component {

    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);

        this.state = {
            post: {}
        };

        this.setPost();
    }

    setPost=async()=>{
        const post = (await axios.get('posts/' + this.props.navigation.state.params.post)).data;
        this.setState({ post: post });
    }

    redirectToLink=()=>{
        Linking.openURL(this.state.post.url).catch((err) => console.error('An error occurred', err));
    }
    
    render(){
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header title='Artículos' navigation={this.props.navigation}></Header>
                <View style={{ padding: 10, backgroundColor: 'white' }}>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack() }>
                        <Icon name='arrow-back-outline' size={25} color="#541533" />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    <Image source={{uri: this.state.post.thumbnail }} style={{ width: 100, height: 100, borderRadius: 5 }} />
                </View>
                <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 20 }}>{this.state.post.title}</Text>
                <View style={{ flex:1, justifyContent: 'center',  marginTop: 20 }}>
                    <WebView originWhitelist={['*']} source={{ html: this.state.post.content }} style={{ width: Dimensions.get('window').width }} />
                </View>
                <View style={{ margintTop: 5, flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                    <Button color="#541533" style={{ textAlign: 'center', color: 'red' }} onPress={this.redirectToLink}>Enlace de interes</Button>
                </View>
            </View>
        );  
    }
}

export default connect(
    (state) => ({ user: state.user })
)(PostShow);