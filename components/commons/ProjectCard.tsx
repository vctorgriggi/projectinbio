'use client';

import { increaseProjectVisits } from '@/actions/increase-project-visits';
import { formatUrl } from '@/lib/utils';
import { ProjectData } from '@/server/get-profile-data';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProjectCard({
  project,
  isOwner,
  name,
  description,
  img,
}: {
  project?: ProjectData;
  isOwner?: boolean;
  name?: string;
  description?: string;
  img: string;
}) {
  const { profileId } = useParams();
  const formattedUrl = formatUrl(
    project?.projectUrl || 'https://projectinbio.com',
  );

  async function handleClick() {
    if (!profileId || !project?.id || isOwner) return;

    await increaseProjectVisits(profileId as string, project?.id);
  }

  return (
    <Link href={formattedUrl} target="_blank" onClick={handleClick}>
      <div className="bg-background-secondary hover:border-border-secondary flex h-[132px] w-[340px] gap-5 rounded-[20px] border border-transparent p-3">
        <div className="size-24 flex-shrink-0 overflow-hidden rounded-md">
          <img src={img} alt="Projeto" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col gap-2">
          {isOwner && (
            <span className="text-accent-green text-xs font-bold uppercase">
              {project?.totalVisits || 0} Cliques
            </span>
          )}
          <div className="flex flex-col">
            <span className="font-bold text-white">
              {name || project?.projectName}
            </span>
            <span className="text-content-body text-sm">
              {description || project?.projectDescription}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
