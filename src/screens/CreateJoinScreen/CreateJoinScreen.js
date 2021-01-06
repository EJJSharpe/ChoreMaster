import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'


export default function CreateJoinScreen({ navigation, route }) {
    const onCreateGroupPress = () => {
        navigation.navigate('CreateGroup')
    }

    const onJoinGroupPress = () => {
        navigation.navigate('JoinGroup')
    }


    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={() => { onCreateGroupPress() }}><Text style={styles.buttonTitle}>Create Group</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { onJoinGroupPress() }}><Text style={styles.buttonTitle}>Join Group</Text></TouchableOpacity>
        </View>
    )
}