import { MenuSection } from '@/app/components/Sections/MenuSection';
import Hero from '@/app/components/Hero/Hero';

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <div className="px-5 py-6">
        <MenuSection />
      </div>
    </>
  );
}

