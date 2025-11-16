import React from "react";
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Image, StyleSheet, Alert,
    ImageBackground,
} from "react-native";

export default function ManhwaDetail({ item, onBack, role, onEdit, onDelete, onOpen }) {
    if (!item) return null;

    const confirmDelete = () => {
        Alert.alert("Delete", `Delete "${item.title}"?`, [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => onDelete && onDelete(item) },
        ]);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground
                source={require("../assets/bg.png")}
                style={styles.background}
                resizeMode="cover"
            >
                <ScrollView style={styles.scroll}>
                    {item.cover ? (
                        <Image source={{ uri: item.cover }} style={styles.cover} />
                    ) : (
                        <View style={styles.noCover}>
                            <Text>No cover</Text>
                        </View>
                    )}

                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.genre}>{item.genre}</Text>
                    {item.description ? <Text style={{ marginTop: 12, color: "white" }}>{item.description}</Text> : null}

                    {role === "reader" && item.url && (
                        <TouchableOpacity onPress={() => onOpen && onOpen(item.url)} style={styles.openBtn}>
                            <Text style={{ textAlign: "center" }}>Read Now</Text>
                        </TouchableOpacity>
                    )}

                    <View style={styles.buttonRow}>
                        {role === "admin" && (
                            <>
                                <TouchableOpacity onPress={() => onEdit && onEdit(item)} style={styles.editBtn}>
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={confirmDelete}
                                    style={[styles.editBtn, { backgroundColor: "#fdd" }]}
                                >
                                    <Text>Delete</Text>
                                </TouchableOpacity>
                            </>
                        )}
                        <TouchableOpacity onPress={onBack} style={[styles.editBtn, { backgroundColor: "#ccc" }]}>
                            <Text>Back</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff",
        zIndex: 999,
        paddingTop: 40,
    },
    background: {
        flex: 1,
    },
    scroll: {
        padding: 12,
        paddingBottom: 120,
    },
    cover: {
        width: "100%",
        height: 360,
        borderRadius: 8,
    },
    noCover: {
        width: "100%",
        height: 360,
        borderRadius: 8,
        backgroundColor: "#fafafa",
        alignItems: "center",
        justifyContent: "center",
    },
    title: { 
        fontSize: 22, 
        fontWeight: "700", 
        marginTop: 12, 
        color: "white" 
    },
    genre: { 
        color: "white", 
        marginTop: 6 
    },
    openBtn: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#8af",
        marginTop: 20,
    },
    buttonRow: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 50,
        gap: 8,
    },
    editBtn: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#ddd",
        flex: 1,
        alignItems: "center",
    },
});
