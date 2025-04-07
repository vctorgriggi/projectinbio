'use client';

import Button from '@/components/ui/Button';
import { useStripe } from '@/hooks/useStripe';
import { useParams } from 'next/navigation';

export default function PlanButtons() {
  const { createStripeCheckout } = useStripe();
  const { profileId } = useParams();

  return (
    <div className="flex gap-4">
      <Button
        onClick={() =>
          createStripeCheckout({
            isSubscription: true,
            metadata: { profileId },
          })
        }
      >
        R$ 9,90 / mês
      </Button>
      <Button
        onClick={() =>
          createStripeCheckout({
            isSubscription: false,
            metadata: { profileId },
          })
        }
      >
        R$ 49,90 Vitalício
      </Button>
    </div>
  );
}
