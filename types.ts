// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Select-dropdown field interface for consistent typing
interface SelectDropdownField {
  key: string;
  value: string;
}

// Category interface for the new categories object type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    category_name?: string;
    description?: string;
    category_image?: {
      url: string;
      imgix_url: string;
    };
    featured_category?: boolean;
    sort_order?: number;
  };
}

// Product interface matching updated content model
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    product_name?: string;
    description?: string;
    price?: number;
    product_images?: {
      url: string;
      imgix_url: string;
    }[];
    designer_brand?: string;
    category?: SelectDropdownField;
    sizes_available?: string[];
    materials?: string;
    care_instructions?: string;
    in_stock?: boolean;
    featured_product?: boolean;
  };
}

// Collection interface matching your content model
export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    collection_name?: string;
    description?: string;
    collection_image?: {
      url: string;
      imgix_url: string;
    };
    products?: Product[];
    season_year?: string;
    featured_collection?: boolean;
  };
}

// Review interface matching your content model
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    product?: Product;
    customer_name?: string;
    rating?: SelectDropdownField;
    review_title?: string;
    review_content?: string;
    verified_purchase?: boolean;
    size_purchased?: SelectDropdownField;
    approved?: boolean;
  };
}

// Blog Author interface
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    social_links?: {
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
}

// Blog Category interface
export interface BlogCategory extends CosmicObject {
  type: 'blog-categories';
  metadata: {
    name?: string;
    description?: string;
    color?: string;
  };
}

// Blog Post interface
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title?: string;
    excerpt?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: BlogCategory;
    tags?: string[];
    published_date?: string;
    featured_post?: boolean;
    read_time?: number;
  };
}

// Event interface
export interface Event extends CosmicObject {
  type: 'events';
  metadata: {
    event_name?: string;
    description?: string;
    event_date?: string;
    event_time?: string;
    location?: string;
    event_image?: {
      url: string;
      imgix_url: string;
    };
    event_type?: SelectDropdownField;
    price?: number;
    registration_link?: string;
    featured_event?: boolean;
  };
}

// User interface for authentication
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    name?: string;
    email?: string;
    password_hash?: string;
    created_at?: string;
    last_login?: string | null;
    profile_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Terms of Service interface
export interface TermsOfService extends CosmicObject {
  type: 'terms-of-service';
  metadata: {
    page_title?: string;
    last_updated?: string;
    sections?: {
      section_title: string;
      section_content: string;
      section_order: number;
    }[];
    contact_email?: string;
    contact_phone?: string;
    contact_address?: string;
  };
}

// Auth User interface (for JWT payload)
export interface AuthUser {
  userId: string;
  email: string;
  name?: string;
}

// Type literals for select-dropdown values
export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type RatingValue = '1' | '2' | '3' | '4' | '5';
export type EventType = 'Fashion Show' | 'Trunk Show' | 'VIP Shopping Event' | 'Designer Meet & Greet' | 'Workshop';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Utility types
export type ProductWithReviews = Product & {
  reviews?: Review[];
  averageRating?: number;
  reviewCount?: number;
};

// Type guards
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isCollection(obj: CosmicObject): obj is Collection {
  return obj.type === 'collections';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

export function isBlogCategory(obj: CosmicObject): obj is BlogCategory {
  return obj.type === 'blog-categories';
}

export function isEvent(obj: CosmicObject): obj is Event {
  return obj.type === 'events';
}

export function isUser(obj: CosmicObject): obj is User {
  return obj.type === 'users';
}

export function isTermsOfService(obj: CosmicObject): obj is TermsOfService {
  return obj.type === 'terms-of-service';
}