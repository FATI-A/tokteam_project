import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from "react-native";

const Barsearch = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={styles.style}
      
    />
  );
};

export default Barsearch;
const styles = StyleSheet.create({
  style:{
    backgroundColor: "#f1f1f1",
    marginTop:10,
    width:"82%",
    marginLeft:5
  }
})
