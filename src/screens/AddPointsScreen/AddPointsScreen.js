import React, { useState, useEffect } from 'react';
import styles from './styles.js'
import { Text, View, TouchableOpacity, TextInput, ScrollView, Button } from 'react-native'
import Modal from 'react-native-modal';

export default function AddPointsScreen({ navigation, route }) {

    const [tasksList, setTasksList] = useState(route.params.tasksList)
    const [isModalVisible, setModalVisible] = useState(false)
    const [pointsLeft, setPointsLeft] = useState(tasksList.length * 2)

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }
 const onSubmit =() =>{
     navigation.navigate('GameScreen')
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
        <ScrollView>
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Allocate the points given to each task. Harder tasks should be given a high value and easier tasks should be given a low value</Text>
                    <Button title="OK" onPress={toggleModal} />
                </View>
            </Modal>
            <Text>Points Remaining: {pointsLeft}</Text>
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
        </ScrollView >
    )
}