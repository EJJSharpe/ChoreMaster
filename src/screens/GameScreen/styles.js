import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    task: {
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: 'grey',
        marginLeft: 30,
        marginRight: 20,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20,
        paddingTop: 8,
        paddingBottom: 10,
        fontWeight: 'bold'
    },
    points: {
        flex: 1,
        backgroundColor: 'gray',
        marginRight: 20,
        marginLeft: 150,
        marginTop: 20,
        height: 20,
        borderRadius: 25,
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center'
    },
    taskContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
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
 heading: {
fontWeight: 'bold',
fontSize: 25,
 },
 cardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
},
card: {
    flex:1,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: 'grey',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 50,
    paddingTop: 10,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
}
})