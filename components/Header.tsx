'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { cartItemCount } = useCart()

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
              👗 Products
            </Link>
            <Link 
              href="/collections" 
              className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-2"
            >
              ✨ Collections
            </Link>
            <Link 
              href="/about" 
              className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-2"
            >
              ℹ️ About
            </Link>
            <Link 
              href="/cart" 
              className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-2 relative"
            >
              🛒 Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItemCount}
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
              // Close icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
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
                👗 Products
              </Link>
              <Link 
                href="/collections" 
                className="block text-foreground hover:text-primary transition-colors font-medium py-2 flex items-center gap-2"
                onClick={closeMobileMenu}
              >
                ✨ Collections
              </Link>
              <Link 
                href="/about" 
                className="block text-foreground hover:text-primary transition-colors font-medium py-2 flex items-center gap-2"
                onClick={closeMobileMenu}
              >
                ℹ️ About
              </Link>
              <Link 
                href="/cart" 
                className="block text-foreground hover:text-primary transition-colors font-medium py-2 flex items-center gap-2 relative"
                onClick={closeMobileMenu}
              >
                🛒 Cart
                {cartItemCount > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full px-2 py-1 font-bold">
                    {cartItemCount}
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