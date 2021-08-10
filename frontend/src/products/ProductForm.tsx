import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { Product } from '../types'

type CreateProps = {
  product?: Product
  onSubmit: (values: Product, helpers: FormikHelpers<Product>) => void
}

function ProductForm({ product, onSubmit }: CreateProps) {
  const initialValues: Product = {
    price: product ? product.price : '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={() => {
        return {}
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type='text' name='price' placeholder='Price' />

          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default ProductForm
