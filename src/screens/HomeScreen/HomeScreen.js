import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Button, Image } from 'react-native'
import styles from './styles'
import CheckBox from 'react-native-checkbox-lite';
import * as api from '../../firebase/firebaseAPI'
import Modal from 'react-native-modal';
import firebase from 'firebase'
import { Shuffle, Skip, Swap } from '../../components/wildcards'



export default function HomeScreen({ navigation, route }) {
    const [userTasks, setUserTasks] = useState([{ name: 'wash dishes', points: 2, completed: false }, { task: 'have fun', points: 2, completed: false }, { task: 'wash dishes', points: 2, completed: false }])
    const [userPoints, setUserPoints] = useState(0)
    const [modal, setModal] = useState(false)
    const [modalText, setModalText] = useState('')
    const [newCard, setNewCard] = useState('')

    // MAKE SURE ANY USER DATA COMES FROM ROUTE PARAMS
    const { user, groupName, gameJustPlayed } = route.params;

    useEffect(() => {
        if (gameJustPlayed) {//gameJustPlayed) {
            api.setAssignTime(groupName);
            // TESTING - REMOVE
            api.getHouseFields(groupName)
                .then(data => {
                    console.log(data.lastStart)
                })


            api.setHouseStage(groupName, 'home');
        }

        api.getUserTasks(user.houseId, user.id).then((currentUsersTasks) => {
            setUserTasks(currentUsersTasks)
        })
        const doc = firebase.firestore().collection('users').doc(user.id);

        const observer = doc.onSnapshot(docSnapshot => {
            setUserPoints(docSnapshot.data().points);
            // ...
        }, err => {
            console.log(`Encountered error: ${err}`);
        });

        return observer;

    }, [])

    function completeTask(index) {
        const userTasksCopy = [...userTasks]
        if (!userTasksCopy[index].completed) {
            userTasksCopy[index].completed = true
            api.completeTask(groupName, userTasksCopy[index].name).catch(err => console.log(err))
            setUserTasks(userTasksCopy)
        }

        // NEEDS TO COMMUNICATE WITH THE SERVER AND MARK THAT TASK AS DONE AND INCREASE USERS POINTS
    }


    const calculatePoints = () => {
        let totalPoints = 0;
        userTasks.map(({ points, completed }) => {
            if (completed) totalPoints += parseInt(points)
        })
        return totalPoints;
    }

    const buyWildcard = () => {
        // makes random number between 0 and 3, can be increased
        const randomNumber = Math.floor(Math.random() * 3)
        console.log(randomNumber)
        const wildcardsArray = ['shuffle', 'skip', 'swap']
        const wildcardToAdd = wildcardsArray[randomNumber]

        if (userPoints >= 1) {
            // -1 from the users points
            api.incrementUserPoints(user.id, -1)
            console.log(user.id)
            api.addWildcardToUser(wildcardToAdd, user.id).catch(err => console.log(err))
            setNewCard(wildcardToAdd)
            setModalText(`You got the ${wildcardToAdd} wildcard!`)
            setModal(!modal)
        } else {
            setNewCard('')
            setModalText('You do not have enough points to buy a wildcard. Complete chores to earn points.')
            setModal(!modal)
        }

        // NEED A FUNCTION HERE TO ADD THIS TO USERS WILDCARDS ARRAY
    }

    const showUsersWildcards = () => {
        navigation.navigate('UserWildcards', { user })
    }

    const showLeaderboard = () => {
        navigation.navigate('Leaderboard', { user })
    }


    return (

        <View style={styles.container}>
            <Text style={styles.heading}>You have {userPoints} total points!</Text>
            <Modal isVisible={modal} style={styles.modalView} >
                <Text style={styles.modalText}>{modalText}</Text>
                {
                    newCard === 'shuffle' ? <Shuffle />
                        : newCard === 'skip' ? <Skip />
                            : newCard === 'swap' ? <Swap /> : <></>
                }
                <Button title='Ok' onPress={() => { setModal(!modal) }}></Button>
            </Modal>
            <ScrollView style={styles.tasksSectionContainer}>
                {
                    userTasks.map(({ name, points, completed }, index) => {
                        return (
                            <View key={index} style={styles.taskContainer}>
                                <Text style={styles.task}>{name}</Text>
                                <Text style={styles.pointsValue}>{points}</Text>
                                <TouchableOpacity style={completed ? styles.checked : styles.unchecked} onPress={() => { completeTask(index) }}></TouchableOpacity>

                            </View>
                        )
                    })
                }
            </ScrollView>
            <Text style={styles.title}>This week you've earned {calculatePoints()} points</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button1} onPress={buyWildcard}><Text style={styles.buttonTitle}>Buy Random Wildcard</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={showUsersWildcards}><Text style={styles.buttonTitle}>Your Wildcards</Text></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={showLeaderboard} style={styles.scoreboard}><Text style={styles.buttonTitle}>Scoreboard</Text></TouchableOpacity>
        </View >
    )
}   