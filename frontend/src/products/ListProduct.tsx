import React from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import client from '../api'
import { Product } from '../types'
import { useHistory } from 'react-router-dom'

type ProductPreviewProps = {
  product: Product
  handleEdit: (product: Product) => void
  handleDelete: (product: Product) => void
  handleDetail: (product: Product) => void
}

function ProductPreview({
  product,
  handleEdit,
  handleDelete,
  handleDetail,
}: ProductPreviewProps) {
  return (
    <>
      {product.price}
      <br />
      <button type='button' onClick={() => handleDetail(product)}>
        detail
      </button>
      <button type='button' onClick={() => handleEdit(product)}>
        edit
      </button>
      <button type='button' onClick={() => handleDelete(product)}>
        delete
      </button>
    </>
  )
}

function ListProducts() {
  const history = useHistory()
  const queryClient = useQueryClient() // eslint-disable-line no-unused-vars
  const productsQuery = useQuery<Product[]>('products', () => {
    return client
      .get('/api/v1/products')
      .then((response) => response.data) as Promise<Product[]>
  })

  const deleteProduct = useMutation<any, any, Partial<Product>>(
    ({ id }) => {
      return client.delete(`/api/v1/products/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products')
      },
    }
  )

  const handleEdit = ({ id }: Product) => {
    history.push(`/products/update/${id}`)
  }

  const handleDelete = ({ id }: Product) => {
    deleteProduct.mutate({ id })
  }

  const handleDetail = ({ id }: Product) => {
    history.push(`/products/detail/${id}`)
  }

  return (
    <>
      <p>{productsQuery.data?.length} products</p>
      <ul>
        {productsQuery.data?.map((product) => (
          <li key={product.id}>
            <ProductPreview
              product={product}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDetail={handleDetail}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListProducts
