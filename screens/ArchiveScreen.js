import React from "react";
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Alert, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ManhwaCard from "../components/ManhwaCard";

export default function ArchiveScreen({ archives, setArchives, restoreItem, deleteArchiveFromFirebase }) {
    if (!archives || archives.length === 0) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <ImageBackground
                    source={require("../assets/bg.png")}
                    style={styles.bg}
                    resizeMode="cover"
                >
                    <LinearGradient
                        colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.2)"]}
                        style={styles.emptyOverlay}
                    >
                        <Text style={styles.emptyText}>No archived manhwas</Text>
                    </LinearGradient>
                </ImageBackground>
            </SafeAreaView>
        );
    }

    const handlePermanentDelete = (item) => {
        Alert.alert("Permanent Delete", `Delete "${item.title}" forever?`, [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    const updated = archives.filter((a) => a.id !== item.id);
                    setArchives(updated);
                    if (deleteArchiveFromFirebase) deleteArchiveFromFirebase(item.id);
                },
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground
                source={require("../assets/bg.png")}
                style={styles.bg}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.2)"]}
                    style={styles.overlay}
                >
                    <View style={{ padding: 16, paddingTop: 50 }}>
                        <Text style={styles.title}>Archived Manhwas</Text>

                        <FlatList
                            data={archives}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            renderItem={({ item }) => (
                                <View style={styles.cardWrapper}>
                                    <ManhwaCard item={item} onPress={() => { }} />
                                    <View style={styles.actions}>
                                        <TouchableOpacity
                                            style={[styles.actionBtn, { backgroundColor: "#4CAF50" }]}
                                            onPress={() => restoreItem(item)}
                                        >
                                            <Text style={{ color: "#fff" }}>Restore</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.actionBtn, { backgroundColor: "#E53935" }]}
                                            onPress={() => handlePermanentDelete(item)}
                                        >
                                            <Text style={{ color: "#fff" }}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            columnWrapperStyle={{ justifyContent: "space-between" }}
                            contentContainerStyle={{ paddingBottom: 120 }}
                        />
                    </View>
                </LinearGradient>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    bg: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    overlay: {
        flex: 1,
        width: "100%",
    },
    emptyOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "600",
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
        color: "#fff",
    },
    cardWrapper: {
        width: "48%",
        marginBottom: 20,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    actionBtn: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 4,
    },
});
