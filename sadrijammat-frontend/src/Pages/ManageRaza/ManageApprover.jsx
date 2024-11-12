import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DragList from 'react-native-draglist';
import {Appbar} from 'react-native-paper';
import axiosInstance from '../../utils/axios_instance';

const renderApprovalCard = ({item, onDragStart, onDragEnd, isActive}) => {
  return (
    <TouchableOpacity
      style={[styles.approvalCard, {shadow: isActive ? 18 : 1}]}
      onLongPress={onDragStart}
      onPressOut={onDragEnd}
      disabled={isActive}>
      <Text style={styles.approverName}>{item}</Text>

      <View style={styles.icons}>
        <TouchableOpacity onPress={() => handleRemoveApprover(item)}>
          <Text style={styles.text}>Remove</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const handleRemoveApprover = approverName => {
  const updatedApprovers = razaData.approval_status.filter(
    approver => approver !== approverName,
  );
  setRazaData(prev => ({...prev, approval_status: updatedApprovers}));
};

const ManageApprover = ({route, navigation}) => {
  const {razaid} = route.params;
  const [razaData, setRazaData] = useState(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        `raza/manageRaza/getraza/${razaid}`,
      );
      setRazaData(response.data.data);
    };
    fetchData();
  }, [isFocused]);

  const onReorderedApprovalCard = (fromIndex, toIndex) => {
    const updatedApprovalStatus = [...razaData.approval_status];
    const movedItem = updatedApprovalStatus.splice(fromIndex, 1)[0];
    updatedApprovalStatus.splice(toIndex, 0, movedItem);

    setRazaData(prev => ({...prev, approval_status: updatedApprovalStatus}));
  };
  const addNewApprover = () => {
    navigation.navigate('AddApprover', {razaid: razaData._id,approvalStatus:razaData.approval_status});
  };
  const handleupdate = async () => {
    const updatedata = {
      id: razaData._id,
      data: razaData,
    };
    await axiosInstance
      .put('raza/manageRaza', updatedata)
      .then(e => showToast('success', 'Successfuly', 'Order Updated'))
      .catch(e => console.log(e));
  };
  console.log('initial', razaData);

  return (
    <>
      <Appbar.Header style={{backgroundColor: '#FEF7E6'}}>
        <Appbar.Content title="Manage Approver" color="#AD7E05" />
        <Appbar.Action icon="plus" color="#AD7E05" onPress={addNewApprover} />
        <Appbar.Action icon="check" color="#AD7E05" onPress={handleupdate} />
      </Appbar.Header>
      <View style={styles.container}>
        <Text style={styles.title}>Manage Approval Status</Text>
        <View style={styles.dragListContainer}>
          {razaData &&
          razaData.approval_status &&
          razaData.approval_status.length > 0 ? (
            <DragList
              contentContainerStyle={{gap: 30}}
              data={razaData.approval_status}
              renderItem={renderApprovalCard}
              keyExtractor={(item, index) => index.toString()}
              onReordered={onReorderedApprovalCard}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.emptyMessage}>
              No approvers found, click '+' to add.
            </Text>
          )}
        </View>
      </View>
    </>
  );
};

export default ManageApprover;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, gap: 15},
  title: {fontSize: 24, fontWeight: 'bold', color: 'black', marginBottom: 10},
  dragListContainer: {flex: 1, paddingBottom: 10},
  approvalCard: {
    padding: 16,
    backgroundColor: '#FEF7E6',
    borderRadius: 20,
    elevation: 2,
    marginHorizontal: 2,
    marginBottom: 8,
  },
  approverName: {fontSize: 18, fontWeight: 'bold', color: 'black'},
  icons: {flexDirection: 'row', justifyContent: 'space-between'},
  text: {color: 'black', marginVertical: 5},
  emptyMessage: {fontSize: 16, color: 'gray'},
});
