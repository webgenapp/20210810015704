import client from '../api'
import { FormikHelpers } from 'formik'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Product, ProductError } from '../types'
import ProductForm from './ProductForm'
import { useHistory } from 'react-router-dom'

function CreateProduct() {
  const queryClient = useQueryClient()
  const history = useHistory()
  const createProduct = useMutation<Product, ProductError, Product>(
    (values) => {
      return client.post('/api/v1/products', values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products')
      },
    }
  )

  const handleSubmit = (
    values: Product,
    { setSubmitting }: FormikHelpers<Product>
  ) => {
    createProduct.mutate(values)
    setSubmitting?.(false)
    history.push('/products')
  }

  return <ProductForm onSubmit={handleSubmit} />
}

export default CreateProduct
