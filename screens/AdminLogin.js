import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; 

const { height, width } = Dimensions.get("window");

export default function AdminLogin({ navigation, setRole }) {
    const [email, setEmail] = useState("");   
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const login = () => {
        if (!email || !password) {
            Alert.alert("Error", "Email and password are required");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setRole("admin");
                navigation.replace("ManhwaList");
            })
            .catch((error) => {
                Alert.alert("Login Failed", error.message);
            });
    };

    return (
        <ImageBackground
            source={require("../assets/background.png")}
            style={styles.bg}
            resizeMode="cover"
        >
            <LinearGradient
                colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.2)"]}
                style={styles.overlay}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Admin Login</Text>

                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        placeholderTextColor="#ccc"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <View style={{ width: "100%", position: "relative" }}>
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            style={[styles.input, { paddingRight: 50 }]}
                            placeholderTextColor="#ccc"
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.showHideButton}
                        >
                            <Text style={{ color: "#fff" }}>
                                {showPassword ? "Hide" : "Show"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={login}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "white", marginTop: 12 }]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={[styles.buttonText, { color: "black" }]}>Back</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    bg: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    container: {
        width: "100%",
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 40
    },
    input: {
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: 14,
        borderRadius: 12,
        marginTop: 12,
        color: "#fff"
    },
    showHideButton: {
        position: "absolute",
        right: 15,
        top: "45%",
    },
    button: {
        width: "100%",
        backgroundColor: "white",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20
    },
    buttonText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 18
    },
});
