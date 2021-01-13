import { StyleSheet } from 'react-native';

export default StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: '#ff841f',
    },
    heading: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 2,
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 10,
        marginTop: 10

    },

    tasksSectionContainer: {
        flex: 2,
        backgroundColor: '#033B86',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#FFD006',
    },

    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    task: {
        borderWidth: 2,
        borderColor: '#FFD006',
        flex: 5,
        backgroundColor: 'white',
        marginLeft: 15,
        marginRight: 10,
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
    },
    pointsValue: {
        borderWidth: 2,
        borderColor: '#FFD006',
        flex: 1,
        backgroundColor: 'white',
        marginRight: 10,
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 4,
        paddingRight: 4,
        borderRadius: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
    },
    modalView: {
        flex: 1,
    },
    modalText: {
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 30,

    },
    buttonsContainer: {
        flex: 0.5,
        marginTop: 10,
        marginBottom: 20,
        flexDirection: 'row',
        height: 125,
    },
    button1: {
        borderWidth: 2,
        borderColor: '#FFD006',
        flex: 1,
        backgroundColor: '#033B86',
        marginLeft: 10,
        marginRight: 5,
        borderRadius: 25,
        justifyContent: 'center',
        textAlign: 'center'

    },
    button2: {
        borderWidth: 2,
        borderColor: '#FFD006',
        flex: 1,
        backgroundColor: '#033B86',
        marginLeft: 5,
        marginRight: 10,
        borderRadius: 25,
        justifyContent: 'center',
        textAlign: 'center'

    },
    buttonTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    },

    scoreboard: {
        backgroundColor: '#033B86',
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 15,
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 15,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#FFD006',
        marginBottom: 80
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 2,
        marginTop: 10
    },
    unchecked: {
        borderWidth: 2,
        borderColor: '#FFD006',
        flex: 1,
        backgroundColor: 'red',
        marginRight: 15,
        marginTop: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 25,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
    },
    checked: {
        borderWidth: 2,
        borderColor: '#FFD006',
        flex: 1,
        backgroundColor: 'green',
        marginRight: 15,
        marginTop: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 25,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',

    }

})