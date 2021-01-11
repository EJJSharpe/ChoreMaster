import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'


export default function CreateJoinScreen({ navigation, route }) {
    const onCreateGroupPress = () => {
        const { user } = route.params;
        console.log(user)
        navigation.navigate('CreateGroup', user)
    }

    const onJoinGroupPress = () => {
        const { user } = route.params
        navigation.navigate('JoinGroup', user)
    }


    return (
        <View>
            <TouchableOpacity style={styles.buttonTop} onPress={() => { onCreateGroupPress() }}><Text style={styles.buttonTitle}>Create Group</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { onJoinGroupPress() }}><Text style={styles.buttonTitle}>Join Group</Text></TouchableOpacity>
        </View>
    )
}