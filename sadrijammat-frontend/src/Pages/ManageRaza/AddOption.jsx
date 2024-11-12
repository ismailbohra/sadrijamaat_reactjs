import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axiosInstance from '../../utils/axios_instance';
import showToast from '../../utils/toast';

const AddOption = ({route, navigation}) => {
  const {razaid, field_id} = route.params; // Get razaid and field_id from params
  const [razaData, setRazaData] = useState(null);
  const [options, setOptions] = useState([]);
  const [optionLabel, setOptionLabel] = useState('');

  useEffect(() => {
    // Fetch entire razaData
    const fetchRazaData = async () => {
      const response = await axiosInstance.get(
        `raza/manageRaza/getraza/${razaid}`,
      );
      setRazaData(response.data.data);
      const field = response.data.data.fields.find(
        field => field._id === field_id,
      );
      if (field) {
        setOptions(field.options || []); // Set existing options if available
      }
    };
    fetchRazaData();
  }, [razaid, field_id]);

  const handleAddOption = () => {
    if (!optionLabel) {
      Alert.alert('Error', 'Option label cannot be empty');
      return;
    }

    const newOption = {
      label: optionLabel,
      value: optionLabel,
    };

    // Update options state
    setOptions([...options, newOption]);
    setOptionLabel(''); // Clear input after adding
  };

  const handleRemoveOption = index => {
    const updatedOptions = options.filter((_, idx) => idx !== index);
    setOptions(updatedOptions);
  };

  const handleDone = async () => {
    if (!razaData) return; // Ensure razaData is loaded

    // Find and update the specific field's options
    const updatedFields = razaData.fields.map(field => {
      if (field._id === field_id) {
        return {...field, options: options}; // Update options for the field
      }
      return field;
    });

    const updatedRazaData = {
      id: razaData._id,
      data: {
        fields: updatedFields,
      },
    };

    try {
      console.log(JSON.stringify(updatedRazaData));
      await axiosInstance.put(`raza/manageRaza`, updatedRazaData).then(e => {
        showToast('success', 'Successful', 'Option modified', 2000);
        navigation.goBack();
      });
    } catch (error) {
      showToast('Error', 'Error', 'Failed to update options', 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Option</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter option label"
        value={optionLabel}
        onChangeText={setOptionLabel}
      />
      <Button title="Add Option" onPress={handleAddOption} />

      <FlatList
        data={options}
        renderItem={({item, index}) => (
          <View style={styles.optionItem}>
            <Text style={styles.optionText}>{item.label}</Text>
            <TouchableOpacity onPress={() => handleRemoveOption(index)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Button title="Done" onPress={handleDone} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, gap: 20},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 10},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 5,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {fontSize: 18, color: 'black'},
  removeText: {color: 'red'},
});

export default AddOption;
