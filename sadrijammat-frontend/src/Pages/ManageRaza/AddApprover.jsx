import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {Appbar, Checkbox} from 'react-native-paper';
import axiosInstance from '../../utils/axios_instance';
import toast from '../../utils/toast';

const AddApprover = ({route, navigation}) => {
  const {razaid, approvalStatus} = route.params;
  const [roles, setRoles] = useState([]); // All possible roles
  const [selectedApprovers, setSelectedApprovers] = useState(approvalStatus); // Existing approvers

  // Fetch roles on mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get('/roles'); // Fetch available roles
        setRoles(response.data.data); // Assuming roles come in 'data' field
      } catch (error) {
        console.log('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  // Toggle selection of approver
  const handleToggleApprover = roleName => {
    if (selectedApprovers.includes(roleName)) {
      // Remove the approver
      const updatedApprovers = selectedApprovers.filter(
        approver => approver !== roleName,
      );
      setSelectedApprovers(updatedApprovers);
    } else {
      // Add the approver
      setSelectedApprovers(prev => [...prev, roleName]);
    }
  };

  // Submit updated approvers
  const handleSubmit = async () => {
    try {
      await axiosInstance.put(`/raza/manageRaza`, {
        id: razaid,
        data: {
          approval_status: selectedApprovers,
        },
      });
      toast('success', 'Updated', 'Approver List Updated', 2000);
      navigation.goBack(); // Go back after successful submission
      console.log(selectedApprovers);
    } catch (error) {
      console.log('Error updating approvers:', error);
    }
  };

  const renderRole = ({item}) => {
    const isSelected = selectedApprovers.includes(item.name);
    return (
      <View style={styles.roleItem}>
        <Text style={styles.roleName}>{item.name}</Text>
        <Checkbox
          status={isSelected ? 'checked' : 'unchecked'}
          onPress={() => handleToggleApprover(item.name)}
        />
      </View>
    );
  };

  return (
    <>
      <Appbar.Header style={{backgroundColor: '#FEF7E6'}}>
        <Appbar.Content title="Select Approvers" color="#AD7E05" />
        <Appbar.Action icon="check" color="#AD7E05" onPress={handleSubmit} />
      </Appbar.Header>
      <View style={styles.container}>
        <Text style={styles.title}>Select Roles to Add as Approvers</Text>
        <FlatList
          data={roles}
          renderItem={renderRole}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </>
  );
};

export default AddApprover;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 20, fontWeight: 'bold', color: 'black', marginBottom: 10},
  listContainer: {paddingBottom: 20},
  roleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FEF7E6',
    borderRadius: 10,
    marginBottom: 8,
  },
  roleName: {fontSize: 18, color: 'black'},
});
