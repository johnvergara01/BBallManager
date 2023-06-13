import {
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import db from '../FirebaseConfig';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getFirestore,
} from 'firebase/firestore';
import {useReducer, useState, useRef, useEffect} from 'react';

export default function PlayGameScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [overtime, setOvertime] = useState(0);
  const [playerTeam, setPlayerTeam] = useState({
    name: '',
    offense: 0,
    defense: 0,
    position: '',
    score: 0,
  });

  const [opponentTeam, setOpponentTeam] = useState({
    name: '',
    offense: 0,
    defense: 0,
    position: '',
    score: 0,
  });

  useEffect(() => {
    const loadTeams = async () => {
      setIsLoading(true);
      const playerRef = doc(db, 'players', 'test1');
      const playerSnap = await getDoc(playerRef);

      if (playerSnap.exists()) {
        setPlayerTeam({
          ...playerTeam,
          name: playerSnap.data().name,
          offense: playerSnap.data().offense,
          defense: playerSnap.data().defense,
          position: playerSnap.data().position,
        });
      } else {
        console.log('no such doc');
      }

      const opponentRef = doc(db, 'players', 'test2');
      const opponentSnap = await getDoc(opponentRef);

      if (opponentSnap.exists()) {
        setOpponentTeam({
          ...opponentTeam,
          name: opponentSnap.data().name,
          offense: opponentSnap.data().offense,
          defense: opponentSnap.data().defense,
          position: opponentSnap.data().position,
        });
      } else {
        console.log('no such doc');
      }
      setIsLoading(false);
    };

    loadTeams().catch(console.error);
  }, []);

  function playPosession(offense, defense) {
    let offNum = Math.floor(Math.random() * offense.offense);
    let defNum = Math.floor(Math.random() * defense.defense);

    if (offNum >= defNum && offNum >= 25) {
      return true;
    } else {
      return false;
    }
  }

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  async function simulateGame(player, opponent) {
    let jumpball = Math.round(Math.random());
    let posessions = 100;

    for (let i = 0; i < posessions; i++) {
      playPosession(player, opponent) &&
        setPlayerTeam({...player, score: (player.score += 2)});
      playPosession(opponent, player) &&
        setOpponentTeam({...opponent, score: (opponent.score += 2)});
    }
    while (player.score === opponent.score) {
      setOvertime(overtime + 1);
      posessions = 10;

      for (let i = 0; i < posessions; i++) {
        playPosession(player, opponent) &&
          setPlayerTeam({...player, score: (player.score += 2)});
        playPosession(opponent, player) &&
          setOpponentTeam({...opponent, score: (opponent.score += 2)});
      }
    }
    setGameFinished(true);
  }

  function reset() {
    setPlayerTeam({...playerTeam, score: 0});
    setOpponentTeam({...opponentTeam, score: 0});
    setGameFinished(false);
    setOvertime(0);
  }

  const DisplayOvertime = () => {
    if (overtime === 1) {
      return <Text>Overtime!</Text>;
    } else if (overtime > 1) {
      return <Text>{overtime} Overtime!</Text>;
    }
  };

  return (
    <View>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator
            style={styles.indicator}
            size="large"></ActivityIndicator>
        </View>
      ) : (
        <View>
          <Text>Play Game Screen</Text>
          <Button
            title="Play Next Game"
            onPress={() => simulateGame(playerTeam, opponentTeam)}
          />
          {gameFinished && <Button title="reset" onPress={() => reset()} />}
          <Text>Score</Text>
          <Text>
            Player {playerTeam.score}-{opponentTeam.score} Opponent
          </Text>
          <DisplayOvertime></DisplayOvertime>
          <Text>Player name: {playerTeam.name}</Text>
          <Text>Opponent name: {opponentTeam.name}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});
