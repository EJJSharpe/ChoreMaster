import React, { useState, useEffect } from 'react';
import styles from './styles.js'
import * as api from '../../firebase/firebaseAPI'
import { Text, View } from 'react-native'

export default function UserWildcardsScreen({ navigation }) {

    const [wildcards, setWildcards] = useState([])

    return (
        <View><Text>Wildcards</Text></View>
    )


}