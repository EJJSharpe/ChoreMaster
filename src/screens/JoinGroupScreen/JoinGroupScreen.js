import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import styles from './styles'
import * as api from '../../firebase/firebaseAPI'

export default function JoinGroupScreen({ navigation, route }) {

    const [groupName, setGroupName] = useState('')

    const onJoinGroupSubmit = () => {
        const { user } = route.params;
        user.host = false;
        if (groupName != '') {
            api.addUserToHouse(groupName, user.id, user.fullName)
                .then(userId => {
                    navigation.navigate('Lobby', { user, groupName })
                })
        } else {
            alert("Invalid group name")
        }
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder='Enter code from host to join group'
                onChangeText={(text) => setGroupName(text)}
                value={groupName} />
            <TouchableOpacity style={styles.button} onPress={() => { onJoinGroupSubmit() }}><Text style={styles.buttonTitle}>Join</Text></TouchableOpacity>
        </View>
    )
}
