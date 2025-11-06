'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product } from '@/types'

export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, selectedSize?: string) => void
  removeFromCart: (productId: string, selectedSize?: string) => void
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void
  clearCart: () => void
  cartTotal: number
  cartItemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('luxe-fashion-cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('luxe-fashion-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product, selectedSize?: string) => {
    setCart(currentCart => {
      // Check if product with same size already exists
      const existingItemIndex = currentCart.findIndex(
        item => item.product.id === product.id && item.selectedSize === selectedSize
      )

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const newCart = [...currentCart]
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + 1
        }
        return newCart
      } else {
        // Add new item
        return [...currentCart, { product, quantity: 1, selectedSize }]
      }
    })
  }

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCart(currentCart =>
      currentCart.filter(
        item => !(item.product.id === productId && item.selectedSize === selectedSize)
      )
    )
  }

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize)
      return
    }

    setCart(currentCart =>
      currentCart.map(item =>
        item.product.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const cartTotal = cart.reduce((total, item) => {
    const price = item.product.metadata?.price || 0
    return total + price * item.quantity
  }, 0)

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}