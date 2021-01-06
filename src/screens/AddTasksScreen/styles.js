import { StyleSheet } from 'react-native'
export default StyleSheet.create({
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        marginTop: 10
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    task: {
        borderRadius: 5,
        backgroundColor: 'white',
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        marginTop: 10,
        paddingTop: 16,
        paddingBottom: 16,
        fontWeight: 'bold'
    },
    modalView: {
        backgroundColor: 'yellow',
        borderRadius: 5
    },
    modalText: {
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10

    }
})