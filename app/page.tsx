import FAQ from '@/components/landing-page/FAQ';
import Header from '@/components/landing-page/Header';
import Hero from '@/components/landing-page/Hero';
import Pricing from '@/components/landing-page/Pricing';
import VideoExplanation from '@/components/landing-page/VideoExplanation';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl">
      <Header />
      <Hero />
      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  );
}
