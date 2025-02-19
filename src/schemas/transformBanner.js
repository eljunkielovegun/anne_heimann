export const transformBanner = {
  name: 'transformBanner',
  title: 'Transform Banner',
  type: 'document',
  fields: [
    {
      name: 'mainHeading',
      title: 'Main Heading',
      type: 'string',
      initialValue: "Transform Your Life and Love Today",
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      initialValue: "Unlock your potential and find true connection with expert guidance from a dedicated life and dating coach. Discover practical strategies to enhance your relationships and achieve personal growth.",
      validation: Rule => Rule.required()
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          initialValue: "Transform your life",
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: "Learn More"
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          initialValue: "/learn-more"
        }
      ]
    },
    {
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: "Sign Up"
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          initialValue: "/sign-up"
        }
      ]
    }
  ]
}