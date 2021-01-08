import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native'
import styles from './styles'
import * as api from '../../firebase/firebaseAPI'




export default function LobbyScreen({ navigation, route }) {

    useEffect(() => {
        const { user } = route.params.user;

    }, [])

    const navigateToTasks = () => {
        const { newHouse, user } = route.params;

        // possibly need to update the house info on navigate
        // navigation.navigate('AddTasks', { groupName })
    }
    // VERIFY IF USER IS HOST OR NOT
    // NEED TO DISPLAY HOUSE NAME WHICH OTHER USERS CAN USE TO JOIN
    // NEED TO DISPLAY USERS CURRENTLY IN HOUSE, LIVE UPDATING

    return <View><Text>LobbyScreen</Text></View>
}