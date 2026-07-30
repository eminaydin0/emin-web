import { Navigation } from "@/components/brand/Navigation";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Playground } from "@/components/sections/Playground";
import { GitHubActivity } from "@/components/sections/GitHubActivity";
import { Articles } from "@/components/sections/Articles";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Playground />
        <GitHubActivity />
        <Articles />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
