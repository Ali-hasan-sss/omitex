import { setRequestLocale } from "next-intl/server";
import HeroPanoramaBackground from "@/components/HeroPanoramaBackground";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import GatewaySection from "@/components/sections/GatewaySection";
import StatsSection from "@/components/sections/StatsSection";
import SectorsSection from "@/components/sections/SectorsSection";
import PanoramaSection from "@/components/sections/PanoramaSection";
import SummitSection from "@/components/sections/SummitSection";
import VisionSection from "@/components/sections/VisionSection";
import WhyOmanSection from "@/components/sections/WhyOmanSection";
import EventSection from "@/components/sections/EventSection";
import CTASection from "@/components/sections/CTASection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroPanoramaBackground />
      <HeroSection />
      <AboutSection />
      <GatewaySection />
      <StatsSection />
      <SectorsSection />
      <PanoramaSection />
      <SummitSection />
      <VisionSection />
      <WhyOmanSection />
      <EventSection />
      <CTASection />
    </>
  );
}
