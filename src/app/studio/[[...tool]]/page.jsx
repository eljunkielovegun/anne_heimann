'use client'

import { NextStudio } from 'next-sanity/studio'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@/schemas'
import { colorInput } from '@sanity/color-input'

const config = defineConfig({
  name: 'default',
  title: 'Content Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  basePath: '/studio',
  schema: {
    types: schemaTypes,
  },
  plugins: [deskTool(), visionTool(), colorInput()],
  document: {
    // You can add custom document actions here if needed
    actions: []
  }
})

export default function StudioPage() {
  return (
    <NextStudio config={config} />
  )
}