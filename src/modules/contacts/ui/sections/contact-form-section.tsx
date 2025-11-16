'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { trpc } from '@/trpc/client';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

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
    <form
      autoComplete="off"
      className="mx-auto flex w-full max-w-[500px] flex-col gap-6 rounded-lg border p-4 sm:p-10 md:max-w-[400px]"
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
          rows={10}
          cols={40}
          maxLength={2000}
          required
          id="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? `${t('Sending')}` : `${t('Send_Message')}`}
      </Button>
    </form>
  );
}
