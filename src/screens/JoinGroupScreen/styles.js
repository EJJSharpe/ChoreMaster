import { StyleSheet } from 'react-native'


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff841f',

    },

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
        borderColor: '#FFD006',
        borderWidth: 2
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
    }



})