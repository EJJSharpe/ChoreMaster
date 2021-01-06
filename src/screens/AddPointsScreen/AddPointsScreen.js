import React, { useState, useEffect } from 'react';
import styles from './styles.js'
import { Text, View, TouchableOpacity, TextInput, ScrollView, Button } from 'react-native'
import Modal from 'react-native-modal';

export default function AddPointsScreen({ navigation, route }) {

    const [tasksList, setTasksList] = useState(route.params.tasksList)
    const [totalPoints, setTotalPoints] = useState(tasksList.length * 2)
    const [fixedPoints, setFixedPoints] = useState(totalPoints)
    const [isModalVisible, setModalVisible] = useState(false)

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }

    useEffect(() => {
        toggleModal()
    }, [])

    const onPointsChange = (index, text) => {
        const newTasks = [...tasksList]
        if (text === '') {
            console.log(newTasks[index].points)
            newTasks[index].points === 0
        } else newTasks[index].points === parseInt(text)
        setTasksList(newTasks)
    }

    return (
        <ScrollView>
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Allocate the points given to each task. Harder tasks should be given a high value and easier tasks should be given a low value</Text>
                    <Button title="OK" onPress={toggleModal} />
                </View>
            </Modal>
            <Text>Points Remaining: {totalPoints}</Text>
            {tasksList.map(({ task, points }, index) => {
                return (
                    <View key={index} style={styles.taskContainer}>
                        <Text style={styles.task}>{task}</Text>
                        <TextInput keyboardType='number-pad' style={styles.numInput} value={points} onChangeText={(text) => { onPointsChange(index, text) }}></TextInput>
                    </View>
                )
            })}
            <TouchableOpacity style={styles.button} onPress={() => { onSubmit() }}><Text style={styles.buttonTitle}>Done</Text></TouchableOpacity>
        </ScrollView >
    )
}