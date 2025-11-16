import React, { useState, useEffect } from "react";
import { View, FlatList, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView, ImageBackground, Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ManhwaCard from "../components/ManhwaCard";

const { height, width } = Dimensions.get("window");

export default function ManhwaList({
    navigation,
    role,
    manhwas,
    setSelectedManhwa,
    onAdd,
    onShowArchive,
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredManhwas, setFilteredManhwas] = useState(manhwas);

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredManhwas(manhwas);
        } else {
            const filtered = manhwas.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredManhwas(filtered);
        }
    }, [searchQuery, manhwas]);

    const handlePressCard = (item) => {
        setSelectedManhwa(item);
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
                    <View style={styles.container}>
                        {role === "reader" && (
                            <>
                                <TouchableOpacity
                                    style={styles.backBtn}
                                    onPress={() => navigation.replace("Home")}
                                >
                                    <Text style={{ color: "#fff" }}>← Back</Text>
                                </TouchableOpacity>

                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Search manhwa..."
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                />
                            </>
                        )}

                        {role === "admin" && (
                            <>
                                <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
                                    <Text style={{ color: "#fff" }}>+ Add Manhwa</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.addBtn, { backgroundColor: "#6c63ff" }]}
                                    onPress={onShowArchive}
                                >
                                    <Text style={{ color: "#fff" }}>Show Archived Manhwas</Text>
                                </TouchableOpacity>

                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Search manhwa..."
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                />
                            </>
                        )}

                        <FlatList
                            data={filteredManhwas}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            renderItem={({ item }) => (
                                <View style={styles.cardWrapper}>
                                    <ManhwaCard
                                        item={item}
                                        onPress={() => handlePressCard(item)}
                                        role={role}
                                    />
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
        backgroundColor: "#000",
    },
    bg: {
        flex: 1,
        width: width,
        height: height,
    },
    overlay: {
        flex: 1,
        width: "100%",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    container: {
        flex: 1,
    },
    addBtn: {
        backgroundColor: "#4A00E0",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 12,
    },
    backBtn: {
        backgroundColor: "#888",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 12,
    },
    cardWrapper: {
        width: "48%",
        marginBottom: 20,
    },
    searchInput: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
    },
});
