import { textEditorComponentsConfig } from '@/lib/text-editor-config';
import { BlockContent } from '@/sanity/types';
import { PortableText } from 'next-sanity';
import React from 'react';

export default function EditorPortableText({ value }: { value: BlockContent }) {
  if (!value) return null;

  return <PortableText value={value} components={textEditorComponentsConfig} />;
}
