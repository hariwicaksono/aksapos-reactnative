import React from 'react'
import { Text } from 'react-native'

import { Container, ProductImage, InfoContainer, ProductName } from './styles'

export default function ProductItem({ product }) {
  return (
    <Container>
      <ProductImage
        source={{ uri: product.media_path }}
      />
      <InfoContainer>
        <ProductName>{product.nama_produk}</ProductName>
        <Text>Harga {product.harga_jual}</Text>
        <Text>Stok {product.stok}</Text>
      </InfoContainer>  
    </Container>
  );
}
