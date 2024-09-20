import React, {Component} from 'react';
import { View, Text, Image, SafeAreaView, FlatList, TouchableOpacity, Alert, Linking } from 'react-native';
import { connect } from 'react-redux';
import axios from '../../../config/Request';
import style  from "../../../styles/Main.StyleSheets";
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';

class PostIndex extends Component {
    static navigationOptions = {
        headerShown: false
    };
    
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            page: 1,
            last_page: 1
        };

        this.setPosts();
    }

    componentDidMount() {
        if(this.props.navigation.state.params != undefined && this.props.navigation.state.params.redirectToBaul != undefined) {
                Alert.alert(
                    "Notificación",
                    "Haz sido preinscrito a este curso, por favor ten a la mano, CURP, una fotografía infantil y comprobante de estudios, en breve alguien te contactará para darle seguimiento a tu solicitud.",
                    [
                        { text: "Entendido", onPress: () => console.log("OK Pressed") }
                    ]
                )
        } else if(this.props.navigation.state.params != undefined && this.props.navigation.state.params.favorites != undefined) {
            Alert.alert(
                "Notificación",
                "Acabas de agregar un curso a favoritos, visita mi baúl para más información",
                [
                    { text: "Entendido", onPress: () => console.log("OK Pressed") }
                ]
            )
        } else if(this.props.navigation.state.params != undefined && this.props.navigation.state.params.remove_favorites != undefined) {
            Alert.alert(
                "Notificación",
                "Acabas de eliminar un curso de tus favoritos",
                [
                    { text: "Entendido", onPress: () => console.log("OK Pressed") }
                ]
            )
        } else if(this.props.navigation.state.params != undefined && this.props.navigation.state.params.remove_course != undefined) {
            Alert.alert(
                "Notificación",
                "Acabas de eliminar un curso, en el cual estabas preinscrito.",
                [
                    { text: "Entendido", onPress: () => console.log("OK Pressed") }
                ]
            )
        }
    }

    setPosts=async()=>{
        const result = await axios.get('posts?page=' + this.state.page);
        this.setState({
            posts: this.state.posts.concat(result.data.data),
            last_page: result.data.meta.last_page
        });
    }

    handleLoadMore=()=> {
        if(this.state.page <= this.state.last_page) {
            this.setState({ page: ++this.state.page })
            this.setPosts()
        }
    }

    redirectToFacebook=()=>{
        Linking.openURL('https://m.facebook.com/ICATchiapas/').catch((err) => console.error('An error occurred', err));
    }

    redirectToYoutube=()=>{
        Linking.openURL('https://youtube.com/channel/UCsdL9XSwa6M0wPpR1twF1PA').catch((err) => console.error('An error occurred', err));
    }

    redirectToWeb=()=>{
        Linking.openURL('https://www.icatech.gob.mx/').catch((err) => console.error('An error occurred', err));
    }

    render(){
        return (
            <View style={{flex:1, backgroundColor: 'white'}}>
                <Header title='Bienvenido' navigation={this.props.navigation}></Header>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5, marginBottom: 5 }}>
                    <TouchableOpacity onPress={this.redirectToFacebook}>
                        <Icon name='logo-facebook' size={40} color="#541533" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.redirectToYoutube}>
                        <Icon name='logo-youtube' size={40} color="#541533" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.redirectToWeb}>
                        <Icon name='earth-outline' size={40} color="#541533" />
                    </TouchableOpacity>
                </View>
                <SafeAreaView style={{ padding: 20 }}>
                    <FlatList
                        onEndReachedThreshold={0.2}
                        onEndReached={this.handleLoadMore}
                        contentContainerStyle={{ paddingBottom: 100, marginTop: 10 }}
                        data={this.state.posts}
                        keyExtractor={(item, index)=> index.toString() }
                        renderItem={(item) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('PostShow', { post: item.item.id }) } style={style.filesCard}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 0.7  }}>
                                        <Image source={{uri:item.item.thumbnail }} style={{ width: 100, height: 100, borderRadius: 5 }} />
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.item.title}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )} 
                    >
                    </FlatList>
                </SafeAreaView>
            </View>
        );  
    }
}

export default connect(
    (state) => ({ user: state.user })
)(PostIndex);