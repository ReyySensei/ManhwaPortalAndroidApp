import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Image, ScrollView, Alert } from "react-native";
import { db } from "../firebaseConfig"; 
import { ref, set } from "firebase/database";

export default function ManhwaForm({ visible, onClose, onSave, initial }) {
    const empty = {
        id: Date.now().toString(),
        title: "",
        genre: "",
        cover: "",
        url: "",
        description: "",
    };
    const [form, setForm] = useState(initial || empty);

    useEffect(() => {
        setForm(initial || { ...empty, id: Date.now().toString() });
    }, [initial, visible]);

    const saveToFirebase = async (item) => {
        try {
            await set(ref(db, `manhwas/${item.id}`), item);
        } catch (err) {
            console.error("Firebase save error:", err);
            Alert.alert("Error", "Failed to save to database.");
        }
    };

    function save() {
        if (!form.title.trim()) {
            Alert.alert("Validation", "Title is required");
            return;
        }
        if (!form.url.trim()) {
            Alert.alert("Validation", "URL is required");
            return;
        }

        const manhwaItem = { ...form };
        saveToFirebase(manhwaItem); 
        onSave(manhwaItem);         
    }

    return (
        <Modal visible={visible} animationType="slide">
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={styles.scroll}>
                    <Text style={{ fontWeight: "700", fontSize: 18 }}>
                        {initial ? "Edit Manhwa" : "Add Manhwa"}
                    </Text>

                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        value={form.title}
                        onChangeText={(t) => setForm({ ...form, title: t })}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Genre</Text>
                    <TextInput
                        value={form.genre}
                        onChangeText={(t) => setForm({ ...form, genre: t })}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Cover Image URL</Text>
                    <TextInput
                        placeholder="https://example.com/cover.jpg"
                        value={form.cover}
                        onChangeText={(t) => setForm({ ...form, cover: t })}
                        style={styles.input}
                        autoCapitalize="none"
                    />
                    <View style={{ marginTop: 8, alignItems: "center" }}>
                        {form.cover ? (
                            <Image
                                source={{ uri: form.cover }}
                                style={{ width: 140, height: 190, borderRadius: 8 }}
                            />
                        ) : (
                            <Text style={{ color: "#666" }}>No preview</Text>
                        )}
                    </View>

                    <Text style={styles.label}>Manhwa Site URL</Text>
                    <TextInput
                        placeholder="https://"
                        value={form.url}
                        onChangeText={(t) => setForm({ ...form, url: t })}
                        style={styles.input}
                        autoCapitalize="none"
                        keyboardType="url"
                    />

                    <Text style={styles.label}>Description (optional)</Text>
                    <TextInput
                        value={form.description}
                        onChangeText={(t) => setForm({ ...form, description: t })}
                        style={[styles.input, { height: 100 }]}
                        multiline
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={save} style={styles.saveBtn}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} style={[styles.saveBtn, { backgroundColor: "#ccc" }]}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    scroll: {
        padding: 12,
        paddingBottom: 120,
    },
    label: { marginTop: 12, fontWeight: "700" },
    input: {
        borderWidth: 1,
        borderColor: "#eee",
        padding: 8,
        borderRadius: 8,
        marginTop: 6,
        backgroundColor: "#fff",
    },
    buttonRow: {
        flexDirection: "row",
        marginTop: 30,
        marginBottom: 50,
        gap: 8,
    },
    saveBtn: { flex: 1, padding: 14, borderRadius: 8, backgroundColor: "#ddd", alignItems: "center" },
});
