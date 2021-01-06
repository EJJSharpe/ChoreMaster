import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import styles from './styles'

export default function CreateGroupScreen({ navigation }) {

    const [groupName, setGroupName] = useState('')

    const onCreateGroupSubmit = () => {
        // INSERT FUNCTIONALITY TO CREATE A NEW GROUP HERE AND ADD THE CURRENT USER TO IT
        // ALSO NEEDS TO DISPLAY A CODE OR SOME SORT OF LINK THAT CAN BE GIVEN TO OTHER USERS TO JOIN
        navigation.navigate('AddTasks', { groupName })
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