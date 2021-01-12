import React, { useState } from 'react'
import { View, Text, Button, TouchableOpacity, Image, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import * as api from '../firebase/firebaseAPI';
import styles from './styles'

const onWildCardPress = (name, used, index) => {
    api.removeWildcardFromUser(wildCardName, user.id)



}


// TASKS DONT CURRENTLY REMOVE TASK FROM WILDCARDS ARRAY
export const Shuffle = ({ index, groupName, userId }) => {
    const [modal, setModal] = useState(false)
    const onPress = () => {
        setModal(!modal)
        api.shuffleWildcard(groupName).catch((err) => console.log(err))
        api.removeWildcardFromUser('shuffle', userId)
    }


    return (
        <View>
            <Modal isVisible={modal}>
                <View style={styles.modalView}>
                    <Text style={styles.instructionsText}>You used the Shuffle Wildcard!</Text>
                    <Button onPress={() => { setModal(!modal) }} title="OK" />
                </View>
            </Modal>
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

    const { index, groupName, userId } = props;

    const onPress = () => {
        api.getUserTasks(groupName, userId)
            .then(tasks => {
                setTasksList(tasks)
                setModal(!modal)
            })
    }

    const onTaskSelect = (taskName) => {
        console.log(groupName, taskName, userId)
        api.swapWildcard(groupName, taskName, userId).catch(err => console.log(err))
        setModal(!modal)
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

export const Skip = ({ index }) => {
    const [modal, setModal] = useState(false)

    const onPress = () => {

        // NEED LOGIC HERE TO SKIP THEIR TURN AND REMOVE WILDCARD FROM THEIR WILDCARDS ARRAY
        setModal(!modal)
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