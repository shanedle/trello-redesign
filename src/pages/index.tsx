import { useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/layouts/layout-static";
import { Hero, Features, CallToAction, Footer } from "@/components/sections";

import { useAuth } from "@/lib/use-auth";

const Landing = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      router.push("/board");
    }
  }, [user, router]);

  const features = [
    {
      icon: "puzzle",
      title: "Integrations",
      description:
        "Connect the apps your team already uses into your Trello workflow or add a Power-Up to fine-tune your specific needs.",
    },
    {
      icon: "gear",
      title: "Butler Automation",
      description:
        "No-code automation is built into every Trello board. Focus on the work that matters most and let the robots do the rest.",
    },
    {
      icon: "search-heart",
      title: "Trello Enterprise",
      description:
        "The productivity tool teams love, paired with the features and security needed for scale.",
    },
  ];

  const socialLinks = [
    { name: "Instagram", icon: "instagram", href: "#" },
    { name: "Facebook", icon: "facebook", href: "#" },
    { name: "LinkedIn", icon: "linkedin", href: "#" },
    { name: "Twitter", icon: "twitter", href: "#" },
    { name: "YouTube", icon: "youtube", href: "#" },
  ];

  return (
    <Layout>
      <main>
        <Hero
          title="Trello brings all your tasks, teammates, and tools together"
          subtitle="Keep everything in the same place—even if your team isn't."
          imageSrc="/TrelloUICollage.png"
        />
        <Features features={features} />
        <CallToAction
          title="Get started with Trello today"
          subtitle="Join over 2,000,000 teams worldwide that are using Trello to get more done."
        />
        <Footer
          socialLinks={socialLinks}
          disclaimer="This website is a redesign of Trello. Trello is a registered trademark of its respective owner. This website is not affiliated with Trello in any way."
        />
      </main>
    </Layout>
  );
};

export default Landing;
