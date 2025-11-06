import { getEvents } from '@/lib/cosmic'
import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, MapPin, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Events - Luxe Fashion Boutique',
  description: 'Join us for exclusive fashion events, trunk shows, and VIP shopping experiences at Luxe Fashion Boutique.',
}

export default async function EventsPage() {
  try {
    const events = await getEvents()

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Fashion Events</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join us for exclusive fashion shows, trunk shows, designer meet & greets, and VIP shopping experiences
          </p>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => {
              const eventDate = event.metadata?.event_date 
                ? new Date(event.metadata.event_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : 'Date TBA'

              return (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="group block"
                >
                  <article className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                    {/* Event Image */}
                    {event.metadata?.event_image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={`${event.metadata.event_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                          alt={event.metadata?.event_name || event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Event Type Badge */}
                      {event.metadata?.event_type && (
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                            {event.metadata.event_type.value}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {event.metadata?.event_name || event.title}
                      </h2>

                      {/* Description */}
                      {event.metadata?.description && (
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                          {event.metadata.description}
                        </p>
                      )}

                      {/* Event Details */}
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span>{eventDate}</span>
                        </div>
                        
                        {event.metadata?.event_time && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{event.metadata.event_time}</span>
                          </div>
                        )}

                        {event.metadata?.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="line-clamp-1">{event.metadata.location}</span>
                          </div>
                        )}

                        {event.metadata?.price !== undefined && event.metadata?.price !== null && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 flex-shrink-0" />
                            <span>
                              {event.metadata.price === 0 ? 'Free' : `$${event.metadata.price}`}
                            </span>
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
            <h2 className="text-2xl font-bold mb-4">No events scheduled</h2>
            <p className="text-muted-foreground">Check back soon for upcoming fashion events!</p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error loading events:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Error Loading Events</h1>
          <p className="text-muted-foreground">Failed to load events. Please try again later.</p>
        </div>
      </div>
    )
  }
}