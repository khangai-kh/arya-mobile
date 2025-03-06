import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useField } from 'formik';
import { API } from '../plugins/axios';

interface User {
  user_id: number;
  full_name: string;
  email: string;
  address: string | null;
  roles: {
    role_id: number;
    role_name: string;
  }[];
}

interface UserSearchProps {
  name: string;
  placeholder: string;
  initialValues?: User[];
}

export const UserSearch = ({ name, placeholder, initialValues = [] }: UserSearchProps) => {
  const [field, , helpers] = useField<number[]>(name);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    helpers.setValue(selectedUsers.map(user => user.user_id));
  }, [helpers, selectedUsers]);

  useEffect(() => {
    const searchUsers = async () => {
      if (searchTerm.length < 3) {
        setSearchResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const { data } = await API.get<User[]>(
          `/api/search-users-with-name?role_id=1&search_name=${encodeURIComponent(searchTerm)}`,
          { headers: { Accept: 'application/json' } }
        );
        setSearchResults(data);
      } catch (error) {
        console.error('Error searching users:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      searchUsers();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const dropdownData = searchResults.map(user => ({
    label: user.full_name,
    value: user.user_id.toString(),
  }));

  const handleSelectUser = (item: { label: string; value: string }) => {
    const selectedUser = searchResults.find(user => user.user_id.toString() === item.value);
    if (selectedUser && !selectedUsers.some(u => u.user_id === selectedUser.user_id)) {
      setSelectedUsers([...selectedUsers, selectedUser]);
    }
    setSearchTerm('');
    setSearchResults([]);
  };

  const removeUser = (userId: number) => {
    setSelectedUsers(selectedUsers.filter(user => user.user_id !== userId));
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        data={dropdownData}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        search = {true}
        searchPlaceholder="Search..."
        value={null}
        onChange={handleSelectUser}
        onChangeText={setSearchTerm}
        maxHeight={200}
      />

      {selectedUsers.length > 0 && (
        <View style={styles.selectedUsersContainer}>
          {selectedUsers.map(user => (
            <View key={user.user_id} style={styles.userTag}>
              <Text style={styles.userTagText}>{user.full_name}</Text>
              <TouchableOpacity onPress={() => removeUser(user.user_id)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    padding: 10,
  },
  dropdown: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  selectedUsersContainer: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  userTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  userTagText: {
    color: '#333',
    marginRight: 4,
  },
  removeButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#666',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
