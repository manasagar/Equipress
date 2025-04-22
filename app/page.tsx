import { LandingHero } from "@/components/landing-hero"
import { FeaturedArticles } from "@/components/featured-articles"
import { PlatformStats } from "@/components/platform-stats"
import { HowItWorks } from "@/components/how-it-works"
import { RoleSelection } from "@/components/role-selection"
import { RegistrationInfo } from "@/components/registration-info"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <LandingHero />
      <PlatformStats />
      <FeaturedArticles />
      <HowItWorks />
      <RoleSelection />
      <RegistrationInfo />
    </div>
  )
}
