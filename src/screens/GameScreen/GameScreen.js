import React, { useState, useEffect } from 'react';
import styles from './styles'
import { Text, View, TouchableOpacity, TextInput, ScrollView, Button } from 'react-native'
import Modal from 'react-native-modal';

export default function GameScreen() {


    const [userTasks, setUserTasks] = useState([{ task: "clean toilet", points: 3 }, { task: 'hello', points: 2 }, { task: "bins", points: 1 }])
    const [wildCards, setWildCards] = useState([{ name: 'shuffle', used: false }, { name: 'skip', used: false }, { name: 'swap', used: false }])
    const [isUserTurn, setIsUserTurn] = useState(false)

    const onWildCardPress = (name, used, index) => {
        const newWildCards = [...wildCards]
        newWildCards[index].used = !used;
        setWildCards(newWildCards)
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
                        <Text style={styles.task}>{task}</Text>
                        <Text style={styles.points}>{points}</Text>
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