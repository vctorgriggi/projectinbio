'use client';

import { saveProfile } from '@/actions/save-profile';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import TextArea from '@/components/ui/TextArea';
import TextInput from '@/components/ui/TextInput';
import {
  compressFiles,
  handleImageInput,
  triggerImageInput,
} from '@/lib/utils';
import { ProfileData } from '@/server/get-profile-data';
import { ArrowUpFromLine, UserPen } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';

export default function EditUserCard({
  profileData,
}: {
  profileData?: ProfileData;
}) {
  const router = useRouter();
  const { profileId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [yourName, setYourName] = useState(profileData?.name || '');
  const [yourDescription, setYourDescription] = useState(
    profileData?.description || '',
  );

  async function handleSaveProfile() {
    setIsSavingProfile(true);

    const imagesInput = document.getElementById(
      'profile-pic-input',
    ) as HTMLInputElement;

    if (!imagesInput.files) return;

    const compressedFile = await compressFiles(Array.from(imagesInput.files));

    if (!profileId) return;

    const formData = new FormData();
    formData.append('profileId', profileId as string);
    formData.append('profilePic', compressedFile[0]);
    formData.append('yourName', yourName);
    formData.append('yourDescription', yourDescription);

    await saveProfile(formData);

    startTransition(() => {
      setIsModalOpen(false);
      setIsSavingProfile(false);
      router.refresh();
    });
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        <UserPen />
      </button>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="bg-background-primary flex flex-col justify-between gap-10 rounded-[20px] p-8">
          <p className="text-xl font-bold text-white">Editar perfil</p>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="bg-background-tertiary h-[100px] w-[100px] overflow-hidden rounded-xl">
                {profilePic && (
                  <img
                    src={profilePic}
                    alt="Profile Picture"
                    className="object-cover object-center"
                  />
                )}
                {!profilePic && (
                  <button
                    onClick={() => triggerImageInput('profile-pic-input')}
                    className="h-full w-full"
                  >
                    100x100
                  </button>
                )}
              </div>
              <button
                onClick={() => triggerImageInput('profile-pic-input')}
                className="flex items-center gap-2 text-white"
              >
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar foto</span>
              </button>
              <input
                id="profile-pic-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProfilePic(handleImageInput(e))}
              />
            </div>
            <div className="flex w-[293px] flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="your-name" className="font-bold text-white">
                  Seu nome
                </label>
                <TextInput
                  id="your-name"
                  placeholder="Digite seu nome"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="your-description">Descrição</label>
                <TextArea
                  id="your-description"
                  placeholder="Fale um pouco sobre você"
                  className="h-36"
                  value={yourDescription}
                  onChange={(e) => setYourDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="font-bold text-white"
            >
              Voltar
            </button>
            <Button onClick={handleSaveProfile} disabled={isSavingProfile}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
