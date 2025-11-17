'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { Send } from 'lucide-react';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import ContainerLayout from '@/components/container-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const occupations = [
  'Student',
  'Teacher/Educator',
  'Healthcare Professional',
  'Engineer',
  'Business Professional',
  'Social Worker',
  'Artist/Creative',
  'Retired',
  'Other'
];

export default function VolunteerFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    occupation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="relative bg-white py-20 lg:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

      <ContainerLayout>
        <div className="relative mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16 text-center lg:mb-20">
            <EnhancedBadge text="Join Us Today" variant="yellow" />
            <EnhancedTitle text="Volunteer Application Form" />
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 lg:text-lg">
              Fill out the form below to start your journey as a volunteer.
              {"We'll get in touch with you shortly."}
            </p>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl lg:p-12"
          >
            {/* Decorative gradient */}
            <div className="from-accent-foreground/10 absolute top-0 right-0 h-64 w-64 bg-gradient-to-br to-purple-500/10 blur-3xl" />

            <form onSubmit={handleSubmit} className="relative space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold">
                  Your Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={e => handleChange('name', e.target.value)}
                  className="focus:border-accent-foreground focus:ring-accent-foreground h-12 border-gray-300 text-base"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-semibold">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    className="focus:border-accent-foreground focus:ring-accent-foreground h-12 border-gray-300 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-semibold">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+977 9800000000"
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    className="focus:border-accent-foreground focus:ring-accent-foreground h-12 border-gray-300 text-base"
                  />
                </div>
              </div>

              {/* DOB & Occupation */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-base font-semibold">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    required
                    value={formData.dob}
                    onChange={e => handleChange('dob', e.target.value)}
                    className="focus:border-accent-foreground focus:ring-accent-foreground h-12 border-gray-300 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="occupation"
                    className="text-base font-semibold"
                  >
                    Occupation <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.occupation}
                    onValueChange={value => handleChange('occupation', value)}
                    required
                  >
                    <SelectTrigger className="focus:border-accent-foreground focus:ring-accent-foreground h-12 border-gray-300 text-base">
                      <SelectValue placeholder="Select your occupation" />
                    </SelectTrigger>
                    <SelectContent>
                      {occupations.map(occupation => (
                        <SelectItem key={occupation} value={occupation}>
                          {occupation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-base font-semibold">
                  Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="address"
                  type="text"
                  required
                  placeholder="Enter your full address"
                  value={formData.address}
                  onChange={e => handleChange('address', e.target.value)}
                  className="focus:border-accent-foreground focus:ring-accent-foreground h-12 border-gray-300 text-base"
                />
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  size="lg"
                  className="group from-accent-foreground to-accent-foreground/90 hover:shadow-accent-foreground/30 h-14 w-full bg-gradient-to-r text-base font-bold uppercase shadow-xl transition-all duration-300 hover:shadow-2xl"
                >
                  <span className="flex items-center gap-3">
                    Submit Application
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      <Send className="size-5" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </form>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500">
              <span>✓ Secure & Confidential</span>
              <span className="hidden sm:inline">•</span>
              <span>✓ Quick Response</span>
              <span className="hidden sm:inline">•</span>
              <span>✓ No Commitment Required</span>
            </div>
          </motion.div>
        </div>
      </ContainerLayout>
    </section>
  );
}
