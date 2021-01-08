import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native'
import style from './styles'
import * as api from '../../firebase/firebaseAPI'
import { firebase } from '../../firebase/config'




export default function LobbyScreen({ navigation, route }) {

    const [houseUsers, setHouseUsers] = useState(['elliot', 'aaron'])
    const [houseName, setHouseName] = useState('Testing again')
    const { user } = route.params.user;


    useEffect(() => {
        api.getHouseData(user.houseId).then(houseData => {
            if (houseData.tasksAssigned) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Home", params: user }],
                });
            } else {
                setHouseName(houseData.house)
            }

            const houseDoc = firebase.firestore().collection('houses').doc(houseData.house);
            console.log(houseName)
            const tasksObserver = houseDoc.onSnapshot(doc => {
                const { users } = doc.data()
                console.log(users)
                setHouseUsers(users);
            }, err => {
                console.log(`Encountered error: ${err}`);
            });

            return tasksObserver;
        })
    }, [])



    if (user.host === true) {
        return (
            <View>
                <Text>{houseName}</Text>
                <Text>Users in your group:</Text>
                {houseUsers.map(houseUser => {
                    return (
                        <Text style={style.user}>{houseUser}</Text>
                    )
                })}
                <TouchableOpacity onPress={navigation.navigate('AddTasks', { groupName })}><Text>Ok</Text></TouchableOpacity>
            </View>
        )
    } else {
        return (
            <View>
                <Text>House Name: {houseName}</Text>
                <Text>Users in your group:</Text>
                {houseUsers.map(houseUser => {
                    console.log(houseUser)
                    return (
                        <Text style={style.user}>{houseUser}</Text>
                    )
                })}
                <Text>The game will begin when the host presses continue</Text>
            </View>
        )
    }
    // VERIFY IF USER IS HOST OR NOT
    // NEED TO DISPLAY HOUSE NAME WHICH OTHER USERS CAN USE TO JOIN
    // NEED TO DISPLAY USERS CURRENTLY IN HOUSE, LIVE UPDATING
}