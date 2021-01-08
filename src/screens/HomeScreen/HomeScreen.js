import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native'
import styles from './styles'
import CheckBox from 'react-native-checkbox-lite';



export default function HomeScreen() {
    const [userTasks, setUserTasks] = useState([{ task: 'wash dishes', points: 2, completed: false }, { task: 'have fun', points: 2, completed: false }, { task: 'wash dishes', points: 2, completed: false }])

    function toggleCheckBox(index, points) {
        const userTasksCopy = [...userTasks]
        userTasksCopy[index].completed = !userTasksCopy[index].completed
        // IF USERS TASK IS COMPLETED, NEED TO ADD THE ADD POINTS TO THE USERS POINTS ATTRIBUTE
        setUserTasks(userTasksCopy)
    }

    const calculatePoints = () => {
        let totalPoints = 0;
        userTasks.map(({ points, completed }) => {
            if (completed) totalPoints += points
        })
        return totalPoints;
    }

    return (
        <View>
            <Text style={styles.title}>You've earned {calculatePoints()} points this week! </Text>
            <ScrollView style={styles.tasksSectionContainer}>
                {
                    userTasks.map(({ task, points, completed }, index) => {
                        return (
                            <View key={index} style={styles.taskContainer}>
                                <Text style={styles.task}>{task}</Text>
                                <Text style={styles.pointsValue}>{points}</Text>
                                <CheckBox text={''} isChecked={completed}
                                    onPress={() => { toggleCheckBox(index, points) }}
                                    checkBoxColor={'red'}
                                    style={styles.checkbox}
                                    checkBoxSize={40} />

                            </View>
                        )
                    })
                }
            </ScrollView>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button1}><Text style={styles.buttonTitle}>Buy Random Wildcard</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button2}><Text style={styles.buttonTitle}>Your Wildcards</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.scoreboard}><Text style={styles.buttonTitle}>Scoreboard</Text></TouchableOpacity>
        </View>
    )
}   