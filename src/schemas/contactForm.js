export const contactForm = {
    name: 'contactForm',
    title: 'Contact Form Section',
    type: 'document',
    fields: [
      {
        name: 'sectionHeading',
        title: 'Section Heading',
        type: 'string',
        initialValue: "Get in Touch",
        validation: Rule => Rule.required()
      },
      {
        name: 'sectionDescription',
        title: 'Section Description',
        type: 'text',
        initialValue: "Ready to transform your life and relationships? Contact us today to schedule a consultation or learn more about our coaching services.",
        validation: Rule => Rule.required()
      },
      {
        name: 'formFields',
        title: 'Form Fields',
        type: 'object',
        fields: [
          {
            name: 'nameField',
            title: 'Name Field',
            type: 'object',
            fields: [
              {
                name: 'label',
                title: 'Label',
                type: 'string',
                initialValue: "Name"
              },
              {
                name: 'placeholder',
                title: 'Placeholder',
                type: 'string',
                initialValue: "Your full name"
              }
            ]
          },
          {
            name: 'emailField',
            title: 'Email Field',
            type: 'object',
            fields: [
              {
                name: 'label',
                title: 'Label',
                type: 'string',
                initialValue: "Email"
              },
              {
                name: 'placeholder',
                title: 'Placeholder',
                type: 'string',
                initialValue: "your@email.com"
              }
            ]
          },
          {
            name: 'phoneField',
            title: 'Phone Field',
            type: 'object',
            fields: [
              {
                name: 'label',
                title: 'Label',
                type: 'string',
                initialValue: "Phone (Optional)"
              },
              {
                name: 'placeholder',
                title: 'Placeholder',
                type: 'string',
                initialValue: "Your phone number"
              }
            ]
          },
          {
            name: 'messageField',
            title: 'Message Field',
            type: 'object',
            fields: [
              {
                name: 'label',
                title: 'Label',
                type: 'string',
                initialValue: "Message"
              },
              {
                name: 'placeholder',
                title: 'Placeholder',
                type: 'string',
                initialValue: "How can we help you?"
              }
            ]
          }
        ]
      },
      {
        name: 'submitButton',
        title: 'Submit Button',
        type: 'object',
        fields: [
          {
            name: 'text',
            title: 'Button Text',
            type: 'string',
            initialValue: "Send Message"
          }
        ]
      },
      {
        name: 'successMessage',
        title: 'Success Message',
        type: 'object',
        fields: [
          {
            name: 'heading',
            title: 'Success Heading',
            type: 'string',
            initialValue: "Thank you for your message!"
          },
          {
            name: 'description',
            title: 'Success Description',
            type: 'string',
            initialValue: "We'll get back to you as soon as possible."
          }
        ]
      }
    ]
  }