import { Github, Instagram, Linkedin, Plus, Twitter } from 'lucide-react';
import Button from '../../ui/Button';
import EditSocialLinks from './EditSocialLinks';
import Link from 'next/link';
import { ProfileData } from '@/server/get-profile-data';
import AddCustomLink from './AddCustomLink';
import { formatUrl } from '@/lib/utils';
import EditUserCard from './EditUserCard';
import { getDownloadURLFromPath } from '@/lib/firebase';

export default async function UserCard({
  profileData,
  isOwner,
}: {
  profileData?: ProfileData;
  isOwner?: boolean;
}) {
  const icons = [Github, Instagram, Linkedin, Twitter, Plus];

  return (
    <div className="flex w-[348px] flex-col items-center gap-5 rounded-3xl border border-white/10 bg-[#121212] p-5 text-white">
      <div className="size-48">
        <img
          src={
            (await getDownloadURLFromPath(profileData?.imagePath)) ||
            '/avatar-fallback.jpg'
          }
          alt="Profile Picture"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <h3 className="min-w-0 overflow-hidden text-3xl font-bold">
            {profileData?.name || 'Seu Nome'}
          </h3>
          {isOwner && <EditUserCard profileData={profileData} />}
        </div>
        <p className="opacity-40">
          {profileData?.description ||
            'Descreva seu perfil em poucas palavras.'}
        </p>
      </div>
      <div className="flex w-full flex-col gap-2">
        <span className="text-xs font-medium uppercase">Links</span>
        <div className="flex gap-3">
          {profileData?.socialMedias?.github && (
            <Link
              href={profileData?.socialMedias?.github}
              target="_blank"
              className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
            >
              <Github />
            </Link>
          )}
          {profileData?.socialMedias?.instagram && (
            <Link
              href={profileData?.socialMedias?.instagram}
              target="_blank"
              className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
            >
              <Instagram />
            </Link>
          )}
          {profileData?.socialMedias?.linkedin && (
            <Link
              href={profileData?.socialMedias?.linkedin}
              target="_blank"
              className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
            >
              <Linkedin />
            </Link>
          )}
          {profileData?.socialMedias?.twitter && (
            <Link
              href={profileData?.socialMedias?.twitter}
              target="_blank"
              className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
            >
              <Twitter />
            </Link>
          )}
          {!profileData &&
            icons.map((Icon, index) => (
              <button
                key={index}
                className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
              >
                <Icon />
              </button>
            ))}
          {isOwner && (
            <EditSocialLinks socialMedias={profileData?.socialMedias} />
          )}
        </div>
      </div>
      <div className="flex min-h-[172px] w-full flex-col gap-3">
        <div className="flex w-full flex-col items-center gap-3">
          {profileData?.link1?.url && profileData?.link1?.title && (
            <Link
              href={formatUrl(profileData?.link1.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData.link1.title}</Button>
            </Link>
          )}
          {profileData?.link2?.url && profileData.link2?.title && (
            <Link
              href={formatUrl(profileData?.link2.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData.link2.title}</Button>
            </Link>
          )}
          {profileData?.link3?.url && profileData.link3?.title && (
            <Link
              href={formatUrl(profileData?.link3.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData.link3.title}</Button>
            </Link>
          )}
          {!profileData && (
            <button className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]">
              <Plus />
            </button>
          )}
          {isOwner && <AddCustomLink />}
        </div>
      </div>
    </div>
  );
}
