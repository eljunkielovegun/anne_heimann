// src/schemas/index.js
import { hero } from './hero'
import { servicesNav } from './servicesNav'
import { transformBanner } from './transformBanner'
import { servicesSection } from './servicesSection'
import { ctaBanner } from './ctaBanner'
import { contactForm } from './contactForm'
import { themeSettings } from './themeSettings'


// Export all schema types for Sanity to use
export const schemaTypes = [
  hero, 
  servicesNav, 
  transformBanner, 
  ctaBanner, 
  servicesSection,
  contactForm,
  themeSettings
]

// This is the format Sanity expects in sanity.config.js
export default schemaTypes