import { createFileRoute } from "@tanstack/react-router";
import {
  Calendar,
  Clock,
  MapPin,
  Stethoscope,
  Syringe,
  Pill,
  Microscope,
  GraduationCap,
  Building2,
  
  QrCode,
} from "lucide-react";

import heroImage from "@/assets/hero-chpmt.jpg";
import { Button } from "@/components/ui/button";
import { FormularioInscricao } from "@/components/FormularioInscricao";
import { EVENTO } from "@/lib/inscricao-schema";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "1ªs Jornadas Científicas CHPMT Pedalé | Inscrições" },
      {
        name: "description",
        content:
          "Inscrição individual nas 1ªs Jornadas Científicas do Complexo Hospitalar Pedro Maria Tonha “Pedalé” — 27 de Setembro de 2026, 08:00, Luanda.",
      },
      { property: "og:title", content: "1ªs Jornadas Científicas CHPMT Pedalé" },
      {
        property: "og:description",
        content:
          "Um ano a transformar a saúde em Angola. Garanta a sua vaga e receba o convite com QR Code.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const PUBLICO = [
  { icone: Stethoscope, titulo: "Médicos" },
  { icone: Syringe, titulo: "Enfermeiros" },
  { icone: Pill, titulo: "Farmacêuticos" },
  { icone: Microscope, titulo: "Técnicos de Diagnóstico e Terapêutica" },
  { icone: GraduationCap, titulo: "Docentes e Estudantes" },
  { icone: Building2, titulo: "Gestores Hospitalares" },
];

const INFOS = [
  { icone: Calendar, rotulo: "Data", valor: EVENTO.data },
  { icone: Clock, rotulo: "Horário", valor: EVENTO.hora },
  { icone: MapPin, rotulo: "Local", valor: 'Complexo Hospitalar "Pedalé" (CHPMT), Luanda' },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-primary/20 bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-bold uppercase tracking-[0.14em] sm:text-xs">
              Complexo Hospitalar Pedro Maria Tonha
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] opacity-80">
              “Pedalé” · CHPMT
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              asChild
              size="sm"
              className="rounded-full bg-background px-4 font-semibold text-primary hover:bg-background/90"
            >
              <a href="#inscricao">Garantir Vaga</a>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-gradient-hero relative overflow-hidden text-primary-foreground">
          <img
            src={heroImage}
            alt="Equipa médica do Complexo Hospitalar Pedro Maria Tonha Pedalé"
            width={1600}
            height={1104}
            className="absolute inset-0 size-full object-cover opacity-25"
          />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <h1 className="animate-rise max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              1ª Jornadas Científicas do Complexo Hospitalar Pedro Maria Tonha “Pedalé”
            </h1>
            <p className="animate-rise mt-4 max-w-2xl text-lg font-bold italic opacity-95 sm:text-2xl">
              “{EVENTO.lema}”
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {INFOS.map(({ icone: Icone, rotulo, valor }) => (
                <div
                  key={rotulo}
                  className="animate-rise rounded-2xl border border-primary-foreground/20 bg-background/12 p-4 backdrop-blur-sm"
                >
                  <Icone className="size-5 opacity-90" />
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] opacity-70">
                    {rotulo}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-snug">{valor}</p>
                </div>
              ))}
            </div>

            <div className="mt-9">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-background px-8 text-base font-bold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-background/90 hover:shadow-[var(--shadow-elevated)]"
              >
                <a href="#inscricao">Realizar Inscrição Individual</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Sobre + público-alvo */}
        <section className="bg-chpmt-bg">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Sobre o evento
                </span>
                <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
                  Um ano de excelência, inovação e compromisso com a saúde
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Ao celebrar o seu primeiro aniversário, o Complexo Hospitalar Pedro Maria Tonha
                  “Pedalé” reúne a comunidade científica e os profissionais de saúde para partilhar
                  conhecimento, apresentar resultados clínicos e discutir o futuro dos cuidados
                  hospitalares em Angola.
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Um dia inteiro de conferências, comunicações livres e debate multidisciplinar,
                  com foco na qualidade assistencial, formação contínua e inovação clínica.
                </p>
                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                  <QrCode className="size-9 shrink-0 text-primary" strokeWidth={1.6} />
                  <p className="text-sm text-muted-foreground">
                    Cada inscrição gera um <strong className="text-foreground">QR Code único</strong>{" "}
                    e um convite em PDF para credenciamento rápido à entrada.
                  </p>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Público-alvo
                </span>
                <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
                  A quem se destinam as Jornadas
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {PUBLICO.map(({ icone: Icone, titulo }) => (
                    <div
                      key={titulo}
                      className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-card)]"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icone className="size-5" />
                      </span>
                      <p className="text-sm font-semibold text-foreground">{titulo}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inscrição */}
        <section id="inscricao" className="scroll-mt-24 bg-background">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Inscrição individual
              </span>
              <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
                Garanta a sua vaga nas Jornadas
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Preencha os seus dados. No final receberá o convite com o QR Code único de acesso.
              </p>
            </div>
            <div className="mt-8">
              <FormularioInscricao />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.14em]">
            Complexo Hospitalar Pedro Maria Tonha “Pedalé”
          </p>
          <p className="mt-2 text-sm opacity-80">
            {EVENTO.data} · {EVENTO.hora} · Luanda, Angola
          </p>
          <p className="mt-6 border-t border-primary-foreground/20 pt-6 text-xs opacity-70">
            © 2026 CHPMT · 1ªs Jornadas Científicas. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
