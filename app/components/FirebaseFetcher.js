import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

export default function FirebaseFetcher() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [absences, setAbsences] = useState('');

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

      // Clear input fields and hide the form
      setName('');
      setGrade('');
      setAbsences('');
      setShowForm(false);

      // Update the student list
      setStudents((prevStudents) => [...prevStudents, { id: docRef.id, ...newStudent }]);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '70%',
    margin:'auto',
  },
  form: {
    marginBottom: 20,
    width: '100%', // Form width to center within the container
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    borderRadius: 10,
  },
  studentList: {
    marginTop: 20,
    alignItems: 'center', // Centers each student item horizontally
  },
  studentItem: {
    alignItems: 'center', // Centers each student data point
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    borderRadius: 8,
    backgroundColor: 'rgb(204,217,230)',
    borderRadius: 30,
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
