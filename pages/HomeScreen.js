import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ToastAndroid } from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import FilterSection from '../components/FilterSection';
import FeedbackModal from '../components/FeedbackModal';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [feedbackData, setFeedbackData] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, products]);

  const filterProducts = () => {
    let filtered = [...products];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category === selectedCategory
      );
    }
    
    setFilteredProducts(filtered);
  };

  const handleFeedbackSubmit = (feedback) => {
    setFeedbackData(prev => ({
      ...prev,
      [selectedProduct.id]: feedback
    }));
    
    ToastAndroid.show('Feedback submitted!', ToastAndroid.SHORT);
    setModalVisible(false);
  };

  const categories = ['all', ...new Set(products.map(product => product.category))];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search products"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      
      <FilterSection 
        categories={categories} 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard 
            product={item}
            onFeedbackPress={() => {
              setSelectedProduct(item);
              setModalVisible(true);
            }}
            feedback={feedbackData[item.id]}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      
      <FeedbackModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onSubmit={handleFeedbackSubmit}
        product={selectedProduct}
        initialData={selectedProduct ? feedbackData[selectedProduct.id] : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default HomeScreen;