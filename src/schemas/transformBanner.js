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
    },
    {
      name: 'textPosition',
      title: 'Text Position',
      type: 'string',
      description: 'Position the text to avoid covering important parts of the image',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' }
        ],
        layout: 'radio'
      },
      initialValue: 'center'
    },
    {
      name: 'textBackdrop',
      title: 'Text Backdrop',
      type: 'boolean',
      description: 'Add a semi-transparent backdrop behind text for better readability',
      initialValue: false
    },
    {
      name: 'backdropStyle',
      title: 'Backdrop Style',
      type: 'object',
      description: 'Customize the text backdrop appearance',
      fields: [
        {
          name: 'opacity',
          title: 'Opacity',
          type: 'number',
          description: 'Backdrop opacity (0.0 to 0.9). Set to 0 for transparent backdrop, useful when you only want blur effect.',
          validation: Rule => Rule.min(0).max(0.9),
          initialValue: 0.25
        },
        {
          name: 'blur',
          title: 'Blur Amount',
          type: 'number',
          description: 'Backdrop blur amount (1-10)',
          validation: Rule => Rule.min(1).max(10).integer(),
          initialValue: 3
        },
        {
          name: 'shape',
          title: 'Shape Style',
          type: 'string',
          options: {
            list: [
              { title: 'Rounded Rectangle', value: 'rounded' },
              { title: 'Oval', value: 'oval' },
              { title: 'Pill', value: 'pill' }
            ],
            layout: 'radio'
          },
          initialValue: 'rounded'
        },
        {
          name: 'glow',
          title: 'Edge Feathering',
          type: 'number',
          description: 'How much the edges fade/blend into the background (0-10). Higher values create more feathered edges.',
          validation: Rule => Rule.min(0).max(10).integer(),
          initialValue: 5
        }
      ]
    }
  ]
}