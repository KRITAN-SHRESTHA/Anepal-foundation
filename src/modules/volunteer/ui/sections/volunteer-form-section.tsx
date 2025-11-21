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
import { trpc } from '@/trpc/client';
import useGetLocale from '@/hooks/use-get-locale';

// Manual occupations data
const occupationsList = [
  'Student',
  'Teacher/Educator',
  'Healthcare Professional',
  'Engineer',
  'Business Professional',
  'Social Worker',
  'Artist/Creative',
  'Farmer/Agriculture',
  'Entrepreneur',
  'IT Professional',
  'Retired',
  'Homemaker',
  'Other'
];

export default function VolunteerFormSection() {
  const [data] = trpc.volunteer.getVolunteerView.useSuspenseQuery();
  const { getLocalizedString } = useGetLocale();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    occupation: ''
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!data?.formSection) return null;

  const { badge_text, title, description } = data.formSection;

  // Use tRPC mutation
  const submitVolunteerMutation = trpc.volunteer.submitApplication.useMutation({
    onSuccess: () => {
      setSuccessMsg(
        'Thank you for your application! We will contact you soon.'
      );
      setFormData({
        name: '',
        email: '',
        phone: '',
        dob: '',
        address: '',
        occupation: ''
      });
      setTimeout(() => setSuccessMsg(''), 5000);
    },
    onError: error => {
      setErrorMsg(
        error.message || 'Failed to submit application. Please try again.'
      );
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    try {
      await submitVolunteerMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        address: formData.address,
        occupation: formData.occupation
      });
    } catch (error) {
      console.error('Form submission error:', error);
    }
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
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <EnhancedBadge
                text={getLocalizedString(badge_text ?? []) || 'Join Us Today'}
                variant="yellow"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <EnhancedTitle
                text={
                  getLocalizedString(title ?? []) ||
                  'Volunteer Application Form'
                }
              />
            </motion.div>
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-base text-gray-600 lg:text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {getLocalizedString(description ?? []) ||
                "Fill out the form below to start your journey as a volunteer. We'll get in touch with you shortly."}
            </motion.p>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl lg:p-12"
          >
            {/* Decorative gradient */}
            <div className="from-accent-foreground/10 absolute top-0 right-0 h-64 w-64 bg-gradient-to-br to-purple-500/10 blur-3xl" />

            <form onSubmit={handleSubmit} className="relative space-y-6">
              {/* Success Message */}
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-700"
                >
                  <p className="font-semibold">{successMsg}</p>
                </motion.div>
              )}

              {/* Error Message */}
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
                >
                  <p className="font-semibold">{errorMsg}</p>
                </motion.div>
              )}

              {/* Name */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
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
                  disabled={submitVolunteerMutation.isPending}
                />
              </motion.div>

              {/* Email & Phone */}
              <motion.div
                className="grid gap-6 sm:grid-cols-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
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
                    disabled={submitVolunteerMutation.isPending}
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
                    disabled={submitVolunteerMutation.isPending}
                  />
                </div>
              </motion.div>

              {/* DOB & Occupation */}
              <motion.div
                className="grid gap-6 sm:grid-cols-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
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
                    disabled={submitVolunteerMutation.isPending}
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
                    disabled={submitVolunteerMutation.isPending}
                  >
                    <SelectTrigger className="focus:border-accent-foreground focus:ring-accent-foreground h-12! w-full border-gray-300">
                      <SelectValue
                        placeholder="Select your occupation"
                        className="text-sm"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {occupationsList.map(occupation => (
                        <SelectItem key={occupation} value={occupation}>
                          {occupation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
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
                  disabled={submitVolunteerMutation.isPending}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button
                  type="submit"
                  disabled={submitVolunteerMutation.isPending}
                  size="lg"
                  className="group from-accent-foreground to-accent-foreground/90 h-14 w-[300px] bg-gradient-to-r text-base font-bold uppercase shadow-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="flex items-center gap-3">
                    {submitVolunteerMutation.isPending
                      ? 'Submitting...'
                      : 'Submit Application'}
                    <motion.div
                      animate={{
                        x: submitVolunteerMutation.isPending ? 0 : [0, 5, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: submitVolunteerMutation.isPending
                          ? 0
                          : Infinity,
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
            {/* <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500">
              <span>✓ Secure & Confidential</span>
              <span className="hidden sm:inline">•</span>
              <span>✓ Quick Response</span>
              <span className="hidden sm:inline">•</span>
              <span>✓ No Commitment Required</span>
            </div> */}
          </motion.div>
        </div>
      </ContainerLayout>
    </section>
  );
}
