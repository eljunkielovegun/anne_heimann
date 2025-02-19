// src/app/page.js
import HeroSection from '@/components/sections/HeroSection'
import ServicesNav from '@/components/ui/ServicesNav'
import CTABanner from '@/components/ui/CTABanner'
import ServicesSection from '@/components/sections/ServicesSection'
import TransformBanner from '@/components/sections/TransformBanner'
import ContactForm from '@/components/sections/ContactForm'
import Footer from '@/components/ui/Footer'
import { 
  getHeroContent, 
  getServicesNavContent,
  getTransformBannerContent,
  getCTABannerContent,
  getServicesSectionContent,
  getContactFormContent 
} from '@/lib/sanity'

export const dynamic = 'force-dynamic'
export const revalidate = 0  // This will make the page revalidate on every request

export default async function Home() {
  const heroData = await getHeroContent()
  const servicesNavData = await getServicesNavContent()
  const transformBannerData = await getTransformBannerContent()
  const ctaBannerData = await getCTABannerContent()
  const servicesSectionData = await getServicesSectionContent()
  const contactFormData = await getContactFormContent()

  return (
    <div className="w-full flex flex-col items-center">
      <ServicesNav data={servicesNavData} />
      <TransformBanner data={transformBannerData} />
      <HeroSection data={heroData} />
      <CTABanner data={ctaBannerData} />
      <ServicesSection data={servicesSectionData} />
      <ContactForm data={contactFormData} />
      <Footer />
    </div>
  )
}