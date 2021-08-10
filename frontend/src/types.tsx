export type Product = {
  id?: number

  price: string
}

export type User = {
  id?: number

  username: string

  passwordHash: string
}

export type ProductError = any

export type UserError = any

export type LoginValues = {
  username: string
  password: string
}

export type RegisterValues = {
  username: string
  email: string
  password: string
  passwordConfirm: string
}
