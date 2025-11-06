import { getPosts, getBlogCategories } from '@/lib/cosmic'
import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, User } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - Luxe Fashion Boutique',
  description: 'Read the latest fashion trends, styling tips, and designer insights from Luxe Fashion Boutique.',
}

export default async function BlogPage() {
  try {
    const [posts, categories] = await Promise.all([
      getPosts(),
      getBlogCategories()
    ])

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Fashion Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the latest trends, styling tips, and exclusive insights from the world of luxury fashion
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full border bg-black text-white border-black hover:bg-gray-800 transition-colors"
            >
              All Posts
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                className="px-4 py-2 rounded-full border bg-white text-gray-700 border-gray-300 hover:border-gray-400 transition-colors"
              >
                {category.metadata?.name || category.title}
              </Link>
            ))}
          </div>
        )}

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
                      {/* Category Badge */}
                      {post.metadata?.category && (
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                            {post.metadata.category.metadata?.name || post.metadata.category.title}
                          </span>
                        </div>
                      )}

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
                        {post.metadata?.author && (
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{post.metadata.author.metadata?.name || post.metadata.author.title}</span>
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
            <h2 className="text-2xl font-bold mb-4">No posts yet</h2>
            <p className="text-muted-foreground">Check back soon for fashion insights and styling tips!</p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error loading blog:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Error Loading Blog</h1>
          <p className="text-muted-foreground">Failed to load blog posts. Please try again later.</p>
        </div>
      </div>
    )
  }
}