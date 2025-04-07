import Header from '@/components/landing-page/Header';
import PlanButtons from './_components/PlanButtons';

export default function UpgradePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Header />
      <h2 className="text-2xl font-bold">Escolha o plano</h2>
      <PlanButtons />
    </div>
  );
}
