

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button } from 'react-native';
import { DataTable } from 'react-native-paper';

const App = () => {
  const [grid, setGrid] = useState([]);
  const [mistakes, setMistakes] = useState(0);

  // Инициализация сетки судоку
  useEffect(() => {
    generateSudoku();
  }, []);

  const generateSudoku = () => {
    const initialGrid = [
      [5, 3, null, null, 7, null, null, null, null],
      [6, null, null, 1, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [null, null, null, null, 8, null, null, 7, 9],
    ];
    setGrid(initialGrid);
    setMistakes(0);
  };

  const checkInput = (row, col, value) => {
    const correctGrid = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ];

    if (parseInt(value) !== correctGrid[row][col]) {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      if (newMistakes >= 3) {
        Alert.alert('Խաղը ավարտվեց', 'Դուք կատարել եք 3 սխան քայլ, կրկին փորձեք');
        generateSudoku();
      }
    } else {
      const updatedGrid = [...grid];
      updatedGrid[row][col] = parseInt(value);
      setGrid(updatedGrid);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Судоку</Text>
      <DataTable>
        {grid.map((row, rowIndex) => (
          <DataTable.Row key={rowIndex}>
            {row.map((cell, colIndex) => (
              <DataTable.Cell key={colIndex} style={styles.cell}>
                {cell ? (
                  <Text style={styles.cellText}>{cell}</Text>
                ) : (
                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(value) => checkInput(rowIndex, colIndex, value)}
                  />
                )}
              </DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}
      </DataTable>
      <Text style={styles.mistakes}>Սխալներ: {mistakes}/3</Text>
      <Button title="ՎԵրսկսել խաղը" onPress={generateSudoku} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cell: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cellText: {
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    width: 35,
    height: 35,
    textAlign: 'center',
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  mistakes: {
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
});

export default App;
