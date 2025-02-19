'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.jsx` route
 */
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],
  cors: {
   
      allowedOrigins: ['http://localhost:3000', '*'],
      allowCredentials: true,
      allowHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization'],
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'],

  },
  websocket: {
    enabled: true
  }
})