'use client';

import React, { useState } from 'react';
import { StatefulButton } from '@/components/ui/stateful-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import { BackgroundBeams } from '@/components/ui/background-beams';
import { motion } from 'framer-motion';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_API_KEY,
            ...formData,
            subject: `New Message from Portfolio: ${formData.name}`
        }),
      });

      const data = await response.json();

      if (!data.success) throw new Error(data.message || 'Failed to send message');

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto p-4">
      <BackgroundBeams className="absolute inset-0 w-full h-full rounded-3xl -z-10 opacity-40" />
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit} 
        className="space-y-6 relative z-10 bg-neutral-950/50 p-8 rounded-2xl border border-neutral-800 backdrop-blur-sm"
      >
        <div className="space-y-2">
          <Label htmlFor="name" className="text-neutral-300">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="bg-neutral-900 border-neutral-800 text-white focus:ring-neutral-700"
            placeholder="John Doe"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-neutral-300">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="bg-neutral-900 border-neutral-800 text-white focus:ring-neutral-700"
            placeholder="john@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message" className="text-neutral-300">Message</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className="bg-neutral-900 border-neutral-800 text-white focus:ring-neutral-700 min-h-[150px]"
            placeholder="Your message..."
          />
        </div>

        <StatefulButton
          status={status}
          idleText="Send Message"
          loadingText="Sending..."
          successText="Message Sent!"
          errorText="Failed to Send"
          className="w-full bg-white text-black hover:bg-neutral-200"
        />
      </motion.form>
    </div>
  );
};
