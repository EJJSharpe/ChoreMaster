import React, { useEffect, useState } from 'react'
import { View, Image, TouchableOpacity, Text, Button } from 'react-native'
import Modal from 'react-native-modal';
import styles from '../screens/AddPointsScreen/styles'


export const Shuffle = () => {
    const [shuffleModal, setShuffleModal] = useState(false)
    const [skipModal, setSkipModal] = useState(false)

    const onShuffleModalPress = () => {
        setShuffleModal(!shuffleModal)
    }

    return (
        <View>
            <Modal isVisible={shuffleModal}>
                <View style={styles.modalView}>
                    <Text style={styles.instructionsText}>Instructions</Text>
                    <Text style={styles.modalText}>The Shuffle card takes one of each players chores and redistributes them between players </Text>
                    <Button onPress={onShuffleModalPress} title="OK" />
                </View>
            </Modal>
            <TouchableOpacity onPress={onShuffleModalPress}>
                <Image
                    style={{ height: 150, width: 100, resizeMode: 'contain', alignSelf: 'center', marginRight: 5, marginLeft: 5 }}
                    source={require('../images/shuffle.png')}
                />
            </TouchableOpacity>
        </View >
    );
}

export const Skip = () => {
    const [skipModal, setSkipModal] = useState(false)
    const onSkipModalPress = () => {
        setSkipModal(!skipModal)
    }
    return (
        <View>
            <Modal isVisible={skipModal}>
                <View style={styles.modalView}>
                    <Text style={styles.instructionsText}>Instructions</Text>
                    <Text style={styles.modalText}>The Skip card allows you to miss this turn without completely withdrawing from the game.If you like the look of your current tasks, it might be time to use this one! </Text>
                    <Button onPress={onSkipModalPress} title="OK" />
                </View>
            </Modal>
            <TouchableOpacity onPress={onSkipModalPress} style={{}}>
                <Image
                    style={{ height: 150, width: 100, resizeMode: 'contain', alignSelf: 'center', marginRight: 5, marginLeft: 5 }}
                    source={require('../images/skip.png')}
                />
            </TouchableOpacity>
        </View>
    );
}