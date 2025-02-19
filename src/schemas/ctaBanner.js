export const ctaBanner = {
    name: 'ctaBanner',
    title: 'CTA Banner',
    type: 'document',
    fields: [
      {
        name: 'mainText',
        title: 'Main Text',
        type: 'string',
        initialValue: "Ready to change your life?",
        validation: Rule => Rule.required()
      },
      {
        name: 'linkText',
        title: 'Link Text',
        type: 'string',
        initialValue: "Contact Us",
        validation: Rule => Rule.required()
      },
      {
        name: 'linkUrl',
        title: 'Link URL',
        type: 'string',
        initialValue: "/contact",
        validation: Rule => Rule.required()
      },
      {
        name: 'backgroundColor',
        title: 'Background Color',
        type: 'string',
        initialValue: "#60B374",
        description: "Color in hex format (e.g., #60B374)",
        validation: Rule => Rule.required()
      }
    ]
  }