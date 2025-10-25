import AnimatedGradientBackground from "@/components/AnimatedGradientBackground";
import { Hero } from "@/components/landing/hero";
import { Showcase } from "@/components/landing/showcase";
import { CheckoutSteps } from "@/components/landing/checkout-steps";
import { PricingTicker } from "@/components/landing/pricing-ticker";
import Navigation from "@/components/common/Navigation";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070a] text-white">
      <AnimatedGradientBackground Breathing startingGap={120} breathingRange={6} animationSpeed={0.03} />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col">
        <header className="px-4 pt-6 md:pt-8">
          {/* <Navigation /> */}
        </header>
        <main className="flex flex-col gap-16 pb-24">
          <Hero primaryCtaHref="/api/digital-experiences" secondaryCtaHref="https://scanner.402.xyz" />
          <PricingTicker />
          <Showcase />
          <CheckoutSteps />
        </main>
      </div>
    </div>
  );
}
