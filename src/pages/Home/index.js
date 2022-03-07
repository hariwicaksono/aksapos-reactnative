import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'

import Api from '../../services/api'
import { deleteUser } from '../../utils'
import ProductItem from '../../components/ProductItem'

import { Container, Title, Button, ButtonText, ProductList } from './styles'

export default function Home() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function loadProducts() {

      const response = await Api.get('api/produk')

      console.log(response.data)

      setData(response.data.data);
    }

    loadProducts();
  }, []);

  renderListItem = ({ item }) => <ProductItem product={item} />

  return (
    <Container>
      <ProductList
        data={data}
        keyExtractor={item => String(item.id_produk)}
        renderItem={renderListItem}
        //onRefresh={loadProducts}
        refreshing={refreshing}
      />
    </Container>
  );
}

Home.navigationOptions = ({ navigation }) => {

  return {
    title: 'Home',
    headerBackTitleVisible: true,
    headerRight: () => (
      <TouchableOpacity
        onPress={() => (
          deleteUser().then(() => {
            navigation.navigate('AuthLoading')
          })
        )}
        style={{ marginRight: 10 }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    ),
  };
  
};

Home.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
};
