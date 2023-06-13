import {useState} from 'react';
import {Text, TextInput, View, Button} from 'react-native';
import db from '../FirebaseConfig';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getFirestore,
} from 'firebase/firestore';

export default function PlayerListScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  async function addCitiesTest(db) {
    await setDoc(doc(db, 'cities', 'LA'), {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA',
    });
  }

  async function addTestPlayer(db) {
    await setDoc(doc(db, 'players', 'test2'), {
      name: 'test player2',
      position: 'PF',
      offense: 90,
      defense: 85,
    });
  }

  async function getCitiesTest(db) {
    const docRef = doc(db, 'cities', 'LA');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('doc data: ', docSnap.data().name);
    } else {
      console.log('no such doc');
    }
  }

  async function updateCitiesTest(db) {
    const laRef = doc(db, 'cities', 'LA');

    await updateDoc(laRef, {state: 'California'});
  }

  async function getUsers(db) {
    const usersCol = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCol);
    const usersList = usersSnapshot.docs.map(doc => doc.data());
    return usersList;
  }

  return (
    <View>
      <Text>Player List Screen</Text>
      <Button title="get users" onPress={() => setName(getUsers(db))} />
      <Button title="create cities" onPress={() => addCitiesTest(db)} />
      <Button title="read cities" onPress={() => getCitiesTest(db)} />
      <Button title="update cities" onPress={() => updateCitiesTest(db)} />
      <Button title="add test player" onPress={() => addTestPlayer(db)} />
      {/* <TextInput onChangeText={setName} value={name} placeholder="Name" /> */}
      <Text>{name}</Text>
    </View>
  );
}
