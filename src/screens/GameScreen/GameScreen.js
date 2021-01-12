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


    const toggleTurn = () => {
        setIsUserTurn(!isUserTurn);
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
            <View style={styles.taskSectionContainer}>

                {
                    userTasks.map(({ name, points }, index) => {
                        return (
                            <View style={styles.taskContainer}>
                                <Text style={styles.task}>{name}</Text>
                                <Text style={styles.points}>{points}</Text>
                            </View>
                        );
                    })
                }
            </View>

            <Text style={styles.heading}>WildCards Available:</Text>
            <ScrollView style={styles.outerCardsContainer}>
                <View style={styles.cardsContainer}>
                    {wildCards.map((wildcard, index) => {
                        if (wildcard === 'shuffle') return <Shuffle key={index} index={index} groupName={groupName} userId={user.id} />
                        if (wildcard === 'swap') return <Swap key={index} index={index} groupName={groupName} userId={user.id} />
                        if (wildcard === 'skip') return <Skip key={index} index={index} />
                    })}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.button}>
                <Text>Pass</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleTurn}>
                <Text style={styles.turnText}>{turnText}</Text>
            </TouchableOpacity>
        </View >
    );
}