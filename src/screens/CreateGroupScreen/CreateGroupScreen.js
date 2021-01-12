import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import styles from './styles'
import * as api from '../../firebase/firebaseAPI'
import { useRef } from 'react'

export default function CreateGroupScreen({ navigation, route }) {

    const [groupName, setGroupName] = useState('')

    const onCreateGroupSubmit = () => {
        const { user } = route.params
        console.log(route.params)

        api.createHouse(groupName, user.id, user.fullName)
        user.host = true;
        navigation.navigate('Lobby', { user, groupName })

    }

    return (
        <View>
            <TextInput style={styles.input}
                placeholder='Enter group name'
                onChangeText={(text) => setGroupName(text)}
                value={groupName} />
            <TouchableOpacity style={styles.button} onPress={() => { onCreateGroupSubmit() }}><Text style={styles.buttonTitle}>Create</Text></TouchableOpacity>

        </View>
    )
}