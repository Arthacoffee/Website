import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/page-intro";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <PageIntro
        eyebrow="Lost?"
        heading="This page isn't on the menu."
        lead="The page you're looking for doesn't exist, or has moved. Here's where you can go instead."
      />
      <section className="bg-background py-16 md:py-20">
        <Container className="flex justify-center">
          <Reveal className="flex flex-wrap justify-center gap-4">
            <Button href="/">Back Home</Button>
            <Button href="/coffee" variant="outline" className="text-coffee">
              View the Menu
            </Button>
            <Button href="/visit" variant="outline" className="text-coffee">
              Visit Us
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
