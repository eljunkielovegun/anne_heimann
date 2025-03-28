import createImageUrlBuilder from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

// In your image.js file
export const urlFor = (source) => {
  if (!source || !source.asset) {
    return ''
  }
  return builder.image(source)

}
