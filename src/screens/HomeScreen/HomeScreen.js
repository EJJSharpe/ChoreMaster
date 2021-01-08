import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native'
import styles from './styles'
import CheckBox from 'react-native-checkbox-lite';
import * as api from '../../firebase/firebaseAPI'



export default function HomeScreen({ navigation, route }) {
    const [userTasks, setUserTasks] = useState([{ name: 'wash dishes', points: 2, completed: false }, { task: 'have fun', points: 2, completed: false }, { task: 'wash dishes', points: 2, completed: false }])

    useEffect(() => {
        const { user, houseData } = route.params;
        console.log(route.params)

        // if (houseData.tasksAssigned === false) {
        //     navigation.reset({
        //         index: 0,
        //         route: [{ name: 'Home', params: { user, houseData } }]
        //     })
        // } else {
        //     api.getUserTasks(houseData.name, user.id).then(tasks => {
        //         setUserTasks(tasks)
        //     })
        // }
    }, [])

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

    const buyWildcard = () => {

    }

    return (
        <View>
            <Text style={styles.title}>You've earned {calculatePoints()} points this week! </Text>
            <ScrollView style={styles.tasksSectionContainer}>
                {
                    userTasks.map(({ name, points, completed }, index) => {
                        return (
                            <View key={index} style={styles.taskContainer}>
                                <Text style={styles.task}>{name}</Text>
                                <Text style={styles.pointsValue}>{points}</Text>
                                <CheckBox text={''} isChecked={completed}
                                    onPress={() => { toggleCheckBox(index, points) }}
                                    checkBoxColor={'red'}
                                    style={styles.checkbox}
                                    // make it so task cannot be unchecked
                                    checkBoxSize={40} />

                            </View>
                        )
                    })
                }
            </ScrollView>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button1}><Text style={styles.buttonTitle} onPress={() => { buyWildcard() }}>Buy Random Wildcard</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button2}><Text style={styles.buttonTitle}>Your Wildcards</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.scoreboard}><Text style={styles.buttonTitle}>Scoreboard</Text></TouchableOpacity>
        </View>
    )
}   