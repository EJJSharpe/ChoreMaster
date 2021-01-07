import { StyleSheet } from 'react-native'
export default StyleSheet.create({
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 25
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
        backgroundColor: 'yellow',
        borderRadius: 25
    },
    modalText: {
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10

    }
})