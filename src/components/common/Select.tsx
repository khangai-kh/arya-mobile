import React, { useState, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useFormikContext } from 'formik';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
import { API } from '../../plugins/axios';
import { RootState } from '../../redux/configureStore';
import { CURRENCIES, PROFILETYPE } from '../../constants/constants';

export interface SelectItem<T> {
  label: string;
  value: 'id' extends keyof T
    ? T['id']
    : 'industries_id' extends keyof T
    ? T['industries_id']
    : 'sector_id' extends keyof T
    ? T['sector_id']
    : string | number;
}

interface GenericSelectProps<T> {
  apiUrl: string;
  fieldName: string;
  label: string;
  styles?: any;
  initialValue?: SelectItem<T> | null;
  onValueChange?: (value: SelectItem<T> | null) => void;
  labelKey?: keyof T;
  valueKey?: keyof T;
}

export const Select = <T extends Record<string, any>>({
  apiUrl,
  fieldName,
  label,
  styles = {},
  initialValue,
  onValueChange,
  labelKey = 'name' as keyof T,
  valueKey = 'id' as keyof T,
}: GenericSelectProps<T>) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<any>();
  const [items, setItems] = useState<SelectItem<T>[]>([]);
  const { token } = useSelector((state: RootState) => state.auth);
  const dropdownRef = useRef<any>(null);
  const { colors } = useTheme();
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const mapItems = (data: T[]): SelectItem<T>[] =>
      data.map((item) => ({
        label: String(
          item[labelKey as keyof T] || item['symbol'] || item['name'] || item['sector_name'] || item['industries_name']  ||''
        ),
        value: item[valueKey as keyof T] || item['id'] || item['sector_id'] || item['industries_id'],
      }));

    const handleInitialValue = (mappedItems: SelectItem<T>[]) => {
      if (initialValue) {
        const matchedInitial =
          mappedItems.find((item) => item.value === initialValue.value) || initialValue;
        setFieldValue(fieldName, matchedInitial);
      } else if (!values[fieldName] && mappedItems.length > 0) {
        setFieldValue(fieldName, mappedItems[0]); // Default to first item if no initialValue
      }
    };

    if (apiUrl === '/local/currencies') {
      if (Array.isArray(CURRENCIES)) {
        const mappedItems = mapItems(CURRENCIES as unknown as T[]);
        setItems(mappedItems);
        handleInitialValue(mappedItems);
      }
    }
    if (apiUrl === '/local/profiles') {
      if (Array.isArray(PROFILETYPE)) {
        const mappedItems = mapItems(PROFILETYPE as unknown as T[]);
        setItems(mappedItems);
        handleInitialValue(mappedItems);
      }
    }
     else {
      const fetchOptions = async () => {
        try {
          const response = await API.get<T[]>(apiUrl, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (Array.isArray(response.data)) {
            const mappedItems = mapItems(response.data);
            setItems(mappedItems);
            handleInitialValue(mappedItems);
          }
        } catch (error) {
          console.error(`Error fetching options from ${apiUrl}:`, error);
        }
      };

      fetchOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  const selectItems = useMemo(() => items, [items]);

  const handleValueChange = (item: SelectItem<T>) => {
    setFieldValue(fieldName, item); // Store the full object in Formik
    if (onValueChange) {
      onValueChange(item);
    }
    setIsFocus(false);
  };

  // Extract the primitive value for Dropdown
  const currentValue = values[fieldName] ? values[fieldName].value : null;

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <Text variant="titleSmall" style={[defaultStyles.label, styles.label]}>
        {label}
      </Text>
      <Dropdown
        ref={dropdownRef}
        style={[
          defaultStyles.dropdown,
          styles.dropdown,
          { borderColor: isFocus ? colors.primary : colors.outline },
        ]}
        placeholderStyle={[defaultStyles.placeholder, styles.placeholder]}
        selectedTextStyle={[defaultStyles.text, styles.text]}
        itemTextStyle={[defaultStyles.text, styles.text]}
        data={selectItems}
        labelField="label"
        valueField="value"
        value={currentValue} // Use the primitive value here
        placeholder={`Select`}
        onChange={handleValueChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        containerStyle={[defaultStyles.dropdownContainer, styles.dropdownContainer]}
        maxHeight={200}
        autoScroll={false}
      />
      {touched[fieldName] && errors[fieldName] && (
        <Text style={[defaultStyles.errorText, styles.errorText]}>
          {typeof errors[fieldName] === 'string' ? errors[fieldName] : (errors[fieldName] as any)?.value || 'Field is required'}
        </Text>
      )}
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  dropdown: {
    borderRadius: 20,
    padding: 12,
    backgroundColor: '#ffffff',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: '#e0e0e0',
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  placeholder: {
    fontSize: 14,
    color: 'grey',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 4,
  },
});