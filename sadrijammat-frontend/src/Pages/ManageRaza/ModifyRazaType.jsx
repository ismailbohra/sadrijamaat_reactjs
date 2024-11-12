import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import DragList from 'react-native-draglist';
import { Appbar, Menu } from 'react-native-paper';
import { navigationRef } from '../../App';
import axiosInstance from '../../utils/axios_instance';

const ManageRazaFields = ({route, navigation}) => {
  const {razaid} = route.params;
  const [razaData, setRazaData] = useState(null);
  const isFocused = useIsFocused();


  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleupdate = async () => {
    const updatedata = {
      id: razaData._id,
      data: razaData,
    };
    closeMenu()
    await axiosInstance
      .put('raza/manageRaza', updatedata)
      .then(e => showToast('success', 'Successfuly', 'Order Updated'));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        `raza/manageRaza/getraza/${razaid}`,
      );
      setRazaData(response.data.data);
    };
    fetchData();
  }, [isFocused]);

  const handleAddOption = field_id => {
    console.log(field_id);
    navigation.navigate('AddOption', {razaid, field_id});
  };

  const handleRemoveField = async field_id => {
    const updatedFields = razaData.fields.filter(
      field => field._id !== field_id,
    );
    setRazaData(prev => ({...prev, fields: updatedFields}));

    const updatedRazaData = {
      id: razaData._id,
      data: {...razaData, fields: updatedFields},
    };
    handleupdate();
  };

  const renderFieldCard = ({item, onDragStart, onDragEnd, isActive}) => {
    return (
      <TouchableOpacity
        style={[styles.fieldCard, {shadow: isActive ? 18 : 1}]}
        onLongPress={onDragStart}
        onPressOut={onDragEnd}
        disabled={isActive}>
        <Text style={styles.fieldName}>{item.name}</Text>
        <Text style={styles.text}>
          {item.is_required ? 'Required' : 'Optional'}
        </Text>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>{item.type}</Text>
        {/* Show add options UI if field type is select */}
        {item.type === 'select' && (
          <View>
            {item.options &&
              item.options.map((option, index) => (
                <Text style={styles.optiontext} key={index}>
                  {option.label}
                </Text>
              ))}
            <View style={{marginVertical: 15}}>
              <Button
                title="Add/Modify Option"
                color="#AD7E05"
                onPress={() => handleAddOption(item._id)}
              />
            </View>
          </View>
        )}
        {/* Edit and Remove buttons */}
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditField', {field: item, razaid: razaid})
            }>
            <Text style={styles.text}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemoveField(item._id)}>
            <Text style={styles.text}>Remove</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  async function onReordered(fromIndex, toIndex) {
    const copy = [...razaData.fields];
    const removed = copy.splice(fromIndex, 1);
    
    copy.splice(toIndex, 0, removed[0]);
    setRazaData(e => ({...e, fields: copy}));
  }
  const AddField = () => {
    closeMenu()
    navigationRef.navigate('AddField', {razaid: razaid});
  };
  


  const ManageApprover = () => {
    closeMenu()
    navigation.navigate('ManageApprover', { razaid });
  };
 

  return (
    <>
    <Appbar.Header style={{ backgroundColor: '#FEF7E6' }}>
      <Appbar.Content title="Sadri Jamaat" color="#AD7E05" />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            onPress={openMenu}
            color="#AD7E05"
          />
        }>
        <Menu.Item title="Add Fields" leadingIcon="plus" onPress={AddField} />
        <Menu.Item
          title="Manage Approver"
          leadingIcon="lock-reset"
          onPress={ManageApprover}
        />
        <Menu.Item title="Update" leadingIcon="check" onPress={handleupdate} />
      </Menu>
    </Appbar.Header>

    <View style={styles.container}>
      <Text style={styles.title}>Manage Raza Fields</Text>
      <View style={styles.dragListContainer}>
        {razaData && razaData.fields && razaData.fields.length > 0 ? (
          <DragList
            contentContainerStyle={{ gap: 20 }}
            data={razaData.fields}
            renderItem={renderFieldCard}
            keyExtractor={item => item._id}
            onReordered={onReordered}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.emptyMessage}>Please Add Fields To Raza</Text>
        )}
      </View>
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, gap: 15},
  title: {fontSize: 24, fontWeight: 'bold', color: 'black', marginBottom: 10},
  dragListContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  fieldCard: {
    padding: 16,
    backgroundColor: '#FEF7E6',
    borderRadius: 20,
    elevation: 2,
    marginHorizontal: 2,
    marginBottom: 8,
  },
  fieldName: {fontSize: 18, fontWeight: 'bold', color: 'black'},
  icons: {flexDirection: 'row', justifyContent: 'space-between'},
  text: {color: 'black', marginVertical: 5},
  optiontext: {color: 'black', marginLeft: 10, marginVertical: 5},
  approverName: { fontSize: 18, fontWeight: 'bold', color: 'black' },
});

export default ManageRazaFields;
