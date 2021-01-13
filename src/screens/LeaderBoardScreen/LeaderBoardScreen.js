import React, { useState, useEffect } from "react";
import medals from "../../images/medals/index";
import * as api from "../../firebase/firebaseAPI";
import { firebase } from "../../firebase/config";
import styles from "./styles";
import { getHouseUsers } from "../../firebase/firebaseAPI";
import { Text, View, ScrollView, Image } from "react-native";

export default function LeaderBoardScreen({ route }) {
  console.log(route.params.user);

  const [houseUsers, setHouseUsers] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  useEffect(() => {
    const { user } = route.params;

    firebase
      .firestore()
      .collection("users")
      .where("houseId", "==", user.houseId)
      .onSnapshot((snapshot) =>
        setHouseUsers(
          snapshot.docs
            .map((doc) => doc.data())
            .sort((a, b) => b.points - a.points)
        )
      );
  }, []);

  let userRank = (user) =>
    houseUsers.findIndex((item) => {
      return item.id === user.id;
    });

  function rankUser(user) {
    if (user) {
      return userRank(user);
    } else {
      return false;
    }
  }

  if (houseUsers.length > 0)
    return (
      <View style={styles.pageContainer}>
        <View colors={[, "#1da2c6", "#1695b7"]} style={styles.headingContainer}>
          <Text style={{ fontSize: 25, color: "white" }}>Leaderboard</Text>
          <View style={styles.titleContainer}>
            <Text
              style={{
                color: "white",
                fontSize: 25,
                flex: 1,
                textAlign: "right",
                marginRight: 40,
              }}
            >
              {/* {ordinal_suffix_of(userRank(route.params.user) + 1)} */}
            </Text>

            <Image
              style={{ flex: 0.6, height: 80, width: 20 }}
              source={medals[1].image}
            />
            <Text
              style={{ color: "white", fontSize: 25, flex: 1, marginLeft: 40 }}
            >
              {route.params.user.points} pts
            </Text>
          </View>
        </View>
        <View style={styles.listHeader}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginLeft: 25,
            }}
          >
            Rank
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 20,
            }}
          >
            Name
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginRight: 25,
            }}
          >
            Points
          </Text>
        </View>
        <View style={styles.divider} />

        <ScrollView>
          {houseUsers.map((user, index) => {
            if (index % 2 === 0)
              return (
                <View key={index} style={styles.listSectionContainer2}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      marginLeft: 25,
                    }}
                  >
                    {" "}
                    {/* {ordinal_suffix_of(userRank(user) + 1)} */}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                    }}
                  >
                    {user.fullName}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      marginRight: 45,
                    }}
                  >
                    {user.points}
                  </Text>
                </View>
              );
            else
              return (
                <View key={index} style={styles.listSectionContainer1}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      marginLeft: 25,
                    }}
                  >
                    {" "}
                    {/* {ordinal_suffix_of(userRank(user) + 1)} */}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                    }}
                  >
                    {user.fullName}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      marginRight: 45,
                    }}
                  >
                    {user.points}
                  </Text>
                </View>
              );
          })}
        </ScrollView>
      </View>
    );
  else return <Text>Loading...</Text>;
}

const ordinal_suffix_of = (i) => {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
};
