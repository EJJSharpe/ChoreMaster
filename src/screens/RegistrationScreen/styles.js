import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ff841f'
    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        borderColor: '#FFD006',
        borderWidth: 2
    },
    inputTop: {
        height: 48,
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        borderColor: '#FFD006',
        borderWidth: 2
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
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: '#FFD006',
        fontWeight: "bold",
        fontSize: 16
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})