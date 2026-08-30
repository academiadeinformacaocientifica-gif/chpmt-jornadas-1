import { createServerFn } from "@tanstack/react-start";
import { inscricaoSchema } from "./inscricao-schema";

export const criarInscricao = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inscricaoSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("inscricoes")
      .insert({
        nome_completo: data.nome_completo,
        email: data.email.toLowerCase(),
        telefone: data.telefone,
        categoria_profissional: data.categoria_profissional,
        instituicao: data.instituicao || null,
      })
      .select("id, nome_completo, email, telefone, categoria_profissional, instituicao, qr_code_token")
      .single();

    if (error) {
      if (error.code === "23505") {
        return { ok: false as const, code: "duplicado" as const };
      }
      return { ok: false as const, code: "erro" as const };
    }

    return { ok: true as const, inscricao: row };
  });
