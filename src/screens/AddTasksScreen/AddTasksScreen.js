import React, { useState, useEffect } from 'react';
import styles from './styles.js'
import { Text, SafeAreaView, TouchableOpacity, TextInput, List, Button, View, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

export default function AddTasksScreen({ navigation }) {
    const [taskInput, setTaskInput] = useState('')
    const [tasksList, setTasksList] = useState([])
    const [isModalVisible, setModalVisible] = useState(false)
    const { user, groupName } = route.params;

    const { user, groupName } = route.params;

    const onAddTaskPress = (task) => {
        setTasksList(otherTasks => [...otherTasks, { task, points: 0 }])
        setTaskInput('')
    }
    const onSubmit = () => {
        navigation.navigate('AddPoints', { tasksList, user, groupName })
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }

    useEffect(() => {
        toggleModal()
    }, [])


    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalView}>
                    <Text style={styles.instructionsText}>Instructions</Text>
                    <Text style={styles.modalText}>In your group think of some chores that are shared between you and add them to the list.  We recommend 2 tasks per person but a few less or more is fine!</Text>
                    <Button title="OK" onPress={toggleModal} />
                </View>
            </Modal>
            <Text style={styles.header}>Add some chores!</Text>
            {tasksList.map(({ task }, index) => {
                return (
                    <View>
                        <Text key={index} style={styles.task}>{task}</Text>
                    </View>
                )
            })}
            <TextInput placeholder='Enter chore here..' style={styles.input} value={taskInput} onChangeText={(text) => { setTaskInput(text) }}></TextInput>
            <TouchableOpacity style={styles.button} onPress={() => { onAddTaskPress(taskInput) }}><Text style={styles.buttonTitle}>Add</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { onSubmit() }}><Text style={styles.buttonTitle}>Done</Text></TouchableOpacity>
        </ScrollView >
    );
};