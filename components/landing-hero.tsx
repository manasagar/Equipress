import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LandingHero() {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Decentralized News Verification
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Equipress is a blockchain-based platform that enables
                community-driven verification and rating of news articles.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/news">
                <Button size="lg">Browse News</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-muted md:h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="space-y-2 text-center">
                  <div className="inline-block rounded-lg bg-background/90 px-3 py-1 text-sm">
                    Powered by Blockchain
                  </div>
                  <div className="text-xl font-medium">
                    Transparent. Trustworthy. Decentralized.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
