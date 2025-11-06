// app/blog/category/[slug]/page.tsx
import { getBlogCategory, getPostsByCategory } from '@/lib/cosmic'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getBlogCategory(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found - Luxe Fashion Boutique'
    }
  }

  const name = category.metadata?.name || category.title
  const description = category.metadata?.description || `Read posts about ${name}`

  return {
    title: `${name} - Blog - Luxe Fashion Boutique`,
    description
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  
  try {
    const category = await getBlogCategory(slug)
    
    if (!category) {
      notFound()
    }

    const posts = await getPostsByCategory(category.id)
    const categoryName = category.metadata?.name || category.title

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Category Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
          {category.metadata?.description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {category.metadata.description}
            </p>
          )}
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const publishedDate = post.metadata?.published_date 
                ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                    {/* Featured Image */}
                    {post.metadata?.featured_image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                          alt={post.metadata?.title || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      {/* Title */}
                      <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.metadata?.title || post.title}
                      </h2>

                      {/* Excerpt */}
                      {post.metadata?.excerpt && (
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {post.metadata.excerpt}
                        </p>
                      )}

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{publishedDate}</span>
                        </div>
                        {post.metadata?.read_time && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.metadata.read_time} min read</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">No posts found</h2>
            <p className="text-muted-foreground">No posts are currently available in this category.</p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error loading category:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Error Loading Category</h1>
          <p className="text-muted-foreground">Failed to load category. Please try again later.</p>
        </div>
      </div>
    )
  }
}