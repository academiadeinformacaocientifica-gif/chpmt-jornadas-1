import { z } from "zod";

export const CATEGORIAS = [
  "Médico(a)",
  "Enfermeiro(a)",
  "Farmacêutico(a)",
  "Técnico(a) de Diagnóstico",
  "Docente/Estudante",
  "Gestor(a)",
  "Outro",
] as const;

export const inscricaoSchema = z.object({
  nome_completo: z
    .string()
    .trim()
    .min(3, { message: "Indique o seu nome completo" })
    .max(120, { message: "Nome demasiado longo" }),
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido" })
    .max(255, { message: "E-mail demasiado longo" }),
  telefone: z
    .string()
    .trim()
    .regex(/^\+244 9\d{2} \d{3} \d{3}$/, { message: "Use o formato +244 9XX XXX XXX" }),
  categoria_profissional: z.enum(CATEGORIAS, { message: "Selecione a sua categoria" }),
  instituicao: z.string().trim().max(150, { message: "Máximo 150 caracteres" }).optional(),
});

export type InscricaoInput = z.infer<typeof inscricaoSchema>;

export function formatarTelefone(valor: string) {
  const digitos = valor.replace(/\D/g, "").replace(/^244/, "").slice(0, 9);
  const partes = [digitos.slice(0, 3), digitos.slice(3, 6), digitos.slice(6, 9)].filter(Boolean);
  return digitos.length === 0 ? "" : `+244 ${partes.join(" ")}`;
}

export const EVENTO = {
  titulo: '1ª Jornadas Científicas do Complexo Hospitalar Pedro Maria Tonha "Pedalé"',
  lema: "Um ano a transformar a saúde em Angola",
  data: "27 de Setembro de 2026",
  hora: "08:00 AM",
  local: 'Complexo Hospitalar Pedro Maria Tonha "Pedalé" (CHPMT), Luanda',
} as const;
