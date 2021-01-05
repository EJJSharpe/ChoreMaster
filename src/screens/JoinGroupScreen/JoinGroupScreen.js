import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import styles from './styles'

export default function JoinGroupScreen({ navigation }) {

    const [groupCode, setGroupCode] = useState('')

    const onJoinGroupSubmit = () => {
        // SHOULD JOIN THE CURRENT USER TO THE GROUP WITH THE GROUP CODE SUPPLIED
        // SHOULD REDIRECT TO NEXT PAGE
        navigation.navigate('AddTasks')
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