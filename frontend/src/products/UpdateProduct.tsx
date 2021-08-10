import client from '../api'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import ProductForm from './ProductForm'
import { Product } from '../types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function UpdateProduct() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const history = useHistory()

  const { data, isLoading } = useQuery<Product>(['products', id], () =>
    client.get(`/api/v1/products/${id}`).then((response) => response.data)
  )

  const updateProduct = useMutation<Product, any, Product>(
    (values: Product) =>
      client
        .put(`/api/v1/products/${id}`, values)
        .then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products')
      },
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const product = data as Product
  return (
    <ProductForm
      product={product}
      onSubmit={(values, { setSubmitting }) => {
        updateProduct.mutate(values)
        setSubmitting?.(false)
        history.push('/products')
      }}
    />
  )
}

export default UpdateProduct
