import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { registration } from "../../firebase/API/auth_methods";

export default function RegistrationScreen({ navigation }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onFooterLinkPress = () => {
        navigation.navigate("Login");
    };

    const onRegisterPress = () => {
        if (!fullName) {
            alert("First name is required");
        } else if (!email) {
            alert("Email field is required.");
        } else if (!password) {
            alert("Password field is required.");
        } else if (!confirmPassword) {
            setPassword("");
            alert("Confirm password field is required.");
        } else if (password !== confirmPassword) {
            alert("Password does not match!");
        } else {
            const loggedInUser = registration(fullName, email, password);
            loggedInUser.then((response) => {
                if (response.error) {
                    alert(response.error.message);
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "CreateJoin", params: { user: response } }],
                    });
                }
            });
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: "100%" }}
                keyboardShouldPersistTaps="always"
            >
                <Text style={styles.header}>Sign Up!</Text>
                <TextInput
                    style={styles.inputTop}
                    placeholder="Full Name"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
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
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder="Confirm Password"
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}
                >
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>
                        Already got an account?{" "}
                        <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                            Log in
            </Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}
