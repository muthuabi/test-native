import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

const FilterSection = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.container}>
      {categories.map(category => (
        <Chip
          key={category}
          selected={category === selectedCategory}
          onPress={() => onSelectCategory(category)}
          style={styles.chip}
          textStyle={styles.chipText}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Chip>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  chip: {
    margin: 4,
  },
  chipText: {
    fontSize: 12,
  },
});

export default FilterSection;