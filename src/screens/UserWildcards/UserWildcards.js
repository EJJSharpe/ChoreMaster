import React, { useState, useEffect } from 'react';
import styles from './styles.js'
import * as api from '../../firebase/firebaseAPI'
import { Text, View, ScrollView, Button } from 'react-native'
import { Shuffle, Skip, Swap } from '../../components/wildcards.js'




export default function UserWildcardsScreen({ navigation, route }) {

    const [wildcards, setWildcards] = useState([])

    const { user } = route.params
    useEffect(() => {
        api.getUserWildcards(user.id).then(usersWildcards => {
            setWildcards(usersWildcards)
        })
    }, [])

    return (
        <View style={styles.outerContainer}>
            <View style={styles.cardsContainer}>

                {wildcards.map(wildcardText => {
                    console.log(wildcardText)
                    if (wildcardText === 'shuffle') return <Shuffle />
                    if (wildcardText === 'skip') return <Skip />
                    if (wildcardText === 'swap') return <Swap />
                })}


            </View>
        </View>
    )

}