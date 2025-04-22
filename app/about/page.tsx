import { HowItWorks } from "@/components/how-it-works";
import { RoleSelection } from "@/components/role-selection";
import { TokenEconomy } from "@/components/token-economy";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">About Equipress</h1>
        <p className="text-muted-foreground">
          Learn how our decentralized news verification platform works
        </p>
      </div>

      <div className="prose max-w-none dark:prose-invert">
        <p>
          Equipress is a blockchain-based platform that enables community-driven
          verification and rating of news articles. Our mission is to create a
          more transparent and trustworthy news ecosystem by leveraging the
          power of decentralization.
        </p>

        <p>
          Unlike traditional news platforms, Equipress uses a distributed
          network of reporters, analyzers, and validators to ensure that
          information is accurate, balanced, and reliable. All verification
          activities are recorded on the blockchain, creating an immutable
          record of the verification process.
        </p>

        <h2>Our Vision</h2>

        <p>
          We believe that access to accurate information is essential for a
          functioning society. By creating a platform where news can be verified
          by a diverse community of experts and enthusiasts, we aim to combat
          misinformation and restore trust in media.
        </p>

        <p>
          Our long-term vision is to create a self-sustaining ecosystem where
          quality journalism is rewarded, and where readers can easily
          distinguish between reliable and unreliable sources of information.
        </p>
      </div>

      <HowItWorks />
      <TokenEconomy />
      <RoleSelection />
    </div>
  );
}
