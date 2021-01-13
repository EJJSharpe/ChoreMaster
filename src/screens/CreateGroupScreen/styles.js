import { StyleSheet } from 'react-native'


export default StyleSheet.create({
    container: { backgroundColor: '#ff841f', flex: 1 },

    input: {
        height: 48,
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 40,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        borderWidth: 2,
        borderColor: '#FFD006',
    },
    button: {
        backgroundColor: '#033B86',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        height: 48,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: 'center',

    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },



})