import React from "react";
import {
    View, Text, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView,
    Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

export default function HomeScreen({ navigation, setRole }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ImageBackground
                    source={require("../assets/background.png")}
                    style={styles.bg}
                    resizeMode="cover"
                >
                    <LinearGradient
                        colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.2)"]}
                        style={styles.overlay}
                    >
                        <Text style={styles.title}>Manhwa Portal</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: "red" }]}
                                onPress={() => navigation.navigate("AdminLogin")}
                            >
                                <Text style={styles.buttonText}>Admin</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: "blue" }]}
                                onPress={() => {
                                    setRole("reader");
                                    navigation.replace("ManhwaList");
                                }}
                            >
                                <Text style={styles.buttonText}>Reader</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    container: {
        flex: 1,
    },
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
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 60,
        textAlign: "center",
    },
    buttonContainer: {
        width: "100%",
        gap: 20,
    },
    button: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
});
