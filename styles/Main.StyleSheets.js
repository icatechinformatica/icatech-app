import { StyleSheet, Appearance } from 'react-native';
// Appearance.getColorScheme() === 'dark' ? "#ffffff" : "#541533"
export default StyleSheet.create({
    btnPrimary: {
        borderRadius:  40,
        padding: 5,
        marginTop: 5,
        backgroundColor: "#541533"
    },
    
    btnSecondary: {
        borderRadius:  40,
        padding: 5,
        marginTop: 5,
        backgroundColor: "#EEEEEE"
    },

    inputs: {
        borderColor: "#541533",
        borderWidth: 1,
        marginTop: 5,
        height: 40,
        margin: 10,
        borderStyle: 'solid',
        fontSize:15,
        borderRadius: 8,
    },

    selects: {
        borderColor: "#541533",
        borderWidth: 1,
        marginTop: 5,
        height: 40,
        margin: 10,
        borderStyle: 'solid',
        fontSize:15,
        borderRadius: 8,
    },

    filesCard: {
        backgroundColor: "#FDFCFD", 
        padding: 20, 
        borderRadius: 15, 
        marginBottom: 10,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2
    },

    errors: {
        color: 'red', 
        textAlign: 'center'
    },
});