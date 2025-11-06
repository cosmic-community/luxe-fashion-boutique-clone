'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, ShoppingCart, Sparkles, Info, Menu, X, MessageSquare, Mail, BookOpen, UserPlus, LogIn, Calendar, ChevronDown, Building2 } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false)
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false)
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const closeAllDropdowns = () => {
    setIsShopDropdownOpen(false)
    setIsCompanyDropdownOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold text-primary whitespace-nowrap">
            Luxe Fashion Boutique
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 flex-wrap justify-end flex-1">
            {/* Shop Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsShopDropdownOpen(true)}
              onMouseLeave={() => setIsShopDropdownOpen(false)}
            >
              <button 
                className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1.5 whitespace-nowrap pb-2"
                aria-expanded={isShopDropdownOpen}
              >
                <ShoppingBag className="w-4 h-4" />
                Shop
                <ChevronDown className={`w-4 h-4 transition-transform ${isShopDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isShopDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-48 z-50">
                  <div className="bg-white border border-gray-200 rounded-md shadow-lg py-2">
                    <Link 
                      href="/products" 
                      className="block px-4 py-2 text-foreground hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2"
                      onClick={closeAllDropdowns}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      All Products
                    </Link>
                    <Link 
                      href="/collections" 
                      className="block px-4 py-2 text-foreground hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2"
                      onClick={closeAllDropdowns}
                    >
                      <Sparkles className="w-4 h-4" />
                      Collections
                    </Link>
                    <Link 
                      href="/categories" 
                      className="block px-4 py-2 text-foreground hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2"
                      onClick={closeAllDropdowns}
                    >
                      <Building2 className="w-4 h-4" />
                      Categories
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCompanyDropdownOpen(true)}
              onMouseLeave={() => setIsCompanyDropdownOpen(false)}
            >
              <button 
                className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1.5 whitespace-nowrap pb-2"
                aria-expanded={isCompanyDropdownOpen}
              >
                <Info className="w-4 h-4" />
                Company
                <ChevronDown className={`w-4 h-4 transition-transform ${isCompanyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCompanyDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-48 z-50">
                  <div className="bg-white border border-gray-200 rounded-md shadow-lg py-2">
                    <Link 
                      href="/about" 
                      className="block px-4 py-2 text-foreground hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2"
                      onClick={closeAllDropdowns}
                    >
                      <Info className="w-4 h-4" />
                      About
                    </Link>
                    <Link 
                      href="/blog" 
                      className="block px-4 py-2 text-foreground hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2"
                      onClick={closeAllDropdowns}
                    >
                      <BookOpen className="w-4 h-4" />
                      Blog
                    </Link>
                    <Link 
                      href="/events" 
                      className="block px-4 py-2 text-foreground hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2"
                      onClick={closeAllDropdowns}
                    >
                      <Calendar className="w-4 h-4" />
                      Events
                    </Link>
                    <Link 
                      href="/testimonials" 
                      className="block px-4 py-2 text-foreground hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2"
                      onClick={closeAllDropdowns}
                    >
                      <MessageSquare className="w-4 h-4" />
                      Testimonials
                    </Link>
                    <Link 
                      href="/contact" 
                      className="block px-4 py-2 text-foreground hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2"
                      onClick={closeAllDropdowns}
                    >
                      <Mail className="w-4 h-4" />
                      Contact
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link 
              href="/cart" 
              className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1.5 relative whitespace-nowrap"
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login */}
            <Link 
              href="/login" 
              className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1.5 whitespace-nowrap"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>

            {/* Sign Up */}
            <Link 
              href="/signup" 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium flex items-center gap-1.5 whitespace-nowrap"
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
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
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="pt-4 space-y-3">
              {/* Shop Section */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-muted-foreground px-2">Shop</div>
                <Link 
                  href="/products" 
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2 pl-4 flex items-center gap-2"
                  onClick={closeMobileMenu}
                >
                  <ShoppingBag className="w-4 h-4" />
                  All Products
                </Link>
                <Link 
                  href="/collections" 
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2 pl-4 flex items-center gap-2"
                  onClick={closeMobileMenu}
                >
                  <Sparkles className="w-4 h-4" />
                  Collections
                </Link>
                <Link 
                  href="/categories" 
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2 pl-4 flex items-center gap-2"
                  onClick={closeMobileMenu}
                >
                  <Building2 className="w-4 h-4" />
                  Categories
                </Link>
              </div>

              {/* Company Section */}
              <div className="space-y-2 pt-2">
                <div className="text-sm font-semibold text-muted-foreground px-2">Company</div>
                <Link 
                  href="/about" 
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2 pl-4 flex items-center gap-2"
                  onClick={closeMobileMenu}
                >
                  <Info className="w-4 h-4" />
                  About
                </Link>
                <Link 
                  href="/blog" 
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2 pl-4 flex items-center gap-2"
                  onClick={closeMobileMenu}
                >
                  <BookOpen className="w-4 h-4" />
                  Blog
                </Link>
                <Link 
                  href="/events" 
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2 pl-4 flex items-center gap-2"
                  onClick={closeMobileMenu}
                >
                  <Calendar className="w-4 h-4" />
                  Events
                </Link>
                <Link 
                  href="/testimonials" 
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2 pl-4 flex items-center gap-2"
                  onClick={closeMobileMenu}
                >
                  <MessageSquare className="w-4 h-4" />
                  Testimonials
                </Link>
                <Link 
                  href="/contact" 
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2 pl-4 flex items-center gap-2"
                  onClick={closeMobileMenu}
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </Link>
              </div>

              {/* Cart and Auth */}
              <div className="border-t border-gray-200 pt-3 mt-3 space-y-3">
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
                <Link 
                  href="/login" 
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2 flex items-center gap-2"
                  onClick={closeMobileMenu}
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium flex items-center gap-2 w-full"
                  onClick={closeMobileMenu}
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}