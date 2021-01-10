import { StyleSheet } from 'react-native'
export default StyleSheet.create({
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
    numInput: {
        flex: 1,
        backgroundColor: 'white',
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 25,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center'
    },
    modalView: {
        backgroundColor: '#FFD006',
        borderRadius: 25,
        alignSelf: 'center',
        width: 290
    },
    modalText: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        fontSize: 20,
        textAlign: 'center'

    },
    instructionsText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 20
    }
})