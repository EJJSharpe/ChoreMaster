import { StyleSheet } from "react-native";

export default StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#ff841f',

    },
    heading: {
        color: '#033B86',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'white',
        marginRight: 80,
        marginLeft: 80,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#033B86',
        borderWidth: 2,
        marginBottom: 10,
        marginTop: 10
    },
    taskSectionContainer: {
        flex: 1,
        height: 200,
        backgroundColor: '#033B86',
        borderWidth: 2,
        borderColor: '#FFD006',
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 25,
    },

    taskContainer: {
        flex: 1,
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
        marginTop: 5,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        fontWeight: 'bold',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
    },
    points: {
        borderWidth: 2,
        borderColor: '#FFD006',
        flex: 1,
        backgroundColor: 'white',
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
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

    buttonContainer: {
        flex: 1,
        flexDirection: "column",
        alignContent: "center",
    },
    button: {
        backgroundColor: '#033B86',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        marginBottom: 50
    },
    outerCardsContainer: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#FFD006',
        borderRadius: 25,
        backgroundColor: '#033B86'

    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    loaderContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },

    loader: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    bottomIntroText: {
        fontWeight: 'bold'
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
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
})