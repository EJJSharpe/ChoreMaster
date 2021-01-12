import { StyleSheet } from 'react-native'
export default StyleSheet.create({
    container: {
        backgroundColor: '#ff841f'
    },

    pointsRemaining: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold'
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
    taskContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    task: {
        flex: 5,
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginLeft: 30,
        marginRight: 15,
        paddingLeft: 16,
        marginTop: 12,
        paddingTop: 13,
        paddingBottom: 13,
        fontWeight: 'bold',
        color: '#033B86',
        fontSize: 16,
        borderColor: '#FFD006',
        borderWidth: 2,
    },
    numInput: {
        flex: 1,
        backgroundColor: 'white',
        marginRight: 30,
        marginTop: 20,
        marginBottom: 10,
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