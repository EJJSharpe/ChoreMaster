import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import * as api from '../../firebase/firebaseAPI'
import { firebase } from '../../firebase/config'




export default function LobbyScreen({ navigation, route }) {

    const [houseUsers, setHouseUsers] = useState([])
    const [houseName, setHouseName] = useState('')
    const { user, groupName } = route.params;


    //LISTENER FOR USERS JOINING GROUP
    useEffect(() => {


        api.getHouseData(groupName)
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
                    setHouseUsers(users);
                }, err => {
                    console.log(`Encountered error: ${err}`);
                });

                return tasksObserver;
            })
    }, [])



    // NON HOST USER LISTENING FOR HOUSESTAGE TO CHANGE
    useEffect(() => {
        if (!user.host) {
            const doc = firebase.firestore().collection('houses').doc(groupName);

            const gameStageObserver = doc.onSnapshot(docSnapshot => {
                const { houseStage } = docSnapshot.data()
                if (houseStage === 'game') {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Game", params: { user, groupName } }],
                    });
                }
            }, err => {
                console.log(`Encountered error: ${err}`);
            });

            return gameStageObserver;
        }
    })



    if (user.host) {
        return (
            <View style={styles.lobbyContainer}>
                <Text style={styles.topIntroText}>Your house name is...</Text>
                <Text style={styles.houseName}>{houseName}</Text>
                <View style={styles.usersContainer}>
                    <Text style={styles.introText}>Users in your group:</Text>
                    {houseUsers.map((houseUser, index) => {
                        return (
                            <View key={index}>
                                <Text style={styles.user}>{"👤    " + houseUser}</Text>
                            </View>
                        )
                    })}
                </View>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('AddTasks', { groupName, user }) }}>
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