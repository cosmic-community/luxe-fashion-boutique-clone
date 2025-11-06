'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-block bg-black text-white px-8 py-3 rounded font-medium hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
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
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const productName = item.product.metadata?.product_name || item.product.title
              const price = item.product.metadata?.price || 0
              const image = item.product.metadata?.product_images?.[0]
              const designerBrand = item.product.metadata?.designer_brand

              return (
                <div
                  key={`${item.product.id}-${item.selectedSize || 'no-size'}`}
                  className="flex gap-4 bg-white border rounded-lg p-4"
                >
                  {/* Product Image */}
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="flex-shrink-0"
                  >
                    {image ? (
                      <img
                        src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                        alt={productName}
                        className="w-24 h-24 object-cover rounded"
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
                      <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                        {productName}
                      </h3>
                    </Link>
                    {designerBrand && (
                      <p className="text-sm text-muted-foreground mb-2">{designerBrand}</p>
                    )}
                    {item.selectedSize && (
                      <p className="text-sm text-muted-foreground mb-2">
                        Size: <span className="font-medium">{item.selectedSize}</span>
                      </p>
                    )}
                    <p className="text-lg font-semibold">${price.toLocaleString()}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                        className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                        className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button & Subtotal */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                      className="text-muted-foreground hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <p className="text-lg font-semibold">
                      ${(price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${getCartTotal().toLocaleString()}</span>
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