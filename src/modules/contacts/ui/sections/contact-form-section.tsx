'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { trpc } from '@/trpc/client';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import EnhancedTitle from '@/components/enhanced-title';
import ContainerLayout from '@/components/container-layout';
import { motion } from 'motion/react';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: ''
  });
  const t = useTranslations('ContactPage');

  const { mutate, isPending } = trpc.contact.contactSubmit.useMutation({
    onSuccess: () => {
      toast.success('Message sent successfully!');
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        message: ''
      });
    },
    onError: error => {
      toast.error(error.message || 'Failed to send message');
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    mutate({
      fullName: `${formData.firstname} ${formData.lastname}`.trim(),
      email: formData.email,
      phoneNumber: formData.phone,
      message: formData.message
    });
  }

  return (
    <ContainerLayout className="py-20">
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <EnhancedTitle
          text={t('Leave_a_message')}
          className="text-center text-3xl font-bold uppercase md:text-4xl lg:text-5xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t('We_would_love_to_hear_from_you')}
        </motion.p>
      </motion.div>
      <motion.form
        autoComplete="off"
        className="mx-auto flex max-w-[800px] flex-col gap-6 pt-10"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="firstname">{t('First_Name')}</Label>
            <Input
              type="text"
              required
              id="firstname"
              placeholder={t('First_Name')}
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="lastname">{t('Last_Name')}</Label>
            <Input
              type="text"
              required
              id="lastname"
              placeholder={t('Last_Name')}
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
        </motion.div>
        <motion.div
          className="grid w-full items-center gap-1.5"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Label htmlFor="email">{t('Email')}</Label>
          <Input
            type="email"
            required
            id="email"
            placeholder={t('Email')}
            value={formData.email}
            onChange={handleChange}
          />
        </motion.div>
        <motion.div
          className="grid w-full items-center gap-1.5"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Label htmlFor="phone">{t('Phone')}</Label>
          <Input
            type="tel"
            id="phone"
            required
            placeholder={t('Phone')}
            value={formData.phone}
            onChange={handleChange}
          />
        </motion.div>
        <motion.div
          className="grid w-full gap-1.5"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Label htmlFor="message">{t('Message')}</Label>
          <Textarea
            placeholder={t('Type_your_message_here')}
            rows={60}
            cols={40}
            maxLength={2000}
            required
            id="message"
            value={formData.message}
            onChange={handleChange}
            className="h-[200px]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Button
            type="submit"
            className="from-accent-foreground to-accent-foreground/90 hover:shadow-accent-foreground/20 lg:px-8', relative h-11 w-[200px] overflow-hidden rounded-xs bg-gradient-to-r px-6 font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl lg:h-12"
            disabled={isPending}
          >
            {isPending ? `${t('Sending')}` : `${t('Send_Message')}`}
          </Button>
        </motion.div>
      </motion.form>
    </ContainerLayout>
  );
}
