const serviceItem = {
    type: 'object',
    name: 'serviceItem',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        title: 'Description',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'href',
        title: 'Link',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'iconType',
        title: 'Icon Type',
        type: 'string',
        options: {
            list: [
                { title: '🏔️ Mountain', value: 'Mountain' },
                { title: '🤝 Heart Handshake', value: 'HeartHandshake' },
                { title: '💭 Message Circle', value: 'MessageCircle' },
                { title: '📋 Layout List', value: 'LayoutList' },
                { title: '⭐ Star', value: 'Star' },
                { title: '🎯 Target', value: 'Target' },
                { title: '💡 Lightbulb', value: 'Lightbulb' },
                { title: '🧭 Compass', value: 'Compass' },
                { title: '📚 Book', value: 'Book' },
                { title: '🎓 Graduation Cap', value: 'GraduationCap' },
                { title: '❤️ Heart', value: 'Heart' },
                { title: '🌟 Sparkles', value: 'Sparkles' },
                { title: '🔄 Refresh', value: 'RefreshCcw' },
                { title: '🎨 Palette', value: 'Palette' },
                { title: '🤔 ThoughtBubble', value: 'HelpCircle' }
              ]
        },
        validation: Rule => Rule.required()
      }
    ],
    preview: {
      select: {
        title: 'title',
        subtitle: 'description'
      }
    }
  }
  
  export const servicesNav = {
    name: 'servicesNav',
    title: 'Services Navigation',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Navigation Title',
        type: 'string',
        initialValue: 'Main Services Navigation',
        hidden: true
      },
      {
        name: 'services',
        title: 'Services',
        type: 'array',
        of: [serviceItem],
        validation: Rule => Rule.required().min(1)
      }
    ],
    preview: {
      select: {
        title: 'title'
      }
    },
    initialValue: {
      services: [
        {
          title: "Life Coaching",
          description: "Transform your life with expert guidance.",
          href: "/life-coaching",
          iconType: "Mountain"
        },
        {
          title: "Dating Coaching",
          description: "Find love with personalized coaching.",
          href: "/dating-coaching",
          iconType: "HeartHandshake"
        },
        {
          title: "Testimonials",
          description: "Hear from our happy clients.",
          href: "/testimonials",
          iconType: "MessageCircle"
        },
        {
          title: "Resources",
          description: "Explore articles and tips for success.",
          href: "/resources",
          iconType: "LayoutList"
        }
      ]
    }
  }