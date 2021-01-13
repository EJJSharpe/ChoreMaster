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
    Image
} from "react-native";
import { Shuffle, Swap, Skip } from '../../components/inGameWildcards'


export default function GameScreen({ navigation, route }) {
    console.log(route.params.user);

    const [gameOver, setGameOver] = useState(false)
    const [userTasks, setUserTasks] = useState(["None"]);
    const [wildCards, setWildCards] = useState(["None"]);
    const [isUserTurn, setIsUserTurn] = useState(false);
    const [currUser, setCurrUser] = useState("")

    const { user, groupName } = route.params;

    useEffect(() => {
        // api request for house doc, users array, store as variable
        // on snapshot for the finished array
        // when finished.length === userArray.length + 1
        // set houseStage to be home


        // watches user's tasks
        const tasksSs = firebase
            .firestore()
            .collection("houses")
            .doc(user.houseId)
            .collection("tasks")
            .where("userId", "==", user.id)
            .onSnapshot((snapshot) => {
                console.log("Tasks snapshot");
                setUserTasks(snapshot.docs.map((doc) => doc.data()))
            }
            );

        // watches user's wildcards
        const wildcardsSs = firebase
            .firestore()
            .collection("users")
            .doc(user.id)
            .onSnapshot(
                (snapshot) => {
                    console.log("wildcards snapshot");
                    setWildCards(snapshot.data().wildcards)
                }
                // setWildCards(snapshot.docs.map((doc) => doc.data()))
            );

        // watches current turn user
        const turnUserSs = firebase
            .firestore()
            .collection("houses")
            .doc(user.houseId)
            .onSnapshot((snapshot) => {
                console.log("TurnUser snapshot");
                const houseFields = snapshot.data();
                if (currUser !== houseFields.currentTurnUser) {
                    setCurrUser(houseFields.currentTurnUser)
                }

                console.log("Current turn: ", houseFields.currentTurnUser)
                if (houseFields.currentTurnUser === user.fullName && !isUserTurn) {
                    setIsUserTurn(true);
                }
                if (houseFields.currentTurnUser !== user.fullName && isUserTurn) {
                    setIsUserTurn(false);
                }
                if (houseFields.finishedUsers.length - 1 === houseFields.users.length) {
                    setGameOver(true);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home', params: { user, groupName, gameJustPlayed: true } }]
                    })

                    tasksSs();
                    wildcardsSs();
                    return;
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
    console.log(userTasks);
    console.log(wildCards);



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
                        if (wildcard === 'shuffle') return <Shuffle key={index} index={index} groupName={groupName} userId={user.id} isUserTurn={isUserTurn} />
                        if (wildcard === 'swap') return <Swap key={index} index={index} groupName={groupName} userId={user.id} isUserTurn={isUserTurn} />
                        if (wildcard === 'skip') return <Skip key={index} index={index} userId={user.id} isUserTurn={isUserTurn} />
                    })}
                </View>
            </ScrollView>

            {isUserTurn ?
                <TouchableOpacity style={styles.button} onPress={pressDone}>
                    <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity> :
                <View>
                    <Image source={require('../../images/loader-orange.gif')}
                        style={styles.loader}
                    />
                    <Text style={styles.bottomIntroText}>Waiting for {currUser}...</Text>
                </View>

            }
        </View >
    );
}