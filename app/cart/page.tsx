'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart()

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some luxury items to your cart to get started
          </p>
          <Link 
            href="/products"
            className="inline-block bg-black text-white py-3 px-8 rounded font-medium hover:bg-gray-800 transition-colors"
          >
            Shop Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const productName = item.product.metadata?.product_name || item.product.title
              const price = item.product.metadata?.price || 0
              const image = item.product.metadata?.product_images?.[0]

              return (
                <div key={`${item.product.id}-${item.selectedSize || 'no-size'}`} className="bg-white border rounded-lg p-4 flex gap-4">
                  {/* Product Image */}
                  <Link href={`/products/${item.product.slug}`} className="flex-shrink-0">
                    {image ? (
                      <img
                        src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                        alt={productName}
                        className="w-24 h-24 object-cover rounded"
                        width={200}
                        height={200}
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.slug}`}>
                      <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                        {productName}
                      </h3>
                    </Link>
                    {item.selectedSize && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Size: {item.selectedSize}
                      </p>
                    )}
                    <p className="text-lg font-semibold mt-2">
                      ${price.toLocaleString()}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                        className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100 transition-colors"
                      >
                        −
                      </button>
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                        className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                        className="ml-auto text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      ${(price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full bg-black text-white py-3 px-6 rounded font-medium hover:bg-gray-800 transition-colors mb-3">
                Proceed to Checkout
              </button>
              
              <Link 
                href="/products"
                className="block w-full text-center border border-gray-300 text-gray-700 py-3 px-6 rounded font-medium hover:border-gray-400 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}