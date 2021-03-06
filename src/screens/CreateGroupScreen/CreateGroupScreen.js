import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import styles from './styles'
import * as api from '../../firebase/firebaseAPI'
import { useRef } from 'react'

export default function CreateGroupScreen({ navigation, route }) {

    const [groupName, setGroupName] = useState('')
    const { user } = route.params
    const onCreateGroupSubmit = () => {
        if (groupName != '') {
            api.createHouse(groupName, user.id, user.fullName)
            user.host = true;
            user.houseId = groupName;
            navigation.navigate('Lobby', { user, groupName })
        } else {
            alert('Invalid group name')
        }
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder='Enter house name'
                onChangeText={(text) => setGroupName(text)}
                value={groupName} />
            <TouchableOpacity style={styles.button} onPress={() => { onCreateGroupSubmit() }}><Text style={styles.buttonTitle}>Create</Text></TouchableOpacity>

        </View>
    )
}