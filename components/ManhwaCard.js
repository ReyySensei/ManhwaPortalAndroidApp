import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function ManhwaCard({ item, onPress }) {
    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.touchArea} onPress={onPress}>
                {item.cover ? (
                    <Image source={{ uri: item.cover }} style={styles.cover} />
                ) : (
                    <View style={[styles.cover, styles.coverPlaceholder]}>
                        <Text style={{ color: "#888" }}>No Cover</Text>
                    </View>
                )}
            </TouchableOpacity>

            <View style={styles.meta}>
                <Text numberOfLines={1} style={styles.title}>
                    {item.title}
                </Text>
                <Text numberOfLines={1} style={styles.genre}>
                    {item.genre || "—"}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        marginVertical: 12,
        marginHorizontal: 12,
    },
    touchArea: {
        alignItems: "center",
    },
    cover: {
        width: 160,
        height: 220,
        borderRadius: 8,
        backgroundColor: "#eee",
        marginBottom: 8,
    },
    coverPlaceholder: {
        alignItems: "center",
        justifyContent: "center",
    },
    meta: {
        alignItems: "center",
        marginBottom: 8,
    },
    title: {
        fontWeight: "700",
        fontSize: 14,
        textAlign: "center",
        color: "white",
    },
    genre: {
        color: "white",
        fontSize: 12,
        marginTop: 2,
        textAlign: "center",
    },
});
