import ProjectCard from '@/components/commons/ProjectCard';
import TotalVisits from '@/components/commons/TotalVisits';
import UserCard from '@/components/commons/user-card/UserCard';
import Link from 'next/link';
import { getProfileData, getProfileProjects } from '@/server/get-profile-data';
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import NewProject from './_components/NewProject';
import { getDownloadURLFromPath } from '@/lib/firebase';
import { increaseProfileVisits } from '@/actions/increase-profile-visits';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;

  const profileData = await getProfileData(profileId);

  if (!profileData) return notFound();

  const projects = await getProfileProjects(profileId);

  const session = await auth();

  const isOwner = profileData.userId === session?.user?.id;

  if (!isOwner) {
    await increaseProfileVisits(profileId);
  }

  if (isOwner && !session?.user.isSubscribed && !session?.user.isTrial) {
    redirect(`/${profileId}/upgrade`);
  }

  return (
    <div className="relative flex h-screen overflow-hidden p-20">
      {session?.user.isTrial && !session.user.isSubscribed && (
        <div className="bg-background-tertiary fixed top-0 left-0 flex w-full items-center justify-center gap-1 py-2">
          <span>Você está usando a versão trial.</span>
          <Link href={`/${profileId}/upgrade`}>
            <button className="text-accent-green font-bold">
              Faça o upgrade agora!
            </button>
          </Link>
        </div>
      )}
      <div className="flex h-min w-1/2 justify-center">
        <UserCard profileData={profileData} isOwner={isOwner} />
      </div>
      <div className="flex w-full flex-wrap content-start justify-center gap-4 overflow-y-auto">
        {projects.map(async (project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isOwner={isOwner}
            img={(await getDownloadURLFromPath(project.imagePath)) || ''}
          />
        ))}
        {isOwner && <NewProject profileId={profileId} />}
      </div>
      {isOwner && (
        <div className="absolute right-0 bottom-4 left-0 mx-auto w-min">
          <TotalVisits totalVisits={profileData.totalVisits} showBar />
        </div>
      )}
    </div>
  );
}
