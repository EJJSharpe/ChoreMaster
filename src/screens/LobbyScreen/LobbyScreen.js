import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import * as api from '../../firebase/firebaseAPI'
import { firebase } from '../../firebase/config'




export default function LobbyScreen({ navigation, route }) {

    const [houseUsers, setHouseUsers] = useState([])
    const [houseName, setHouseName] = useState('')
    const { user } = route.params.user;



    useEffect(() => {
        api.getHouseData(user.houseId)
            .then(houseData => {
                console.log(houseData)
                if (houseData.tasksAssigned) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Home", params: user }],
                    });
                } else {
                    console.log(houseData)
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



    if (user.host) {
        return (
            <View style={styles.lobbyContainer}>
                <Text style={styles.topIntroText}>Your house name is...</Text>
                <Text style={styles.houseName}>{houseName}</Text>
                <View style={styles.usersContainer}>
                    <Text style={styles.introText}>Users in your group:</Text>
                    {houseUsers.map(houseUser => {
                        console.log(houseUser)
                        return (
                            <View>

                                <Text style={styles.user}>{"👤    " + houseUser}</Text>
                            </View>
                        )
                    })}
                </View>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('AddTasks', { houseName }) }}>
                    <Text style={styles.buttonText}>Ok</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <View style={styles.lobbyContainer}>
                <Text style={styles.topIntroText}>Your house name is...</Text>
                <Text style={styles.houseName}>{houseName}</Text>
                <View style={styles.usersContainer}>
                    <Text style={styles.introText}>Users in your group:</Text>
                    {houseUsers.map(houseUser => {
                        console.log(houseUser)
                        return (
                            <View>

                                <Text style={styles.user}>{"👤    " + houseUser}</Text>
                            </View>
                        )
                    })}
                </View>
                <Image
                    source={require('../../images/ellipsis.gif')}
                    style={styles.loader}
                />
                <Text style={styles.bottomIntroText}>Waiting for host to continue...</Text>

            </View>
        )
    }
}