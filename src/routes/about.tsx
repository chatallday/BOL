import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { usePages } from "@/lib/cms";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Breath of Life PDC" },
      { name: "description", content: "Learn about Breath of Life PDC, a community charity helping families in Playa del Carmen, Mexico." },
      { property: "og:title", content: "About Us — Breath of Life PDC" },
      { property: "og:description", content: "Our story and community work supporting families in Playa del Carmen." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://breathoflifepdc.org/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://breathoflifepdc.org/about" }],
  }),
  component: About,
});

function About() {
  const { t } = useLang();
  const { data: pages = [] } = usePages();
  const page = pages.find((item) => item.slug === "about" && item.visible);
  const fallback = t(
    "Breath of Life Ministry is a passion project formed in 2020 by Michele Avila to help impoverished families in Playa del Carmen — especially single mothers — in their critical time of need. It began with groceries bought from personal savings; during the pandemic, more people came for help, and the community began raising funds together.",
    "Aliento de Vida es un proyecto nacido en 2020 por Michele Avila para ayudar a familias vulnerables de Playa del Carmen — especialmente madres solteras — en su momento de mayor necesidad. Comenzó con despensas compradas con ahorros personales; durante la pandemia llegaron más personas y la comunidad comenzó a recaudar fondos en conjunto.",
  );

  return (
    <SiteLayout>
      <PageHero title={t("About Us", "Sobre Nosotros")} />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-20">
        <Reveal>
          <img src="/about.jpg" alt={t("Breath of Life community gathering", "Encuentro comunitario de Aliento de Vida")} width={1366} height={768} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl" />
        </Reveal>
        <Reveal delay={100}>
          <article className="whitespace-pre-line text-lg leading-relaxed text-foreground/85">
            {page?.body_en || page?.body_es ? t(page.body_en, page.body_es) : fallback}
          </article>
        </Reveal>
      </section>
    </SiteLayout>
  );
}