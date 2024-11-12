import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker'; // Import Picker component
import axiosInstance from '../../utils/axios_instance';
import {navigationRef} from '../../App';

const EditField = ({route, navigation}) => {
  const {razaid, field} = route.params; // Field data and razaid passed via navigation
  const [fieldName, setFieldName] = useState(field.name);
  const [fieldType, setFieldType] = useState(field.type); // State for the picker
  const [fieldOptions, setFieldOptions] = useState(field.options); // State for the picker
  const [isRequired, setIsRequired] = useState(field.is_required);
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

  const handleSaveField = async () => {
    const updateddata = {
      id: razaid,
      data: {
        fields: razaData.fields.map(e =>
          e._id === field._id
            ? {
                ...e,
                name: fieldName,
                type: fieldType,
                is_required: isRequired,
                options: fieldOptions,
              }
            : e,
        ),
      },
    };

    try {
      // API call to update the field by razaid and field id
      await axiosInstance.put(`raza/manageRaza`, updateddata);

      // On successful update, navigate back to ManageRaza screen
      navigationRef.goBack();
    } catch (error) {
      console.error('Failed to update field:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Field Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Field Name"
        value={fieldName}
        onChangeText={setFieldName}
      />

      <Text style={styles.label}>Field Type:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={fieldType}
          onValueChange={itemValue => setFieldType(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Text" value="text" />
          <Picker.Item label="Select" value="select" />
          <Picker.Item label="Number" value="number" />
          <Picker.Item label="Date" value="date" />
        </Picker>
      </View>

      <Text style={styles.label}>Is Required:</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setIsRequired(true)}>
          <View
            style={[
              styles.radioCircle,
              isRequired === true && styles.selectedRadio,
            ]}
          />
          <Text style={styles.radioLabel}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setIsRequired(false)}>
          <View
            style={[
              styles.radioCircle,
              isRequired === false && styles.selectedRadio,
            ]}
          />
          <Text style={styles.radioLabel}>No</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.saveButton}>
        <Button
          title="Save Changes"
          color="#AD7E05"
          onPress={handleSaveField}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#FEF7E6'},
  label: {fontSize: 16, fontWeight: 'bold', marginVertical: 8},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  radioGroup: {flexDirection: 'row', alignItems: 'center', marginVertical: 12},
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#AD7E05',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: '#AD7E05',
  },
  radioLabel: {fontSize: 16},
  saveButton: {marginTop: 20},
});

export default EditField;
