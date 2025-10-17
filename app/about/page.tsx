import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Luxe Fashion Boutique',
  description: 'Learn about Luxe Fashion Boutique - your destination for premium designer fashion and luxury accessories.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Luxe Fashion Boutique</h1>
          <p className="text-xl text-muted-foreground">
            Your destination for premium designer fashion and luxury accessories
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Our Story */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded with a passion for luxury fashion, Luxe Fashion Boutique has become a premier destination 
                for discerning customers seeking the finest designer pieces. Our curated collections feature 
                exclusive designs from renowned fashion houses and emerging designers who share our commitment 
                to quality and elegance.
              </p>
              <p>
                Every piece in our collection is carefully selected to embody sophistication, craftsmanship, 
                and timeless style. We believe that fashion is more than just clothing—it's an expression of 
                individuality and a celebration of artistry.
              </p>
            </div>
          </section>

          {/* Our Mission */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                At Luxe Fashion Boutique, our mission is to provide an unparalleled shopping experience that 
                combines luxury, convenience, and personalized service. We strive to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Curate exceptional collections from the world's finest designers</li>
                <li>Deliver outstanding customer service with expert fashion guidance</li>
                <li>Maintain the highest standards of quality and authenticity</li>
                <li>Create a seamless shopping experience both online and in-store</li>
                <li>Foster lasting relationships with our valued customers</li>
              </ul>
            </div>
          </section>

          {/* What Sets Us Apart */}
          <section>
            <h2 className="text-3xl font-bold mb-4">What Sets Us Apart</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-3">✨ Curated Selection</h3>
                <p className="text-muted-foreground">
                  Every item is hand-picked by our expert buyers, ensuring only the finest pieces make it to our collection.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-3">🎨 Exclusive Designs</h3>
                <p className="text-muted-foreground">
                  Access to limited edition pieces and exclusive collections you won't find anywhere else.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-3">💎 Premium Quality</h3>
                <p className="text-muted-foreground">
                  We guarantee authenticity and exceptional quality in every piece we offer.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-3">🛍️ Expert Service</h3>
                <p className="text-muted-foreground">
                  Our fashion consultants are here to help you find the perfect pieces for your style.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-8 border-t">
            <h2 className="text-2xl font-bold mb-4">Start Your Luxury Shopping Experience</h2>
            <p className="text-muted-foreground mb-6">
              Explore our curated collections and discover your next statement piece.
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
          </section>
        </div>
      </div>
    </div>
  )
}