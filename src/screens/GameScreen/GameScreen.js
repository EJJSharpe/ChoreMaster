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

    const [userTasks, setUserTasks] = useState([]);
    const [wildCards, setWildCards] = useState([]);
    const { user, groupName } = route.params;
    useEffect(() => {
        // api request for house doc, users array, store as variable
        // on snapshot for the finished array
        // when finished.length === userArray.length + 1
        // set houseStage to be home


        firebase
            .firestore()
            .collection("houses")
            .doc(user.houseId)
            .collection("tasks")
            .where("userId", "==", user.id)
            .onSnapshot((snapshot) =>
                setUserTasks(snapshot.docs.map((doc) => doc.data()))
            );
        firebase
            .firestore()
            .collection("users")
            .doc(user.id)
            .onSnapshot(
                (snapshot) => setWildCards(snapshot.data().wildcards)
                // setWildCards(snapshot.docs.map((doc) => doc.data()))
            );
    }, []);
    const [isUserTurn, setIsUserTurn] = useState(false);


    const pressDone = () => {
        // add users name to finished array
    };

    const turnText = isUserTurn ? "your turn" : "wait your turn";

    return (
        <View style={styles.pageContainer}>


            <View style={styles.headingContainer}>
                <Text style={styles.title}>
                    GameZone
                </Text>
            </View>


            <Text style={styles.heading}> Your Tasks</Text>
            <ScrollView style={styles.taskSectionContainer}>

                {
                    userTasks.map(({ name, points }, index) => {
                        console.log(index, '<tasks')
                        return (
                            <View style={styles.taskContainer}>
                                <Text style={styles.task}>{name}</Text>
                                <Text style={styles.points}>{points}</Text>
                            </View>
                        );
                    })
                }
            </ScrollView>

            <Text style={styles.heading}>WildCards Available:</Text>
            <ScrollView style={styles.outerCardsContainer}>
                <View style={styles.cardsContainer}>
                    {wildCards.map((wildcard, index) => {
                        if (wildcard === 'shuffle') return <Shuffle index={index} groupName={groupName} userId={user.id} />
                        if (wildcard === 'swap') return <Swap index={index} groupName={groupName} userId={user.id} />
                        if (wildcard === 'skip') return <Skip index={index} userId={user.id} />
                    })}
                </View>
            </ScrollView>

            <TouchableOpacity onPress={toggleTurn}>
                <Text style={styles.turnText}>Done</Text>
            </TouchableOpacity>
        </View >
    );
}