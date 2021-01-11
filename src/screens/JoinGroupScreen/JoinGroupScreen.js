import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import styles from './styles'
import * as api from '../../firebase/firebaseAPI'

export default function JoinGroupScreen({ navigation, route }) {

    const [groupName, setGroupName] = useState('')

    const onJoinGroupSubmit = () => {
        const { user } = route.params;
<<<<<<< HEAD
        api.addUserToHouse(groupCode, user.id, user.fullName)
=======

        api.addUserToHouse(groupName, user.id, user.fullName)
>>>>>>> master
            .then(userId => {
                navigation.navigate('Lobby', { user, groupName })
            })
    }

    return (
        <View>
            <TextInput style={styles.input}
                placeholder='Enter code from host to join group'
                onChangeText={(text) => setGroupName(text)}
                value={groupName} />
            <TouchableOpacity style={styles.button} onPress={() => { onJoinGroupSubmit() }}><Text style={styles.buttonTitle}>Join</Text></TouchableOpacity>
        </View>
    )
}
