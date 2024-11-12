import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {navigationRef} from '../../App';
import {RadioButton} from 'react-native-paper'; // Import RadioButton
import {Picker} from '@react-native-picker/picker'; // Import Picker
import axiosInstance from '../../utils/axios_instance';
import showToast from '../../utils/toast'

const AddField = ({route}) => {
  const {razaid} = route.params;
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState('text'); // Default to 'text'
  const [isRequired, setIsRequired] = useState(false);

  const [razaData, setRazaData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        `raza/manageRaza/getraza/${razaid}`,
      );
      setRazaData(response.data.data);
    };
    fetchData();
  }, [razaid]);

  const handleAddField = async () => {
    const newField = {
      name: fieldName,
      type: fieldType,
      is_required:isRequired,
      options: fieldType === 'select' ? [] : null,
    };
    const udpatedData = {
      id: razaData._id,
      data: {
        fields: [...razaData.fields, newField],
      },
    };
    await axiosInstance.put('raza/manageRaza', udpatedData).then((e)=>{ 
        showToast('success','Successfull','New Field Added',2000)
        navigationRef.goBack()});
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Field Name"
        placeholderTextColor="#888"
        value={fieldName}
        onChangeText={setFieldName}
      />

      <Text style={styles.label}>Field Type:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={fieldType}
          style={styles.picker}
          onValueChange={itemValue => setFieldType(itemValue)}>
          <Picker.Item label="Text" value="text" />
          <Picker.Item label="Select" value="select" />
          <Picker.Item label="Number" value="number" />
          <Picker.Item label="Date" value="date" />
          {/* Add more field types as needed */}
        </Picker>
      </View>

      <Text style={styles.label}>Is Required:</Text>
      <View style={styles.radioContainer}>
        <Text style={{color: 'black'}}>Yes</Text>
        <RadioButton
          value="yes"
          status={isRequired ? 'checked' : 'unchecked'}
          onPress={() => setIsRequired(true)}
        />
        <Text style={{color: 'black'}}>No</Text>
        <RadioButton
          value="no"
          status={!isRequired ? 'checked' : 'unchecked'}
          onPress={() => setIsRequired(false)}
        />
      </View>

      <Button title="Done" onPress={handleAddField} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, gap: 5},
  label: {color: 'black', marginVertical: 8},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    color: 'black',
    borderRadius: 15,
    paddingLeft: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 8,
  },
  picker: {
    // height: 50,
    width: '100%',
    color: 'black',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    gap: 5,
  },
});

export default AddField;
