import { defineConfig } from 'sanity'
import { colorInput } from '@sanity/color-input'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { structure } from './src/sanity/structure'
import { media } from 'sanity-plugin-media' // You may need to install this
import { sanityRevalidate } from './src/sanity/plugins/sanityRevalidate'

// Import schema types
import { hero } from './src/schemas/hero'
import { servicesNav } from './src/schemas/servicesNav'
import { transformBanner } from './src/schemas/transformBanner'
import { servicesSection } from './src/schemas/servicesSection'
import { ctaBanner } from './src/schemas/ctaBanner'
import { contactForm } from './src/schemas/contactForm'
import { themeSettings } from './src/schemas/themeSettings'


// Import environment variables
import { projectId, dataset } from './src/sanity/env'

export default defineConfig({
  name: 'default',
  title: 'Anne Heimann Coaching',
  
  projectId,
  dataset,
  
  plugins: [
    colorInput(),
    deskTool({
      structure
    }),
    visionTool(),
    media(), // Add media library plugin for better image management
    sanityRevalidate(), // Add the revalidation plugin
  ],
  
  schema: {
    types: [
      hero,
      servicesNav,
      transformBanner,
      servicesSection,
      ctaBanner,
      contactForm,
      themeSettings
    ],
  },
  
  form: {
    image: {
      assetSources: [], // Default sources are used if empty
      directUploads: true, // Allow direct uploads from your computer
      // These are the preview settings for images in the Studio
      preview: {
        select: {
          imageUrl: 'asset.url',
          title: 'caption',
          alt: 'alt',
        },
      },
    },
    file: {
      // Similar settings for file fields
      assetSources: [],
      directUploads: true,
    },
  },
  
  // Configure image hotspot and cropping
  image: {
    hotspot: true // Enable hotspot and cropping capabilities
  }
})