import { Metadata } from 'next'
import { getTermsOfService } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Terms of Service - Luxe Fashion Boutique',
  description: 'Read the Terms of Service for Luxe Fashion Boutique. Learn about our policies, user agreements, and guidelines.',
}

export default async function TermsPage() {
  // Fetch Terms of Service from Cosmic CMS
  const terms = await getTermsOfService()

  // Fallback content if no terms are found in CMS
  if (!terms) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">
              Terms of Service content not available. Please check back later.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Format the last updated date
  const lastUpdated = terms.metadata?.last_updated 
    ? new Date(terms.metadata.last_updated).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      })
    : new Date().toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      })

  // Sort sections by section_order
  const sections = terms.metadata?.sections?.sort((a, b) => 
    (a.section_order || 0) - (b.section_order || 0)
  ) || []

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {terms.metadata?.page_title || terms.title || 'Terms of Service'}
          </h1>
          <p className="text-xl text-muted-foreground">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          {sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-3xl font-bold mb-4">
                {index + 1}. {section.section_title}
              </h2>
              <div 
                className="text-muted-foreground leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: section.section_content }}
              />
            </section>
          ))}

          {/* Contact Information Section (if provided in metadata) */}
          {(terms.metadata?.contact_email || terms.metadata?.contact_phone || terms.metadata?.contact_address) && (
            <section>
              <h2 className="text-3xl font-bold mb-4">
                {sections.length + 1}. Contact Information
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="ml-4 space-y-2">
                  {terms.metadata?.contact_email && (
                    <p><strong>Email:</strong> {terms.metadata.contact_email}</p>
                  )}
                  {terms.metadata?.contact_phone && (
                    <p><strong>Phone:</strong> {terms.metadata.contact_phone}</p>
                  )}
                  {terms.metadata?.contact_address && (
                    <p><strong>Address:</strong> {terms.metadata.contact_address}</p>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}