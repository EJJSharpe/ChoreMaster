import React, { useState } from 'react'
import { View, Text, Button, TouchableOpacity, Image, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import * as api from '../firebase/firebaseAPI';
import styles from './styles'


// TASKS DONT CURRENTLY REMOVE TASK FROM WILDCARDS ARRAY
export const Shuffle = ({ index, groupName, userId, isUserTurn }) => {
    const [modal, setModal] = useState(false)
    const onPress = () => {
        if (isUserTurn) {
            api.shuffleWildcard(groupName)
            api.removeWildcardFromUser('shuffle', userId)
            api.incrementTurnUser(groupName);
            setModal(!modal)
        }
    }


    return (
        <View>
            <Modal><Text>Wildcard Used!</Text></Modal>
            <TouchableOpacity onPress={() => { onPress() }}>
                <Image
                    style={{ height: 150, width: 100, resizeMode: 'contain', alignSelf: 'center', marginRight: 5, marginLeft: 5 }}
                    source={require('../images/shuffle.png')}
                />
            </TouchableOpacity>
        </View >
    );
}

export const Swap = (props) => {
    const [modal, setModal] = useState(false)
    const [tasksList, setTasksList] = useState([])
    const [secondModal, setSecondModal] = useState(false)

    const { isUserTurn, index, groupName, userId } = props;

    const onPress = () => {
        if (isUserTurn) {
            api.getUserTasks(groupName, userId)
                .then(tasks => {
                    setTasksList(tasks)
                    setModal(!modal)
                })
        }


    }

    const onTaskSelect = (taskName) => {
        console.log(groupName, taskName, userId)
        api.swapWildcard(groupName, taskName, userId).catch(err => console.log(err))
        api.removeWildcardFromUser('skip', userId)
        api.incrementTurnUser(groupName);
        setSecondModal(false)
    }

    return (
        <View>
            <Modal isVisible={modal}>
                <View style={styles.modalView}>
                    <Text style={styles.instructionsText}>Select a task to swap</Text>
                    <ScrollView style={styles.tasksSectionContainer}>
                        {
                            tasksList.map(({ name, points, completed }, index) => {
                                return (
                                    <TouchableOpacity key={index} style={styles.taskContainer} onPress={() => { onTaskSelect(name) }}>
                                        <Text style={styles.task}>{name}</Text>
                                        <Text style={styles.pointsValue}>{points}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </Modal>

            <Modal isVisible={secondModal}>
                <View style={styles.modalView}>
                    <Text style={styles.instructionsText}>Wildcard used! Check your tasks!</Text>
                    <Button onPress={() => { setSecondModal(!secondModal) }} title="OK" />
                </View>
            </Modal>



            <TouchableOpacity onPress={onPress}>
                <Image
                    style={{ height: 150, width: 100, resizeMode: 'contain', alignSelf: 'center', marginRight: 5, marginLeft: 5 }}
                    source={require('../images/swap.png')}
                />
            </TouchableOpacity>
        </View >
    );
}

export const Skip = ({ isUserTurn, index, userId, groupName }) => {
    const [modal, setModal] = useState(false)

    const onPress = () => {
        if (isUserTurn) {
            api.removeWildcardFromUser('skip', userId)
            api.incrementTurnUser(groupName);
        }
    }


    return (
        <View>
            <Modal isVisible={modal}>
                <View style={styles.modalView}>
                    <Text style={styles.instructionsText}>Tap Ok to use the Skip Wildcard!</Text>
                    <Button onPress={() => { setModal(!modal) }} title="OK" />
                </View>
            </Modal>
            <TouchableOpacity onPress={onPress}>
                <Image
                    style={{ height: 150, width: 100, resizeMode: 'contain', alignSelf: 'center', marginRight: 5, marginLeft: 5 }}
                    source={require('../images/skip.png')}
                />
            </TouchableOpacity>
        </View >
    );
}