import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    lobbyContainer: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 20,
    },
    usersContainer: {
        backgroundColor: 'white',
        height: 400,
        marginLeft: 30,
        marginRight: 30,
        borderBottomWidth: 4,
        borderTopWidth: 4,
        borderColor: '#ff841f'
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
        backgroundColor: '#033B86',
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
        marginBottom: 20,
    },
    button: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#ff841f',
        borderWidth: 2,
        borderColor: '#FFD006',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }




})