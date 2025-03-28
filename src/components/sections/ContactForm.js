"use client";

import React, { useState } from 'react';
import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Buttons';
import Container from '@/components/ui/Container';

const Input = ({ label, type = 'text', error, ...props }) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-primary font-medium font-body">
      {label}
    </label>
    <input
      type={type}
      className={`px-4 py-3 rounded-md border bg-background transition-colors font-body
        ${error ? 'border-red-500 focus:border-red-500' : 'border-primary/20 focus:border-primary'}
        focus:outline-none focus:ring-2 focus:ring-primary/20`}
      {...props}
    />
    {error && (
      <span className="text-red-500 text-sm mt-1 font-body">{error}</span>
    )}
  </div>
);

const TextArea = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-primary font-medium font-body">
      {label}
    </label>
    <textarea
      className={`px-4 py-3 rounded-md border bg-background transition-colors min-h-[150px] font-body
        ${error ? 'border-red-500 focus:border-red-500' : 'border-primary/20 focus:border-primary'}
        focus:outline-none focus:ring-2 focus:ring-primary/20`}
      {...props}
    />
    {error && (
      <span className="text-red-500 text-sm mt-1 font-body">{error}</span>
    )}
  </div>
);

const ContactForm = ({ data }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const content = {
    sectionHeading: data?.sectionHeading || "Get in Touch",
    sectionDescription: data?.sectionDescription || "Ready to transform your life and relationships? Contact us today to schedule a consultation or learn more about our coaching services.",
    formFields: data?.formFields || {
      nameField: { label: "Name", placeholder: "Your full name" },
      emailField: { label: "Email", placeholder: "your@email.com" },
      phoneField: { label: "Phone (Optional)", placeholder: "Your phone number" },
      messageField: { label: "Message", placeholder: "How can we help you?" }
    },
    submitButton: data?.submitButton || { text: "Send Message" },
    successMessage: data?.successMessage || {
      heading: "Thank you for your message!",
      description: "We'll get back to you as soon as possible."
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <Container size="large" className="bg-background" id="contact">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="flex-1">
          <div className="flex flex-col gap-6 max-w-xl">
            <Typography variant="h2">
              {content.sectionHeading}
            </Typography>
            <Typography variant="body-large">
              {content.sectionDescription}
            </Typography>
          </div>
        </div>

        <div className="flex-1">
          {submitted ? (
            <div className="p-6 bg-accent/10 rounded-lg">
              <Typography variant="h4" className="text-accent">
                {content.successMessage.heading}
              </Typography>
              <Typography variant="body" className="mt-2">
                {content.successMessage.description}
              </Typography>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Input
                label={content.formFields.nameField.label}
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder={content.formFields.nameField.placeholder}
              />
              <Input
                label={content.formFields.emailField.label}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder={content.formFields.emailField.placeholder}
              />
              <Input
                label={content.formFields.phoneField.label}
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={content.formFields.phoneField.placeholder}
              />
              <TextArea
                label={content.formFields.messageField.label}
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                placeholder={content.formFields.messageField.placeholder}
              />
              <Button type="submit" variant="primary" className="mt-4">
                {content.submitButton.text}
              </Button>
            </form>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ContactForm;
