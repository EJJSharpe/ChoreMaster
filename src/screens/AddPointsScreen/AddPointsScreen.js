import React, { useState, useEffect } from 'react';
import styles from './styles.js'
import { Text, View, TouchableOpacity, TextInput, ScrollView, Button } from 'react-native'
import Modal from 'react-native-modal';
import * as API from '../../firebase/firebaseAPI'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function AddPointsScreen({ navigation, route }) {

    const [tasksList, setTasksList] = useState(route.params.tasksList)
    const [isModalVisible, setModalVisible] = useState(false)
    const [pointsLeft, setPointsLeft] = useState(tasksList.length * 2)
    const { user, groupName } = route.params;

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }
    const onSubmit = async () => {
        // uploads tasks to database, shares out tasks and wildcards
        API.createMultipleTasks(groupName, tasksList);
        await API.shareOutWildcards(groupName);
        await API.shareOutTasks(groupName);
        API.setHouseStage(groupName, 'game')


        console.log(tasksList)
        navigation.navigate('Game', { user, groupName })
    }

    useEffect(() => {
        toggleModal()
    }, [])

    const onPointsChange = (index, text) => {
        const newTasks = [...tasksList]
        newTasks[index].points = text;
        setTasksList(newTasks)
    }

    const onPointsBlur = () => {
        let pointsUsed = 0;
        const totalPoints = tasksList.length * 2;
        tasksList.map(task => {
            if (task.points !== '') {
                pointsUsed += parseInt(task.points);
            } else {
                pointsUsed += 0
            }
        })
        setPointsLeft(totalPoints - pointsUsed)
    }

    return (
        <KeyboardAwareScrollView extraHeight={300} style={styles.container} keyboardShouldPersistTaps='handled'>
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalView}>
                    <Text style={styles.instructionsText}>Instructions</Text>
                    <Text style={styles.modalText}>Allocate the points given between the chores, giving each chore a maximum of 3 points. Make sure to give the hardest tasks the most point and the easiest tasks the least! </Text>
                    <Button title="OK" onPress={toggleModal} />
                </View>
            </Modal>
            <Text style={styles.pointsRemaining}>Points Remaining: {pointsLeft}</Text>
            {tasksList.map(({ task, points }, index) => {
                return (
                    <View key={index} style={styles.taskContainer}>
                        <Text style={styles.task}>{task}</Text>
                        <TextInput placeholder='0'
                            keyboardType='number-pad'
                            style={styles.numInput}
                            value={points}
                            onBlur={() => { onPointsBlur() }}
                            onChangeText={(text) => { onPointsChange(index, text) }}></TextInput>
                    </View>
                )
            })}
            <TouchableOpacity style={styles.button} onPress={() => { onSubmit() }}><Text style={styles.buttonTitle}>Done</Text></TouchableOpacity>
        </KeyboardAwareScrollView >
    )
}