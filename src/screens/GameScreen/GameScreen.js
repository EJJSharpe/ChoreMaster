import React, { useState, useEffect } from "react";
import styles from "./styles";
import * as api from "../../firebase/firebaseAPI";
import { firebase } from "../../firebase/config";
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Button,
} from "react-native";
import { Shuffle, Swap, Skip } from '../../components/inGameWildcards'

export default function GameScreen({ route }) {
    console.log(route.params.user);

    const [gameOver, setGameOver] = useState(false)
    const [userTasks, setUserTasks] = useState([]);
    const [wildCards, setWildCards] = useState([]);
    const [isUserTurn, setIsUserTurn] = useState(false);

    const { user, groupName } = route.params;

    useEffect(() => {
        // api request for house doc, users array, store as variable
        // on snapshot for the finished array
        // when finished.length === userArray.length + 1
        // set houseStage to be home
        console.log(user.id)

        // watches user's tasks
        firebase
            .firestore()
            .collection("houses")
            .doc(user.houseId)
            .collection("tasks")
            .where("userId", "==", user.id)
            .onSnapshot((snapshot) =>
                setUserTasks(snapshot.docs.map((doc) => doc.data()))
            );

        // watches user's wildcards
        firebase
            .firestore()
            .collection("users")
            .doc(user.id)
            .onSnapshot(
                (snapshot) => {
                    console.log(snapshot.data())
                    setWildCards(snapshot.data().wildcards)
                }
            );

        // watches current turn user
        firebase
            .firestore()
            .collection("houses")
            .doc(user.houseId)
            .onSnapshot((snapshot) => {
                const houseFields = snapshot.data();

                console.log("Current turn: ", houseFields.currentTurnUser)
                if (houseFields.currentTurnUser === user.fullName && !isUserTurn) {
                    setIsUserTurn(true);
                }
                if (houseFields.currentTurnUser !== user.fullName && isUserTurn) {
                    setIsUserTurn(false);
                }
                if (houseFields.finishedUsers.length - 1 === houseFields.users.length) {
                    // if all users are in finished array, return false
                    setGameOver(true);
                }
            });

    }, []);

    // TODO add an indicator of who's turn it is

    const pressDone = () => {
        // add users name to finished array
        // increment turn
        api.incrementTurnUser(groupName);
        api.setUserFinished(groupName, user.fullName)
    };

    const turnText = isUserTurn ? "your turn" : "wait your turn";

    return (
        <View style={styles.pageContainer}>
            <Text style={styles.heading}> Your Tasks</Text>
            <ScrollView style={styles.taskSectionContainer}>
                {
                    userTasks.map(({ name, points }, index) => {
                        console.log(index, '<tasks')
                        return (
                            <View key={index} style={styles.taskContainer}>
                                <Text style={styles.task}>{name}</Text>
                                <Text style={styles.points}>{points}</Text>
                            </View>
                        );
                    })
                }
            </ScrollView>

            <Text style={styles.heading}>WildCards Available</Text>
            <ScrollView style={styles.outerCardsContainer}>
                <View style={styles.cardsContainer}>
                    {wildCards.map((wildcard, index) => {
                        if (wildcard === 'shuffle') return <Shuffle key={index} index={index} groupName={groupName} userId={user.id} />
                        if (wildcard === 'swap') return <Swap key={index} index={index} groupName={groupName} userId={user.id} />
                        if (wildcard === 'skip') return <Skip key={index} index={index} userId={user.id} />
                    })}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={pressDone}>
                <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
        </View >
    );
}