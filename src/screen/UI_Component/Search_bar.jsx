import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';

const SearchComponent = ({ placeholder = 'Type Here...', onSearch }) => {
  const [search, setSearch] = useState('');

  const updateSearch = (text) => {
    setSearch(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  return (
    <SearchBar
      placeholder={placeholder}
      onChangeText={updateSearch}
      value={search}
      lightTheme
      containerStyle={{
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        paddingHorizontal: 15, // Added horizontal padding
      }}
      inputContainerStyle={{
        backgroundColor: 'white',
        borderRadius: 30,
        height: 45,
        paddingHorizontal: 10, // Inner padding
      }}
      inputStyle={{ color: 'black' }}
    />
  );
};

export default SearchComponent;
