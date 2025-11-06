'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, ShoppingCart, Sparkles, Info, Menu, X } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Luxe Fashion Boutique
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/products" 
              className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Products
            </Link>
            <Link 
              href="/collections" 
              className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Collections
            </Link>
            <Link 
              href="/about" 
              className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-2"
            >
              <Info className="w-4 h-4" />
              About
            </Link>
            <Link 
              href="/cart" 
              className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-2 relative"
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="pt-4 space-y-3">
              <Link 
                href="/products" 
                className="block text-foreground hover:text-primary transition-colors font-medium py-2 flex items-center gap-2"
                onClick={closeMobileMenu}
              >
                <ShoppingBag className="w-4 h-4" />
                Products
              </Link>
              <Link 
                href="/collections" 
                className="block text-foreground hover:text-primary transition-colors font-medium py-2 flex items-center gap-2"
                onClick={closeMobileMenu}
              >
                <Sparkles className="w-4 h-4" />
                Collections
              </Link>
              <Link 
                href="/about" 
                className="block text-foreground hover:text-primary transition-colors font-medium py-2 flex items-center gap-2"
                onClick={closeMobileMenu}
              >
                <Info className="w-4 h-4" />
                About
              </Link>
              <Link 
                href="/cart" 
                className="block text-foreground hover:text-primary transition-colors font-medium py-2 flex items-center gap-2 relative"
                onClick={closeMobileMenu}
              >
                <ShoppingCart className="w-4 h-4" />
                Cart
                {cartCount > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}