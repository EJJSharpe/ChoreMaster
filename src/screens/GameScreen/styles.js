import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#F5FCFF",
        alignSelf: "stretch",
    },

    title: {
        fontSize: 38,
        fontWeight: "800",
        alignSelf: "center",
    },

    task: {
        paddingHorizontal: 40,
        fontWeight: "bold",
        fontSize: 16,
    },
    points: {
        paddingHorizontal: 40,
    },
    taskContainer: {
        flex: 1,
        overflow: "hidden",
        borderRadius: 25,
        marginVertical: 5,
        marginHorizontal: 20,

        backgroundColor: "#ff841f",
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
    heading: {
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 75,
        marginTop: 14,
    },
    cardContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        borderRadius: 25,
        overflow: "hidden",
        backgroundColor: "grey",
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 50,
        paddingTop: 10,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
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
    },
