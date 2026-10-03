import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Sparkles, BookOpen, Palette } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useBlocks } from "@/lib/cms";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/values")({
  head: () => ({
    meta: [
      { title: "Values & Beliefs — Breath of Life PDC" },
      { name: "description", content: "Our mission, vision, objective and faith: a non-denominational Christian ministry of social action in Playa del Carmen." },
      { property: "og:title", content: "Values & Beliefs — Breath of Life PDC" },
      { property: "og:description", content: "Mission, vision, objective and faith behind Breath of Life – Caring in Action." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://breathoflifepdc.org/values" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://breathoflifepdc.org/values" }],
  }),
  component: Values,
});

function Values() {
  const b = useBlocks();
  const { t } = useLang();
  const items = [
    { icon: Target, en: "Mission", es: "Nuestra Misión", body: b("value_mission", t("To provide physical, psychological, and spiritual nourishment.", "Proporcionar alimento físico, psicológico y espiritual a quienes más lo necesitan.")) },
    { icon: Eye, en: "Vision", es: "Nuestra Visión", body: b("value_vision", t("To follow in the footsteps and example of Jesus to share His love and sacrifice.", "Seguir los pasos y el ejemplo de Jesús, compartiendo su amor y sacrificio con todos.")) },
    { icon: Sparkles, en: "Objective", es: "Nuestro Objetivo", body: b("value_objective", t("To empower those in need by providing them with the spiritual, psychological, and socio-economic tools to move forward.", "Empoderar a quienes se encuentran en necesidad, brindándoles herramientas espirituales, emocionales y socioeconómicas que les permitan salir adelante.")) },
    { icon: BookOpen, en: "Our Faith", es: "Nuestra Fe", body: b("value_faith", t("We believe in one God who is the Creator, King, Provider, and Father, who loves everything He has created. He sent His Son and the Holy Spirit to love, guide, and serve all people, regardless of creed, race, socio-economic status, nationality, or gender role.", "Creemos en un solo Dios: creador, rey, proveedor y padre amoroso de toda su creación. Envió a su Hijo y al Espíritu Santo para amar, guiar y servir a todos, sin distinción de credo, color, posición socioeconómica, nacionalidad o rol de género.")) },
  ];
  return (
    <SiteLayout>
      <PageHero kicker="#BreathOfLife #AlientoDeVida" title={t("Foundational Values & Beliefs", "Valores y creencias fundamentales")} sub={b("values_intro", t("Breath of Life – Caring in Action is a non-denominational Christian ministry focused on social action and the personal, psycho-emotional, spiritual, and socio-economic development of individuals. It was born during the pandemic, from a single mother's desire to help other women.", "Breath of Life - Caring in Action es un ministerio cristiano de acción social, sin denominación, dedicado al desarrollo personal, psicoemocional, espiritual y socioeconómico de las personas. Nació en tiempos de pandemia, impulsado por el deseo de una madre soltera de apoyar a otras mujeres en situaciones vulnerables."))} />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-20 md:grid-cols-2">
        {items.map((it, i) => (
          <Reveal key={it.en} delay={i * 80}>
            <div className="h-full rounded-3xl border bg-card p-8">
              <it.icon className="h-8 w-8 text-accent" />
              <h2 className="mt-4 text-2xl font-semibold text-primary">{t(it.en, it.es)}</h2>
              <p className="mt-3 text-muted-foreground">{it.body}</p>
            </div>
          </Reveal>
        ))}
      </section>
      <section className="mx-auto max-w-4xl px-4">
        <Reveal>
          <div className="rounded-3xl bg-primary p-10 text-primary-foreground">
            <Palette className="h-8 w-8" />
            <h2 className="mt-4 text-3xl font-semibold">{t("The meaning of our logo", "El significado de nuestro logo")}</h2>
            <div className="mt-6 flex gap-3">
              <span className="h-10 w-10 rounded-full bg-accent" /><span className="h-10 w-10 rounded-full bg-secondary-foreground ring-2 ring-primary-foreground/30" /><span className="h-10 w-10 rounded-full bg-sky" />
            </div>
            <p className="mt-6 text-lg opacity-90">{b("value_logo", t("Pink represents the Father's unconditional love. Purple represents the spiritual kingdom. Blue represents the heavens.", "Rosa: el amor incondicional del Padre. Morado: el reino espiritual. Azul: los cielos."))}</p>
            <p className="mt-4 italic opacity-80">{t("At Breath of Life, we believe that service and love are the reflection of true faith in action.", "En Breath of Life, creemos que el servicio y el amor son el reflejo de la verdadera fe en acción.")}</p>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
