import React, { useState, useEffect } from 'react';
import styles from './styles.js'
import { Text, View, TouchableOpacity, TextInput, ScrollableView, } from 'react-native';
import Modal from 'react-native-modal'; 

export default function AddTasksScreen({ navigation }) {
    const [taskInput, setTaskInput] = useState('')
    const [tasksList, setTasksList] = useState([])

    const onAddTaskPress = (newTask) => {
        setTasksList(otherTasks => [...otherTasks, newTask])
        setTaskInput('')
    }
const onSubmit=()=>
{
navigation.navigate('AddPoints',{tasksList})
}

    return (
        <View>

            {tasksList.map(task => {
                return (
                    <View>
                        <View style={styles.taskText}>
                            <Text key ={tasksList.index}style={styles.task}>{task}</Text>
                        </View>
                        <TouchableOpacity><Text>Delete</Text></TouchableOpacity>
                    </View>
                )
            })}

            <TextInput placeholder='Enter chore here..' style={styles.input} value={taskInput} onChangeText={(text) => { setTaskInput(text) }}></TextInput>
            <TouchableOpacity style={styles.button} onPress={() => { onAddTaskPress(taskInput) }}><Text style={styles.buttonTitle}>Add</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {onSubmit()} }><Text style={styles.buttonTitle}>Done</Text></TouchableOpacity>
        </View>
    );
};