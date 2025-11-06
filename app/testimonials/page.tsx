import { Metadata } from 'next'
import { getReviews } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'
import { Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Customer Testimonials - Luxe Fashion Boutique',
  description: 'Read what our customers say about their luxury fashion shopping experience at Luxe Fashion Boutique.',
}

export default async function TestimonialsPage() {
  const reviews = await getReviews()
  
  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => {
        const rating = review.metadata?.rating?.key ? parseInt(review.metadata.rating.key) : 0
        return sum + rating
      }, 0) / reviews.length
    : 0

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Customer Testimonials</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Hear from our valued customers about their luxury shopping experience
          </p>
          
          {/* Average Rating Display */}
          {reviews.length > 0 && (
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.round(averageRating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
              <span className="text-muted-foreground">
                ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}
        </div>

        {/* Reviews Grid */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-6">
              <Star className="w-16 h-16 text-gray-300 mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No Reviews Yet</h2>
            <p className="text-muted-foreground mb-6">
              Be the first to share your experience with Luxe Fashion Boutique
            </p>
            <a 
              href="/products" 
              className="btn btn-primary px-8 py-3 inline-block"
            >
              Shop Now
            </a>
          </div>
        )}

        {/* Call to Action */}
        {reviews.length > 0 && (
          <div className="mt-16 text-center py-12 border-t">
            <h2 className="text-3xl font-bold mb-4">Experience Luxury Fashion</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Luxe Fashion Boutique for their designer fashion needs. 
              Discover our curated collections today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="/products" 
                className="btn btn-primary px-8 py-3"
              >
                Shop Products
              </a>
              <a 
                href="/collections" 
                className="btn btn-secondary px-8 py-3"
              >
                View Collections
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}