import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    lobbyContainer: {
        backgroundColor: 'white',
        flex: 1
    },
    usersContainer: {
        backgroundColor: 'white',
        height: 400,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        borderBottomWidth: 3,
        borderTopWidth: 3,
        borderColor: '#FFD006'
    },

    user: {
        backgroundColor: '#033B86',
        color: 'white',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        overflow: 'hidden',
        borderColor: '#033B86',
        backgroundColor: '#033B86'
    },
    topIntroText: {
        textAlign: 'center',
        color: '#033B86',
        fontWeight: 'bold',
        marginTop: 50,
        fontSize: 20
    },
    introText: {
        textAlign: 'center',
        color: '#033B86',
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 16
    },
    bottomIntroText: {
        textAlign: 'center',
        color: '#033B86',
        fontWeight: 'bold',
    },
    houseName: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 50,
        color: '#ff841f',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
    },
    loader: {
        resizeMode: 'contain',
        marginTop: 20,
        width: 40,
        height: 40,
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#033B86',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: 'orange'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }




})