'use client';

import { createLink } from '@/actions/create-link';
import { verifyLink } from '@/actions/verify-link';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { sanitizeLink } from '@/lib/utils';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CreateLinkForm() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [error, setError] = useState('');
  const [link, setLink] = useState(
    sanitizeLink(searchParams.get('link') || ''),
  );

  function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
    setLink(sanitizeLink(e.target.value));
    setError('');
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (link.length === 0) return setError('Escolha um link primeiro :)');

    const isLinkTaken = await verifyLink(link);

    if (isLinkTaken) return setError('Desculpe, esse link ja esta em uso.');

    const isLinkCreated = await createLink(link);

    if (!isLinkCreated)
      return setError('Erro ao criar o perfil. Tente novamente.');

    router.push(`${link}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
        <span className="text-white">projectinbio.com/</span>
        <TextInput value={link} onChange={handleLinkChange} />
        <Button className="w-[126px]">Criar</Button>
      </form>
      <div>
        <span className="text-accent-pink">{error}</span>
      </div>
    </>
  );
}
