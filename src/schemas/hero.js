export const hero = {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'labelText',
      title: 'Label Text',
      type: 'string',
      initialValue: "Transform",
      description: 'Top label text (e.g., "Transform")',
      validation: Rule => Rule.required()
    },
    {
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      initialValue: "Unlock Your Potential with Anne Heimann",
      description: 'Main headline (e.g., "Unlock Your Potential with Anne Heimann")',
      validation: Rule => Rule.required()
    },
    {
      name: 'mainDescription',
      title: 'Main Description',
      type: 'text',
      initialValue: "Experience a profound shift in your confidence and relationships. Our coaching empowers you to grow personally and connect deeply.",
      description: 'Main description text below heading'
    },
    {
      name: 'featureOneHeading',
      title: 'First Feature Heading',
      type: 'string',
      initialValue: "Boost Confidence",
      description: 'Heading for first feature box (e.g., "Boost Confidence")'
    },
    {
      name: 'featureOneDescription',
      title: 'First Feature Description',
      type: 'text',
      initialValue: "Gain the self-assurance to pursue your dreams and forge meaningful connections.",
      description: 'Description for first feature box'
    },
    {
      name: 'featureTwoHeading',
      title: 'Second Feature Heading',
      type: 'string',
      initialValue: "Enhance Relationships",
      description: 'Heading for second feature box (e.g., "Enhance Relationships")'
    },
    {
      name: 'featureTwoDescription',
      title: 'Second Feature Description',
      type: 'text',
      initialValue: "Learn to communicate effectively and build lasting, fulfilling relationships.",
      description: 'Description for second feature box'
    },
    {
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      initialValue: "Learn More",
      description: 'Text for the primary button (e.g., "Learn More")'
    },
    {
      name: 'primaryButtonLink',
      title: 'Primary Button Link',
      type: 'string',
      initialValue: "/learn-more"
    },
    {
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
      initialValue: "Contact",
      description: 'Text for the secondary button (e.g., "Contact")'
    },
    {
      name: 'secondaryButtonLink',
      title: 'Secondary Button Link',
      type: 'string',
      initialValue: "/contact"
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          initialValue: "Anne Heimann Coaching",
          description: 'Alternative text for accessibility'
        }
      ]
    }
  ]
}