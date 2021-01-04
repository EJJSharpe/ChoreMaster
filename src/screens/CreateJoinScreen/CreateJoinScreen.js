import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

export default function CreateJoinScreen({ navigation }) {
    const onCreateGroupPress = () => {
        navigation.navigate('CreateGroup')

    }

    return (
        <View>
            <TouchableOpacity onPress={() => { onCreateGroupPress() }}><Text>Create Group</Text></TouchableOpacity>
            <TouchableOpacity><Text>Join Group</Text></TouchableOpacity>
        </View>
    )
}