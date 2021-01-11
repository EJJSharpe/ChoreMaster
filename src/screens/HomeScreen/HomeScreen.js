import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native'
import styles from './styles'
import CheckBox from 'react-native-checkbox-lite';
import * as api from '../../firebase/firebaseAPI'



export default function HomeScreen({ navigation, route }) {
    const [userTasks, setUserTasks] = useState([{ name: 'wash dishes', points: 2, completed: false }, { task: 'have fun', points: 2, completed: false }, { task: 'wash dishes', points: 2, completed: false }])


    // MAKE SURE ANY USER DATA COMES FROM ROUTE PARAMS
    const { user } = route.params;
    // const user =
    // {
    //     email: 'ejjsharpe@gmail.com',
    //     name: 'Elliot Sharpe',
    //     host: true,
    //     houseId: 'Hello',
    //     id: 'PmtEISirf7eo5QuRqvi74twPp7V2',
    //     points: 0,
    //     wildcards: ['skip', 'shuffle'],
    // }

    useEffect(() => {
        // do a request for the users tasks
        // possibly format them into the correct structure
        // setState with those tasks
        api.getUserTasks(user.houseId, user.id).then((currentUsersTasks) => {
            setUserTasks(currentUsersTasks)
        })
    }, [])

    function completeTask(index) {
        const userTasksCopy = [...userTasks]
        if (!userTasksCopy[index].completed) {
            userTasksCopy[index].completed = true
            console.log(userTasksCopy[index])
            setUserTasks(userTasksCopy)
        }

        // NEEDS TO COMMUNICATE WITH THE SERVER AND MARK THAT TASK AS DONE AND INCREASE USERS POINTS
    }


    const calculatePoints = () => {
        let totalPoints = 0;
        userTasks.map(({ points, completed }) => {
            if (completed) totalPoints += points
        })
        return totalPoints;
    }

    const buyWildcard = () => {
        // makes random number between 0 and 3, can be increased
        const randomNumber = Math.floor(Math.random() * 5)
        const wildcardsArray = ['shuffle', 'skip', 'swap', 'double']
        const wildCardToAdd = wildCardsArray[randomNumber]

        // NEED A FUNCTION HERE TO ADD THIS TO USERS WILDCARDS ARRAY
    }

    const showUsersWildcards = () => {
        navigation.navigate('UserWildcards', { user })
    }

    return (

        <View style={styles.container}>
            <Text style={styles.title}>You've earned {calculatePoints()} points this week! </Text>
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
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button1} onPress={buyWildcard}><Text style={styles.buttonTitle}>Buy Random Wildcard</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={showUsersWildcards}><Text style={styles.buttonTitle}>Your Wildcards</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.scoreboard}><Text style={styles.buttonTitle}>Scoreboard</Text></TouchableOpacity>
        </View >
    )
}   