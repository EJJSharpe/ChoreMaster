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

export default function GameScreen({ route }) {
    console.log(route.params.user);

    const [userTasks, setUserTasks] = useState([]);
    const [wildCards, setWildCards] = useState([]);

    useEffect(() => {
        const { user } = route.params;
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
    console.log(wildCards.wildcards, "wildCards");
    const [isUserTurn, setIsUserTurn] = useState(false);

    const onWildCardPress = (name, used, index) => {
        // call wildcard function
        const newWildCards = [...wildCards]
        newWildCards[index].used = !used;

        //remove from state array and api
        newWildCards.splice(index, 1);
        api.removeWildcardFromUser(name, user.id)
        setWildCards(newWildCards)

        // end turn???

    }


    const toggleTurn = () => {
        setIsUserTurn(!isUserTurn);
    };

    const turnText = isUserTurn ? "your turn" : "wait your turn";

    return (
        <ScrollView>
            <Text style={styles.title}>
                Game <Text style={{ fontWeight: "300", color: "#ff841f" }}>Zone </Text>
            </Text>
            <Text style={styles.heading}> Your allocated Tasks</Text>
            {userTasks.map(({ name, points }, index) => {
                return (
                    <View key={index} style={styles.taskContainer}>
                        <View style={styles.taskContainer}>
                            <Text style={styles.task}>{name}</Text>
                            <Text style={styles.points}>Points: {points}</Text>
                        </View>
                    </View>
                );
            })}
            <Text style={styles.heading}>WildCards Available:</Text>
            {wildCards.map((wildcard) => {
                return (
                    <View key={wildcard} style={styles.taskContainer}>
                        <View style={styles.taskContainer}>
                            <Text style={styles.task}>{wildcard}</Text>
                        </View>
                    </View>
                );
            })}

            <TouchableOpacity style={styles.button}>
                <Text>Pass</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleTurn}>
                <Text style={styles.turnText}>{turnText}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}