// app/blog/[slug]/page.tsx
import { getPost } from '@/lib/cosmic'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - Luxe Fashion Boutique'
    }
  }

  const title = post.metadata?.title || post.title
  const description = post.metadata?.excerpt || 'Read this article on Luxe Fashion Boutique blog'

  return {
    title: `${title} - Blog - Luxe Fashion Boutique`,
    description,
    openGraph: {
      title,
      description,
      images: post.metadata?.featured_image?.imgix_url ? [{
        url: `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
        width: 1200,
        height: 630,
        alt: title
      }] : []
    }
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  
  try {
    const post = await getPost(slug)
    
    if (!post) {
      notFound()
    }

    const title = post.metadata?.title || post.title
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
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          {/* Category Badge */}
          {post.metadata?.category && (
            <div className="mb-4">
              <Link
                href={`/blog/category/${post.metadata.category.slug}`}
                className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
              >
                {post.metadata.category.metadata?.name || post.metadata.category.title}
              </Link>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
            {post.metadata?.author && (
              <Link
                href={`/blog/author/${post.metadata.author.slug}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                {post.metadata.author.metadata?.avatar && (
                  <img
                    src={`${post.metadata.author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.metadata?.name || post.metadata.author.title}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="font-semibold text-foreground">
                    {post.metadata.author.metadata?.name || post.metadata.author.title}
                  </div>
                </div>
              </Link>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{publishedDate}</span>
            </div>
            {post.metadata?.read_time && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.metadata.read_time} min read</span>
              </div>
            )}
          </div>

          {/* Featured Image */}
          {post.metadata?.featured_image && (
            <div className="mb-8 aspect-video overflow-hidden rounded-lg">
              <img
                src={`${post.metadata.featured_image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Excerpt */}
          {post.metadata?.excerpt && (
            <div className="text-xl text-muted-foreground mb-8 font-medium leading-relaxed">
              {post.metadata.excerpt}
            </div>
          )}

          {/* Content - Changed: Added proper prose styling classes */}
          {post.metadata?.content && (
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.metadata.content }}
            />
          )}

          {/* Tags */}
          {post.metadata?.tags && post.metadata.tags.length > 0 && (
            <div className="pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-semibold text-muted-foreground">Tags:</span>
                {post.metadata.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          {post.metadata?.author?.metadata?.bio && (
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-4">
                {post.metadata.author.metadata.avatar && (
                  <img
                    src={`${post.metadata.author.metadata.avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.metadata?.name || post.metadata.author.title}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">
                    About {post.metadata.author.metadata?.name || post.metadata.author.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {post.metadata.author.metadata.bio}
                  </p>
                  <Link
                    href={`/blog/author/${post.metadata.author.slug}`}
                    className="text-sm text-primary hover:underline"
                  >
                    View all posts by {post.metadata.author.metadata?.name || post.metadata.author.title}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </article>
      </div>
    )
  } catch (error) {
    console.error('Error loading post:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Error Loading Post</h1>
          <p className="text-muted-foreground">Failed to load post. Please try again later.</p>
        </div>
      </div>
    )
  }
}