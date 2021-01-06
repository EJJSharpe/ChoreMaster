import { StyleSheet } from 'react-native'
export default StyleSheet.create({

    task: {
        height: 48,
        borderRadius: 5,
        backgroundColor: 'black',
        flex: 5,
        color: 'white',
        

    },
    taskBox: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'red',
    },
    points: {
       flex: 1,
        backgroundColor: 'blue',
    },
    innerBox: {
    flexDirection: 'row',
    flex: 1,
    }
})