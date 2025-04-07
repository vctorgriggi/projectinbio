'use client';

import { createProject } from '@/actions/create-project';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import TextArea from '@/components/ui/TextArea';
import TextInput from '@/components/ui/TextInput';
import {
  compressFiles,
  handleImageInput,
  triggerImageInput,
} from '@/lib/utils';
import { ArrowUpFromLine, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';

export default function NewProject({ profileId }: { profileId: string }) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [projectImage, setProjectImage] = useState<string | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  async function handleCreateProject() {
    setIsCreatingProject(true);
    const imagesInput = document.getElementById(
      'imageInput',
    ) as HTMLInputElement;

    if (!imagesInput.files) return;

    const compressedFile = await compressFiles(Array.from(imagesInput.files));

    const formData = new FormData();

    formData.append('file', compressedFile[0]);
    formData.append('profileId', profileId);
    formData.append('projectName', projectName);
    formData.append('projectDescription', projectDescription);
    formData.append('projectUrl', projectUrl);

    await createProject(formData);

    startTransition(() => {
      setIsOpen(false);
      setIsCreatingProject(false);
      setProjectName('');
      setProjectDescription('');
      setProjectUrl('');
      setProjectImage(null);
      router.refresh();
    });
  }

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-background-secondary border-border-secondary flex h-[132px] w-[340px] items-center justify-center gap-2 rounded-[20px] border-dashed hover:border"
      >
        <Plus className="text-accent-green size-10" />
        <span>Novo projeto</span>
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary flex flex-col justify-between gap-10 rounded-[20px] p-8">
          <p className="text-xl font-bold text-white">Novo projeto</p>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="bg-background-tertiary h-[100px] w-[100px] overflow-hidden rounded-xl">
                {projectImage && (
                  <img
                    src={projectImage}
                    alt="Project image"
                    className="object-cover object-center"
                  />
                )}
                {!projectImage && (
                  <button
                    className="h-full w-full"
                    onClick={() => triggerImageInput('imageInput')}
                  >
                    100x100
                  </button>
                )}
              </div>
              <button
                className="flex items-center gap-2 text-white"
                onClick={() => triggerImageInput('imageInput')}
              >
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar imagem</span>
              </button>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProjectImage(handleImageInput(e))}
              />
            </div>
            <div className="flex w-[293px] flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="project-name" className="font-bold text-white">
                  Título do projeto
                </label>
                <TextInput
                  id="project-name"
                  placeholder="Digite o nome do projeto"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="project-description"
                  className="font-bold text-white"
                >
                  Descrição
                </label>
                <TextArea
                  id="project-description"
                  placeholder="Dê uma breve descrição do seu projeto"
                  className="h-36"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="project-url" className="font-bold text-white">
                  URL do projeto
                </label>
                <TextInput
                  type="url"
                  id="project-url"
                  placeholder="Digite a URL do projeto"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="font-bold text-white"
              onClick={() => setIsOpen(false)}
            >
              Voltar
            </button>
            <Button onClick={handleCreateProject} disabled={isCreatingProject}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
