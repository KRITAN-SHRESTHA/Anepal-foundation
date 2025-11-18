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
      <div className="mb-10 text-center">
        <EnhancedTitle
          text={'leave a message'}
          className="text-center text-3xl font-bold uppercase md:text-4xl lg:text-5xl"
        />
        <p>
          We would love to hear from you! Please fill out the form below to get
          in touch
        </p>
      </div>
      <form
        autoComplete="off"
        className="mx-auto flex max-w-[800px] flex-col gap-6 pt-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 sm:flex-row">
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
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">{t('Email')}</Label>
          <Input
            type="email"
            required
            id="email"
            placeholder={t('Email')}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="phone">{t('Phone')}</Label>
          <Input
            type="tel"
            id="phone"
            required
            placeholder={t('Phone')}
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="grid w-full gap-1.5">
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
        </div>
        <Button
          type="submit"
          className="from-accent-foreground to-accent-foreground/90 hover:shadow-accent-foreground/20 lg:px-8', relative h-11 w-[200px] overflow-hidden rounded-xs bg-gradient-to-r px-6 font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl lg:h-12"
          disabled={isPending}
        >
          {isPending ? `${t('Sending')}` : `${t('Send_Message')}`}
        </Button>
      </form>
    </ContainerLayout>
  );
}
