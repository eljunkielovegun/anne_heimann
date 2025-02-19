const serviceCard = {
    type: 'object',
    name: 'serviceCard',
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
        type: 'text',
        validation: Rule => Rule.required()
      },
      {
        name: 'actionText',
        title: 'Action Text',
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
                { title: '🤔 ThoughtBubble', value: 'HelpCircle' },
                { title: '✨ Magic', value: 'Wand2' }
              ]
        },
        validation: Rule => Rule.required()
      }
    ]
  }
  
  export const servicesSection = {
    name: 'servicesSection',
    title: 'Services Section',
    type: 'document',
    fields: [
      {
        name: 'mainHeading',
        title: 'Main Heading',
        type: 'string',
        initialValue: "Unlock Your Potential with Our Comprehensive Coaching Services",
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        initialValue: "Our personalized coaching sessions are designed to help you navigate the complexities of dating and relationships. Join our engaging workshops to gain practical skills and insights. Explore our extensive online resources for ongoing support and guidance.",
        validation: Rule => Rule.required()
      },
      {
        name: 'services',
        title: 'Service Cards',
        type: 'array',
        of: [serviceCard],
        validation: Rule => Rule.required().min(1),
        initialValue: [
          {
            title: "Transform Your Life with Tailored Coaching and Workshops",
            description: "Experience growth and empowerment through our expert-led services.",
            actionText: "Learn More",
            iconType: "Mountain"
          },
          {
            title: "Engage with Our Community for Lasting Connections and Support",
            description: "Join our community to connect with like-minded individuals on your journey.",
            actionText: "Sign Up",
            iconType: "HeartHandshake"
          },
          {
            title: "Access Valuable Online Resources for Continuous Learning and Growth",
            description: "Utilize our curated resources to enhance your dating skills and knowledge.",
            actionText: "Explore",
            iconType: "LayoutList"
          }
        ]
      }
    ]
  }