// src/app/page.js
import ClientServicesNav from '@/components/ui/ClientServicesNav'
import ClientTransformBanner from '@/components/ui/ClientTransformBanner'
import ClientHeroSection from '@/components/ui/ClientHeroSection'
import ClientCTABanner from '@/components/ui/ClientCTABanner'
import ClientServicesSection from '@/components/ui/ClientServicesSection'
import ClientContactForm from '@/components/ui/ClientContactForm'
import ClientFooter from '@/components/ui/ClientFooter'
import { 
  getHeroContent, 
  getServicesNavContent,
  getTransformBannerContent,
  getCTABannerContent,
  getServicesSectionContent,
  getContactFormContent 
} from '@/lib/sanity'

// Disable Next.js data cache completely to ensure fresh data on every request
// This ensures we always get the latest data when webhook revalidation happens
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default async function Home() {
  const heroData = await getHeroContent()
  const servicesNavData = await getServicesNavContent()
  const transformBannerData = await getTransformBannerContent()
  const ctaBannerData = await getCTABannerContent()
  const servicesSectionData = await getServicesSectionContent()
  const contactFormData = await getContactFormContent()

  return (
    
    <div className="w-full flex flex-col items-center">
 
   
      {/* Client-side only component wrapped in a Client Component */}
      <ClientServicesNav data={servicesNavData} />
      <ClientTransformBanner data={transformBannerData} />
      <ClientHeroSection data={heroData} />
      {/* <ClientCTABanner data={ctaBannerData} /> */}
      <ClientServicesSection data={servicesSectionData} />
      <ClientContactForm data={contactFormData} />
      <ClientFooter />
    </div>
    
  )
}