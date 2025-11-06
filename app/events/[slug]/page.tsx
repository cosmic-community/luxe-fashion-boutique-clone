// app/events/[slug]/page.tsx
import { getEvent } from '@/lib/cosmic'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, MapPin, DollarSign, ArrowLeft, ExternalLink } from 'lucide-react'

interface EventPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await getEvent(slug)
  
  if (!event) {
    return {
      title: 'Event Not Found - Luxe Fashion Boutique'
    }
  }

  const title = event.metadata?.event_name || event.title
  const description = event.metadata?.description || 'Join us for this exclusive fashion event'

  return {
    title: `${title} - Events - Luxe Fashion Boutique`,
    description,
    openGraph: {
      title,
      description,
      images: event.metadata?.event_image?.imgix_url ? [{
        url: `${event.metadata.event_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
        width: 1200,
        height: 630,
        alt: title
      }] : []
    }
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  
  try {
    const event = await getEvent(slug)
    
    if (!event) {
      notFound()
    }

    const title = event.metadata?.event_name || event.title
    const eventDate = event.metadata?.event_date 
      ? new Date(event.metadata.event_date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long'
        })
      : 'Date TBA'

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/events"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>

        {/* Event Detail */}
        <article className="max-w-4xl mx-auto">
          {/* Event Type Badge */}
          {event.metadata?.event_type && (
            <div className="mb-4">
              <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-primary/10 text-primary">
                {event.metadata.event_type.value}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>

          {/* Event Details */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">{eventDate}</span>
            </div>
            
            {event.metadata?.event_time && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{event.metadata.event_time}</span>
              </div>
            )}

            {event.metadata?.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">{event.metadata.location}</span>
              </div>
            )}

            {event.metadata?.price !== undefined && event.metadata?.price !== null && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <span className="font-medium">
                  {event.metadata.price === 0 ? 'Free Event' : `$${event.metadata.price}`}
                </span>
              </div>
            )}
          </div>

          {/* Event Image */}
          {event.metadata?.event_image && (
            <div className="mb-8 aspect-video overflow-hidden rounded-lg">
              <img
                src={`${event.metadata.event_image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Description */}
          {event.metadata?.description && (
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg leading-relaxed">{event.metadata.description}</p>
            </div>
          )}

          {/* Registration Link */}
          {event.metadata?.registration_link && (
            <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="text-xl font-semibold mb-4">Register for this Event</h3>
              <a
                href={event.metadata.registration_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium"
              >
                Register Now
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Event Info Box */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Event Details</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Date</dt>
                <dd className="text-base font-medium">{eventDate}</dd>
              </div>
              
              {event.metadata?.event_time && (
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Time</dt>
                  <dd className="text-base font-medium">{event.metadata.event_time}</dd>
                </div>
              )}

              {event.metadata?.location && (
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Location</dt>
                  <dd className="text-base font-medium">{event.metadata.location}</dd>
                </div>
              )}

              {event.metadata?.event_type && (
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Event Type</dt>
                  <dd className="text-base font-medium">{event.metadata.event_type.value}</dd>
                </div>
              )}

              {event.metadata?.price !== undefined && event.metadata?.price !== null && (
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Price</dt>
                  <dd className="text-base font-medium">
                    {event.metadata.price === 0 ? 'Free' : `$${event.metadata.price}`}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </article>
      </div>
    )
  } catch (error) {
    console.error('Error loading event:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Error Loading Event</h1>
          <p className="text-muted-foreground">Failed to load event details. Please try again later.</p>
        </div>
      </div>
    )
  }
}