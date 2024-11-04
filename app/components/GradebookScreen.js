import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { GradebookContext } from './GradebookContext';

const GradebookScreen = ({navigation}) => {
  const { aPlusThreshold, aThreshold, bThreshold, aminusThreshold } = useContext(GradebookContext);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Current A+ Threshold: {aPlusThreshold}</Text>
        <Text style={styles.text}>Current A Threshold: {aThreshold}</Text>
        <Text style={styles.text}>Current A- Threshold: {aminusThreshold}</Text>
        <Text style={styles.text}>Current B Threshold: {bThreshold}</Text>
        <Button title="Go to Page" onPress={() => navigation.navigate('Home')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Allow the ScrollView to grow
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor:'rgb(223,224,255)'

  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20, // Added padding for better spacing
    marginVertical: 20,
    backgroundColor:'rgb(248,224,204)'
  },
  text: {
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 30,
    marginVertical:20,
    paddingVertical: 20,
    paddingHorizontal: 20,
     // Optional: increase text size for better readability
  },
});

export default GradebookScreen;
