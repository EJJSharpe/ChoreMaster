import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import styles from './styles'
import * as api from '../../firebase/firebaseAPI'

export default function JoinGroupScreen({ navigation, route }) {

    const [groupCode, setGroupCode] = useState('')

    const onJoinGroupSubmit = () => {
        const { user } = route.params;
<<<<<<< HEAD
        api.addUserToHouse(groupCode, user.id, user.fullName)
=======
        api.addUserToHouse(groupCode, user.fullName)
>>>>>>> 519bd5ff4817433b1c6bac06ed5fa689a4ca3fc8
            .then(userId => {
                api.getHouseFields(groupCode).then(houseData => {
                    navigate.navigate('Lobby', { user, houseData })
                })
            })
    }

    return (
        <View>
            <TextInput style={styles.input}
                placeholder='Enter code from host to join group'
                onChangeText={(text) => setGroupCode(text)}
                value={groupCode} />
            <TouchableOpacity style={styles.button} onPress={() => { onJoinGroupSubmit() }}><Text style={styles.buttonTitle}>Join</Text></TouchableOpacity>
        </View>
    )
}