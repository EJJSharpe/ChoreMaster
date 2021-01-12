import React, { useState, useEffect } from 'react';
import styles from './styles'
import { Text, View, TouchableOpacity, TextInput, ScrollView, Button } from 'react-native'
import Modal from 'react-native-modal';
import * as API from '../../firebase/firebaseAPI'
import modal from 'react-native-modal'

export default function GameScreen() {
    const [userTasks, setUserTasks] = useState([{ task: "clean toilet", points: 3 }, { task: 'hello', points: 2 }, { task: "bins", points: 1 }])
    const [wildCards, setWildCards] = useState([{ name: 'shuffle', used: false }, { name: 'skip', used: false }, { name: 'swap', used: false }])
    const [isUserTurn, setIsUserTurn] = useState(false)
    const { user, groupName } = route.params;

    const onWildCardPress = (name, used, index) => {
        // call wildcard function
        const newWildCards = [...wildCards]
        newWildCards[index].used = !used;

        //remove from state array and api
        newWildCards.splice(index, 1);
        API.removeWildcardFromUser(name, user.id)
        setWildCards(newWildCards)

        // end turn???

    }


    const toggleTurn = () => {
        setIsUserTurn(!isUserTurn)
    }

    const turnText = isUserTurn ? "your turn" : "wait your turn";

    return (
        <ScrollView>
            <Text style={styles.heading}> Your allocated Tasks</Text>
            {userTasks.map(({ task, points }, index) => {
                return (
                    <View key={index} style={styles.taskContainer}>
                        <TouchableOpacity style={styles.task} onPress={() => { onTaskSelect(task), groupName, user.id }}>{task}</TouchableOpacity>
                        <TouchableOpacity style={styles.points}>{points}</TouchableOpacity>
                    </View>
                )
            })}

            <Text style={styles.heading}>WildCards Available:</Text>
            {wildCards.map(({ name, used }, index) => {
                return (
                    <View key={index} style={styles.cardContainer}>
                        <TouchableOpacity style={styles.card} onPress={() => { onWildCardPress(name, used, index) }}><Text>{name}</Text></TouchableOpacity>
                    </View>
                )
            })}

            <TouchableOpacity style={styles.button} ><Text>Pass</Text></TouchableOpacity>
            <TouchableOpacity onPress={toggleTurn}><Text style={styles.turnText}>{turnText}</Text></TouchableOpacity>
        </ScrollView>
    )
}
