// Calculator.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Display = ({ value }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.input}>{value}</Text>
  </View>
);

const NumberButton = ({ number, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{number}</Text>
  </TouchableOpacity>
);

const OperatorButton = ({ operator, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{operator}</Text>
  </TouchableOpacity>
);

const ClearButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>C</Text>
  </TouchableOpacity>
);

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [previousValue, setPreviousValue] = useState('');
  const [operator, setOperator] = useState('');

  const handleNumberPress = (number) => {
    setCurrentValue(currentValue + number);
    setDisplay(currentValue + number);
  };

  const handleOperatorPress = (op) => {
    if (currentValue === '' && op !== '-') {
      showAlert('No se puede realizar esta operacion');
      return;
    }
    if (operator !== '') {
      calculate();
    }
    setOperator(op);
    setPreviousValue(currentValue);
    setCurrentValue('');
  };

  const handleEqualPress = () => {
    if (currentValue === '' || previousValue === '') {
      showAlert('Seleccione una operacion');
      return;
    }
    calculate();
    setOperator('');
    setPreviousValue('');
  };

  const calculate = () => {
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    if (operator === '+') {
      result = prev + current;
    } else if (operator === '-') {
      result = prev - current;
    } else if (operator === 'x') {
      result = prev * current;
    } else if (operator === '/') {
      result = prev / current;
    }
    setDisplay(result.toString());
    setCurrentValue(result.toString());
  };

  const handleClearPress = () => {
    setDisplay('0');
    setCurrentValue('');
    setPreviousValue('');
    setOperator('');
  };

  const showAlert = (message) => {
    Alert.alert('Error', message);
  };

  return (
    <View style={styles.container}>
      <Display value={display} />
      <View style={styles.buttonsContainer}>
        {[7, 8, 9, '/', 4, 5, 6, 'x', 1, 2, 3, '-', 'C', 0, '=', '+'].map((item) => {
          if (typeof item === 'number' || item === '0') {
            return <NumberButton key={item.toString()} number={item.toString()} onPress={() => handleNumberPress(item.toString())} />;
          } else if (item === 'C') {
            return <ClearButton key={item} onPress={handleClearPress} />;
          } else if (item === '=') {
            return <OperatorButton key={item} operator={item} onPress={handleEqualPress} />;
          } else {
            return <OperatorButton key={item} operator={item} onPress={() => handleOperatorPress(item)} />;
          }
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 5,
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: 'black',
  },
  input: {
    fontSize: 30,
  },
  result: {
    fontSize: 20,
    color: 'gray',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: 'black',
  },
  button: {
    width: '25%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 'black',
    color: 'gray',
  },
  buttonText: {
    fontSize: 24,
  },
});

export default Calculator;
