import { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { GradebookContext } from './GradebookContext';

export default function FirebaseFetcher({ navigation }) {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [absences, setAbsences] = useState('');
  const { aPlusThreshold, setAPlusThreshold } = useContext(GradebookContext);
  const { aThreshold, setAThreshold } = useContext(GradebookContext);
  const { bThreshold, setBThreshold } = useContext(GradebookContext);
  const { aminusThreshold, setaminusThreshold } = useContext(GradebookContext);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'students'));
      const studentData = [];
      querySnapshot.forEach((doc) => {
        studentData.push({ id: doc.id, ...doc.data() });
      });
      setStudents(studentData);
    };

    fetchData();
  }, []);

  const addStudent = async () => {
    try {
      const newStudent = { name, grade, absences: parseInt(absences) };
      const docRef = await addDoc(collection(db, 'students'), newStudent);
      console.log('Document written with ID: ', docRef.id);

      setName('');
      setGrade('');
      setAbsences('');
      setShowForm(false);

      setStudents((prevStudents) => [...prevStudents, { id: docRef.id, ...newStudent }]);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text>Set A+ Threshold:</Text>
        <TextInput
          placeholder="Enter A+ Threshold"
          value={String(aPlusThreshold)}
          onChangeText={text => setAPlusThreshold(Number(text))}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text>Set A Threshold:</Text>
        <TextInput
          placeholder="Enter A Threshold"
          value={String(aThreshold)}
          onChangeText={text => setAThreshold(Number(text))}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text>Set A- Threshold:</Text>
        <TextInput
          placeholder="Enter A- Threshold"
          value={String(aminusThreshold)}
          onChangeText={text => setaminusThreshold(Number(text))}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text>Set B Threshold:</Text>
        <TextInput
          placeholder="Enter B Threshold"
          value={String(bThreshold)}
          onChangeText={text => setBThreshold(Number(text))}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button title="Go to Page" onPress={() => navigation.navigate('Gradebook')} />
      </View>

      <View style={styles.innerContainer}>
        {showForm ? (
          <View style={styles.form}>
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder="Grade"
              value={grade}
              onChangeText={setGrade}
              style={styles.input}
            />
            <TextInput
              placeholder="Absences"
              value={absences}
              onChangeText={setAbsences}
              keyboardType="numeric"
              style={styles.input}
            />
            <Button title="Submit" onPress={addStudent} />
          </View>
        ) : (
          <Button title="Add New Student" onPress={() => setShowForm(true)} />
        )}

        <View style={styles.studentList}>
          {students.map((student) => (
            <View key={student.id} style={styles.studentItem}>
              <Text style={styles.name}>{student.name}</Text>
              <Text style={styles.grade}>Grade: {student.grade}</Text>
              <Text style={styles.absences}>Absences: {student.absences}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  innerContainer: {
    flexGrow: 1,
  },
  form: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
  },
  studentList: {
    marginTop: 20,
    alignItems: 'center',
  },
  studentItem: {
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    borderRadius: 30,
    backgroundColor: 'rgb(204,217,230)',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  grade: {
    fontSize: 16,
    color: '#555',
    marginBottom: 3,
  },
  absences: {
    fontSize: 16,
    color: '#888',
  },
});
