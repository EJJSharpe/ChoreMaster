import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { signIn, singInGoogle } from "../../firebase/API/auth_methods";
import * as api from '../../firebase/firebaseAPI'
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onFooterLinkPress = () => {
        navigation.navigate("Registration");
    };

    const onLoginPress = () => {
        if (!email) {
            alert("Email field is required.");
        } else if (!password) {
            alert("Password field is required.");
        } else {
            const loggedInUser = signIn(email, password);
            loggedInUser.then((user) => {
                if (user.error) {
                    alert(user.error.message);
                } else {
                    if (user) {
                        if (user.user.houseId !== null) {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "Lobby", params: { user } }],
                            });
                        } else {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "CreateJoin", params: { user } }],
                            });
                        }
                    } else {
                        alert("please verify your email");
                    }
                }
            });
        }
    };

    const onLoginGoogle = () => {
        const loggedInUser = singInGoogle();

        loggedInUser.then((user) => {
            if (user) {
                navigation.navigate("Home", user);
            }
        });
    };
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: "100%" }}
                keyboardShouldPersistTaps="always"
            >
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonTitle} onPress={() => onLoginGoogle()}>
                        Log in with google
          </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Home') }}><Text>Home shortcut</Text></TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>
                        Don't have an account?{" "}
                        <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                            Sign up
            </Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}
