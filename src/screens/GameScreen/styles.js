import { StyleSheet } from "react-native";

export default StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#ff841f'
    },

    headingContainer: {
        backgroundColor: 'white'
    },

    title: {
        fontSize: 38,
        fontWeight: "800",
        alignSelf: "center",
    },
    taskSectionContainer: {
        height: 200,
        backgroundColor: '#033B86',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#FFD006',
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
        marginTop: 20,
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

    buttonContainer: {
        flex: 1,
        flexDirection: "column",
        alignContent: "center",
    },
    button: {
        backgroundColor: "#788eec",
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
    },
    outerCardsContainer: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#FFD006',
        borderRadius: 25

    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    turnText: {
        borderStyle: "solid",
        borderWidth: 5,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20,
        paddingLeft: 100,
        paddingRight: 15,
        paddingBottom: 20,
        paddingTop: 20,
    }
})