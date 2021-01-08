import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    tasksSectionContainer: {
        height: 275,
    },

    taskContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    task: {
        flex: 5,
        backgroundColor: 'white',
        marginLeft: 30,
        marginRight: 10,
        marginTop: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        overflow: 'hidden'
    },
    pointsValue: {
        flex: 1,
        backgroundColor: 'white',
        marginRight: 10,
        marginTop: 20,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 25,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
    },
    modalView: {
        backgroundColor: 'yellow',
        borderRadius: 25
    },
    modalText: {
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10

    },
    buttonsContainer: {
        flexDirection: 'row',
        height: 125,
    },
    button1: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 30,
        marginRight: 15,
        borderRadius: 25,
        justifyContent: 'center',
        textAlign: 'center'

    },
    button2: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 15,
        marginRight: 30,
        borderRadius: 25,
        justifyContent: 'center',
        textAlign: 'center'

    },
    buttonTitle: {
        fontWeight: 'bold',
        textAlign: 'center'
    },

    scoreboard: {
        backgroundColor: 'red',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        paddingTop: 15,
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 15,
        borderRadius: 25,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 30,
        fontSize: 20,
        marginBottom: 20,
    },
    checkbox: {
        marginRight: 30,
        paddingTop: 22,
    }

})