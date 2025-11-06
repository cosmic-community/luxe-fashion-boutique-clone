'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product } from '@/types'

export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity: number, selectedSize?: string) => void
  removeFromCart: (productId: string, selectedSize?: string) => void
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('luxe-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('luxe-cart', JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addToCart = (product: Product, quantity: number = 1, selectedSize?: string) => {
    setItems(currentItems => {
      // Check if item already exists in cart (matching product ID and size)
      const existingItemIndex = currentItems.findIndex(
        item => item.product.id === product.id && item.selectedSize === selectedSize
      )

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...currentItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        }
        return updatedItems
      } else {
        // Add new item to cart
        return [...currentItems, { product, quantity, selectedSize }]
      }
    })
  }

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setItems(currentItems =>
      currentItems.filter(
        item => !(item.product.id === productId && item.selectedSize === selectedSize)
      )
    )
  }

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize)
      return
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.product.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const price = item.product.metadata?.price || 0
      return total + (price * item.quantity)
    }, 0)
  }

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
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