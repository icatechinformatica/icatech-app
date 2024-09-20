import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import axios from '../../config/Request';
import style  from "../../styles/Main.StyleSheets"

class Course extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paginate: 1,
            last_page: 1,
            searchFlag: false
        };
    }

    render() {
        return (
            <View style={{ marginTop: 20 }}>
                <SafeAreaView style={{ padding: 20 }}>
                    <FlatList
                        onEndReachedThreshold={90}
                        contentContainerStyle={{ paddingBottom: 200, marginTop: 2 }}
                        data={this.props.courses}
                        keyExtractor={(item, index)=> index.toString() }
                        renderItem={(item) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CourseShow', { course: item.item.id }) } style={style.filesCard}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flex: 0.7  }}>
                                        <Image source={{uri: item.item.thumbnail}} style={{ width: 100, height: 100, borderRadius: 5 }} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'right' }}>{item.item.name}</Text>
                                        <Text style={{ fontSize: 15, textAlign: 'right', color: '#541533' }}>{item.item.modality}</Text>
                                        <Text style={{ fontSize: 15, textAlign: 'right' }}>{item.item.unit}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'right' }}>Inicio</Text>
                                        <Text style={{ fontSize: 15, textAlign: 'right' }}>{item.item.start_date}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )} />
                </SafeAreaView>
            </View>
        );  
    }
}

export default connect(
    (state) => ({ user: state.user })
)(Course);