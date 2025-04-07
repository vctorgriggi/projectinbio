import { manageAuth } from '@/actions/manage-auth';
import { auth } from '@/lib/auth';
import { TrendingUp } from 'lucide-react';
import PortalButton from './PortalButton';

export default async function TotalVisits({
  totalVisits = 0,
  showBar = false,
}: {
  totalVisits?: number;
  showBar?: boolean;
}) {
  const session = await auth();

  return (
    <div className="bg-background-secondary border-border-primary flex w-min items-center gap-5 rounded-xl border px-8 py-3 whitespace-nowrap shadow-lg">
      <span className="font-bold text-white">Total de visitas</span>
      <div className="text-accent-green flex items-center gap-2">
        <span className="text-3xl font-bold">{totalVisits}</span>
        <TrendingUp />
      </div>
      {showBar && (
        <div className="flex items-center gap-2">
          {session?.user.isSubscribed && <PortalButton />}
          <form action={manageAuth}>
            <button>Sair</button>
          </form>
        </div>
      )}
    </div>
  );
}
