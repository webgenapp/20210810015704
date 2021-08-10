import React from 'react'
import { useParams } from 'react-router-dom'
import client from '../api'
import { useQuery } from 'react-query'
import { Product } from '../types'

function DetailProduct() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery<Product>(['products', id], () =>
    client.get(`/api/v1/products/${id}`).then((response) => response.data)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const product = data as Product

  return (
    <div>
      <label>{product.price}</label>
      <br />
    </div>
  )
}

export default DetailProduct
