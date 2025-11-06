import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Luxe Fashion Boutique',
  description: 'Read the Terms of Service for Luxe Fashion Boutique. Learn about our policies, user agreements, and guidelines.',
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl text-muted-foreground">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Welcome to Luxe Fashion Boutique. These Terms of Service ("Terms") govern your access to and use of our website, 
                products, and services. By accessing or using our services, you agree to be bound by these Terms.
              </p>
              <p>
                Please read these Terms carefully before using our services. If you do not agree with any part of these Terms, 
                you may not access or use our services.
              </p>
            </div>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-3xl font-bold mb-4">2. Account Registration</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                To access certain features of our services, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </div>
          </section>

          {/* Product Information and Pricing */}
          <section>
            <h2 className="text-3xl font-bold mb-4">3. Product Information and Pricing</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, 
                pricing, or other content is accurate, complete, reliable, current, or error-free.
              </p>
              <p>
                We reserve the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modify or discontinue products without notice</li>
                <li>Correct pricing errors</li>
                <li>Refuse or cancel orders at our discretion</li>
                <li>Limit quantities purchased per person or household</li>
              </ul>
            </div>
          </section>

          {/* Orders and Payment */}
          <section>
            <h2 className="text-3xl font-bold mb-4">4. Orders and Payment</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                When you place an order, you represent that the products ordered will be used only in a lawful manner. 
                All orders are subject to acceptance and availability. Payment must be received before order processing.
              </p>
              <p>
                We accept the following payment methods:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Major credit cards (Visa, MasterCard, American Express)</li>
                <li>Debit cards</li>
                <li>PayPal and other digital payment services</li>
              </ul>
            </div>
          </section>

          {/* Shipping and Delivery */}
          <section>
            <h2 className="text-3xl font-bold mb-4">5. Shipping and Delivery</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Shipping and delivery times are estimates and not guaranteed. We are not responsible for delays caused by 
                shipping carriers or circumstances beyond our control.
              </p>
              <p>
                Risk of loss and title for products pass to you upon delivery to the shipping carrier.
              </p>
            </div>
          </section>

          {/* Returns and Refunds */}
          <section>
            <h2 className="text-3xl font-bold mb-4">6. Returns and Refunds</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                We want you to be completely satisfied with your purchase. Our return policy allows returns within 30 days 
                of delivery for unworn, undamaged items with original tags attached.
              </p>
              <p>
                Refunds will be processed to the original payment method within 7-10 business days of receiving the returned item. 
                Shipping costs are non-refundable unless the return is due to our error.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-3xl font-bold mb-4">7. Intellectual Property</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property of 
                Luxe Fashion Boutique or its content suppliers and is protected by intellectual property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, or create derivative works from any content without our express 
                written permission.
              </p>
            </div>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-3xl font-bold mb-4">8. User Conduct</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use our services for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our services</li>
                <li>Transmit viruses or malicious code</li>
                <li>Impersonate another person or entity</li>
                <li>Collect or harvest information about other users</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-3xl font-bold mb-4">9. Limitation of Liability</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                To the maximum extent permitted by law, Luxe Fashion Boutique shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>
              <p>
                Our total liability to you for all claims arising from or related to our services shall not exceed the amount 
                you paid to us in the twelve months preceding the claim.
              </p>
            </div>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-3xl font-bold mb-4">10. Privacy</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy. 
                By using our services, you consent to our collection and use of personal information as outlined in the Privacy Policy.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-3xl font-bold mb-4">11. Changes to Terms</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. 
                Your continued use of our services after changes are posted constitutes your acceptance of the modified Terms.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-3xl font-bold mb-4">12. Governing Law</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of New York, 
                without regard to its conflict of law provisions.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-3xl font-bold mb-4">13. Contact Information</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="ml-4 space-y-2">
                <p><strong>Email:</strong> tony@cosmicjs.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Address:</strong> 123 Fashion Avenue, New York, NY 10001</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}