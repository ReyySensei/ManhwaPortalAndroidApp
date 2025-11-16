import React, { useState, useEffect } from "react";
import { Linking } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import AdminLogin from "./screens/AdminLogin";
import ManhwaList from "./screens/ManhwaList";
import ManhwaDetail from "./components/ManhwaDetail";
import ManhwaForm from "./components/ManhwaForm";
import ArchiveScreen from "./screens/ArchiveScreen";

import { db } from "./firebaseConfig"; 
import { ref, onValue, set, remove } from "firebase/database";

const Stack = createStackNavigator();

export default function App() {
  const [role, setRole] = useState(null);
  const [manhwas, setManhwas] = useState([]);
  const [archiveList, setArchiveList] = useState([]);
  const [selectedManhwa, setSelectedManhwa] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const manhwaRef = ref(db, "manhwas");
    const archiveRef = ref(db, "archives");

    onValue(manhwaRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.values(data);
      setManhwas(list);
    });

    onValue(archiveRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.values(data);
      setArchiveList(list);
    });
  }, []);

  // Save or update manhwa in Firebase
  const saveManhwaToFirebase = (item) => {
    set(ref(db, `manhwas/${item.id}`), item);
  };

  const deleteManhwaFromFirebase = (id) => {
    remove(ref(db, `manhwas/${id}`));
  };

  const saveArchiveToFirebase = (item) => {
    set(ref(db, `archives/${item.id}`), item);
  };

  const deleteArchiveFromFirebase = (id) => {
    remove(ref(db, `archives/${id}`));
  };

  const handleAdd = () => {
    setEditItem(null);
    setFormVisible(true);
  };

  const handleSave = (item) => {
    if (editItem) {
      const updated = manhwas.map((m) => (m.id === item.id ? item : m));
      setManhwas(updated);
    } else {
      const updated = [...manhwas, item];
      setManhwas(updated);
    }
    saveManhwaToFirebase(item);

    if (selectedManhwa && selectedManhwa.id === item.id) {
      setSelectedManhwa(item);
    }
    setFormVisible(false);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setFormVisible(true);
  };

  const handleDelete = (item) => {
    const updatedManhwas = manhwas.filter((m) => m.id !== item.id);
    setManhwas(updatedManhwas);
    deleteManhwaFromFirebase(item.id);

    const archivedItem = { ...item, archivedAt: new Date().toISOString() };
    const updatedArchives = [...archiveList, archivedItem];
    setArchiveList(updatedArchives);
    saveArchiveToFirebase(archivedItem);

    setSelectedManhwa(null);
  };

  const handleRestore = (item) => {
    const restoredList = [...manhwas, item];
    setManhwas(restoredList);
    saveManhwaToFirebase(item);

    const updatedArchives = archiveList.filter((a) => a.id !== item.id);
    setArchiveList(updatedArchives);
    deleteArchiveFromFirebase(item.id);
  };

  const handleOpenURL = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} setRole={setRole} />}
        </Stack.Screen>

        <Stack.Screen name="AdminLogin">
          {(props) => <AdminLogin {...props} setRole={setRole} />}
        </Stack.Screen>

        <Stack.Screen name="ManhwaList">
          {(props) => {
            const handleShowArchive = () => props.navigation.navigate("ArchiveScreen");
            return (
              <ManhwaList
                {...props}
                role={role}
                manhwas={manhwas}
                setSelectedManhwa={setSelectedManhwa}
                onAdd={handleAdd}
                onShowArchive={handleShowArchive}
              />
            );
          }}
        </Stack.Screen>

        <Stack.Screen name="ArchiveScreen">
          {(props) => (
            <ArchiveScreen
              {...props}
              archives={archiveList}
              setArchives={setArchiveList} 
              restoreItem={handleRestore}
              deleteArchiveFromFirebase={deleteArchiveFromFirebase} 
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>

      {selectedManhwa && (
        <ManhwaDetail
          item={selectedManhwa}
          role={role}
          onBack={() => setSelectedManhwa(null)}
          onEdit={role === "admin" ? handleEdit : null}
          onDelete={role === "admin" ? handleDelete : null}
          onOpen={handleOpenURL}
        />
      )}

      {formVisible && (
        <ManhwaForm
          visible={formVisible}
          onClose={() => setFormVisible(false)}
          onSave={handleSave}
          initial={editItem}
        />
      )}
    </NavigationContainer>
  );
}
