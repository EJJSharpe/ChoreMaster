import React, { useState, useEffect } from 'react';
import styles from './styles.js'
import { Text, View, TouchableOpacity, TextInput, ScrollableView } from 'react-native'

export default function AddPointsScreen({ navigation, route }) {

    const { tasksList } = route.params;
    console.log(tasksList, 'ht')
    return (
        <View>
            { tasksList.map(task => {
                return (
                    <View>
                    
                        <Text key={tasksList.index}>{task}</Text>
                        <TextInput keyboardType='numeric' placeholder='testing'></TextInput>
                    
                    </View>
                )
            })}
            <TouchableOpacity><Text>Submit</Text></TouchableOpacity>
        </View>
    )
}