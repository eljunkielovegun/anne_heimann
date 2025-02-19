// src/lib/sanity.js
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-02-17',
  useCdn: false,
  perspective: 'published',
  token: process.env.SANITY_API_TOKEN, // Add this if you have a token
  stega: false
}

export const client = createClient(config)

// Helper function for generating image URLs
const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)

export async function getHeroContent() {
  try {
    const query = `*[_type == "hero"] | order(_createdAt desc)[0] {
      _createdAt,
      labelText,
      heading,
      mainDescription,
      featureOneHeading,
      featureOneDescription,
      featureTwoHeading,
      featureTwoDescription,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink,
      heroImage
    }`

    // console.log('Executing query:', query);
   
  const data = await client.fetch(query, {}, {
  cache: 'no-store'  // Add this to disable caching
  
});



// console.log('Raw Sanity response:', data);
    // If no data exists yet, return fallback data



    if (!data) {
      console.log('No data found, using fallback');
      return {
        labelText: "Transform",
        heading: "Unlock Your Potential with Anne Heimann",
        mainDescription: "Experience a profound shift in your confidence and relationships. Our coaching empowers you to grow personally and connect deeply.",
        featureOneHeading: "Boost Confidence",
        featureOneDescription: "Gain the self-assurance to pursue your dreams and forge meaningful connections.",
        featureTwoHeading: "Enhance Relationships",
        featureTwoDescription: "Learn to communicate effectively and build lasting, fulfilling relationships.",
        primaryButtonText: "Learn More",
        secondaryButtonText: "Contact"
      }
    }

    return data
  } catch (error) {
    console.error('Error fetching hero content:', error)
    return null
  }
}

export async function getServicesNavContent() {
  try {
    const query = `*[_type == "servicesNav"][0] {
      services[] {
        title,
        description,
        href,
        iconType
      }
    }`
    const data = await client.fetch(query)
    console.log('Services Nav data:', data)
    return data
  } catch (error) {
    console.error('Error fetching services nav:', error)
    return null
  }
}

export async function getTransformBannerContent() {
  try {
    const query = `*[_type == "transformBanner"][0] {
      mainHeading,
      description,
      backgroundImage,
      primaryButton,
      secondaryButton
    }`
    const data = await client.fetch(query)
    console.log('Transform Banner data:', data)
    return data
  } catch (error) {
    console.error('Error fetching transform banner:', error)
    return null
  }
}

export async function getCTABannerContent() {
  try {
    const query = `*[_type == "ctaBanner"][0] {
      mainText,
      linkText,
      linkUrl,
      backgroundColor
    }`
    const data = await client.fetch(query)
    console.log('CTA Banner data:', data)
    return data
  } catch (error) {
    console.error('Error fetching CTA banner:', error)
    return null
  }
}

export async function getServicesSectionContent() {
  try {
    const query = `*[_type == "servicesSection"][0] {
      mainHeading,
      description,
      services[] {
        title,
        description,
        actionText,
        iconType
      }
    }`
    const data = await client.fetch(query)
    console.log('Services Section data:', data)
    return data
  } catch (error) {
    console.error('Error fetching services section:', error)
    return null
  }
}

export async function getContactFormContent() {
  try {
    const query = `*[_type == "contactForm"][0] {
      sectionHeading,
      sectionDescription,
      formFields,
      submitButton,
      successMessage
    }`
    const data = await client.fetch(query)
    console.log('Contact Form data:', data)
    return data
  } catch (error) {
    console.error('Error fetching contact form:', error)
    return null
  }
}

// Connection test function
export async function testSanityConnection() {
  try {
    const data = await client.fetch(`*[_type == "hero"][0]`);
    console.log('Sanity connection test:', data);
    return data;
  } catch (error) {
    console.error('Sanity connection error:', error);
    return null;
  }
}

