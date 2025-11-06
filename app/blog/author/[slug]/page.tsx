// app/blog/author/[slug]/page.tsx
import { getAuthor, getPostsByAuthor } from '@/lib/cosmic'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthor(slug)
  
  if (!author) {
    return {
      title: 'Author Not Found - Luxe Fashion Boutique'
    }
  }

  const name = author.metadata?.name || author.title
  const bio = author.metadata?.bio || `Articles by ${name}`

  return {
    title: `${name} - Author - Luxe Fashion Boutique`,
    description: bio
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  
  try {
    const author = await getAuthor(slug)
    
    if (!author) {
      notFound()
    }

    const posts = await getPostsByAuthor(author.id)
    const authorName = author.metadata?.name || author.title

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

        {/* Author Header */}
        <div className="mb-12 text-center">
          <div className="flex flex-col items-center">
            {author.metadata?.avatar && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
                alt={authorName}
                className="w-32 h-32 rounded-full object-cover mb-6"
              />
            )}
            <h1 className="text-4xl font-bold mb-4">{authorName}</h1>
            {author.metadata?.bio && (
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                {author.metadata.bio}
              </p>
            )}
            {author.metadata?.email && (
              <a
                href={`mailto:${author.metadata.email}`}
                className="text-primary hover:underline mb-4"
              >
                {author.metadata.email}
              </a>
            )}
            {author.metadata?.social_links && (
              <div className="flex items-center gap-4 text-sm">
                {author.metadata.social_links.twitter && (
                  <a
                    href={author.metadata.social_links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Twitter
                  </a>
                )}
                {author.metadata.social_links.instagram && (
                  <a
                    href={author.metadata.social_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Instagram
                  </a>
                )}
                {author.metadata.social_links.linkedin && (
                  <a
                    href={author.metadata.social_links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Posts Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            Articles by {authorName} ({posts.length})
          </h2>
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
                      {/* Category Badge */}
                      {post.metadata?.category && (
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                            {post.metadata.category.metadata?.name || post.metadata.category.title}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.metadata?.title || post.title}
                      </h3>

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
            <h2 className="text-2xl font-bold mb-4">No posts yet</h2>
            <p className="text-muted-foreground">{authorName} hasn't published any articles yet.</p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error loading author:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Error Loading Author</h1>
          <p className="text-muted-foreground">Failed to load author. Please try again later.</p>
        </div>
      </div>
    )
  }
}