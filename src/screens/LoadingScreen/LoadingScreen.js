import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles'
import * as api from '../../firebase/firebaseAPI'

export default function LoadingScreen({ navigation, route }) {

    const user = route.params.user || { houseId: null };

    useEffect(() => {

        if (user.houseId === null) {
            navigation.reset({
                index: 0,
                routes: [{ name: "CreateJoin", params: { user } }],
            });
        } else {
            api.getHouseFields(user.houseId).then(houseData => {
                if (houseData.houseStage === 'game') {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Game", params: { user, groupName: user.houseId } }],
                    });
                } else if (houseData.houseStage === 'home') {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Home", params: { user, groupName: user.houseId } }],
                    });
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Lobby", params: { user, groupName: user.houseId } }],
                    });
                }
            })
        }
    })

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../images/ChoreMasterLogo.png')}
            />
            <Image
                style={styles.loader}
                source={require('../../images/loader-orange.gif')}
            />
        </View>
    )
}