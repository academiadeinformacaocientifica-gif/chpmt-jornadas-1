import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Download, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { criarInscricao } from "@/lib/inscricoes.functions";
import { CATEGORIAS, formatarTelefone, inscricaoSchema } from "@/lib/inscricao-schema";
import {
  descarregarConvitePdf,
  gerarQrDataUrl,
  type InscricaoConfirmada,
} from "@/components/ConvitePdf";

type Campos = {
  nome_completo: string;
  email: string;
  telefone: string;
  categoria_profissional: string;
  instituicao: string;
};

const inicial: Campos = {
  nome_completo: "",
  email: "",
  telefone: "",
  categoria_profissional: "",
  instituicao: "",
};

export function FormularioInscricao() {
  const submeter = useServerFn(criarInscricao);
  const [campos, setCampos] = useState<Campos>(inicial);
  const [erros, setErros] = useState<Partial<Record<keyof Campos, string>>>({});
  const [aEnviar, setAEnviar] = useState(false);
  const [aDescarregar, setADescarregar] = useState(false);
  const [confirmada, setConfirmada] = useState<InscricaoConfirmada | null>(null);
  const [qr, setQr] = useState<string | null>(null);

  function validarCampo(nome: keyof Campos, valor: string) {
    const resultado = inscricaoSchema.safeParse({ ...campos, [nome]: valor });
    const problema = resultado.success
      ? undefined
      : resultado.error.issues.find((issue) => issue.path[0] === nome)?.message;
    setErros((anteriores) => ({ ...anteriores, [nome]: problema }));
  }

  function alterar(nome: keyof Campos, valorBruto: string) {
    const valor = nome === "telefone" ? formatarTelefone(valorBruto) : valorBruto;
    setCampos((anteriores) => ({ ...anteriores, [nome]: valor }));
    if (erros[nome]) validarCampo(nome, valor);
  }

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    const resultado = inscricaoSchema.safeParse({
      ...campos,
      instituicao: campos.instituicao || undefined,
    });

    if (!resultado.success) {
      const novos: Partial<Record<keyof Campos, string>> = {};
      resultado.error.issues.forEach((issue) => {
        const chave = issue.path[0] as keyof Campos;
        if (!novos[chave]) novos[chave] = issue.message;
      });
      setErros(novos);
      toast.error("Verifique os campos assinalados antes de continuar.");
      return;
    }

    setAEnviar(true);
    try {
      const resposta = await submeter({ data: resultado.data });
      if (!resposta.ok) {
        toast.error(
          resposta.code === "duplicado"
            ? "Este e-mail já se encontra inscrito nas Jornadas Científicas. Verifique a sua caixa de entrada."
            : "Não foi possível concluir a inscrição. Tente novamente em instantes.",
        );
        return;
      }

      const inscricao = resposta.inscricao as InscricaoConfirmada;
      setConfirmada(inscricao);
      setQr(await gerarQrDataUrl(inscricao.qr_code_token));
      setCampos(inicial);
      setErros({});
    } catch {
      toast.error("Falha de ligação. Verifique a internet e tente novamente.");
    } finally {
      setAEnviar(false);
    }
  }

  async function descarregar() {
    if (!confirmada || !qr) return;
    setADescarregar(true);
    try {
      await descarregarConvitePdf(confirmada, qr);
      toast.success("Convite descarregado com sucesso.");
    } catch {
      toast.error("Não foi possível gerar o PDF. Tente novamente.");
    } finally {
      setADescarregar(false);
    }
  }

  const inputBase =
    "h-12 rounded-xl border-border bg-background text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-primary";

  return (
    <>
      <form
        onSubmit={enviar}
        noValidate
        className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-9"
      >
        <div className="grid gap-5">
          <Campo id="nome_completo" rotulo="Nome completo" erro={erros.nome_completo}>
            <Input
              id="nome_completo"
              className={inputBase}
              placeholder="Ex.: Ana Domingos Kiala"
              value={campos.nome_completo}
              onChange={(e) => alterar("nome_completo", e.target.value)}
              onBlur={(e) => validarCampo("nome_completo", e.target.value)}
              maxLength={120}
              autoComplete="name"
            />
          </Campo>

          <Campo id="email" rotulo="E-mail" erro={erros.email}>
            <Input
              id="email"
              type="email"
              className={inputBase}
              placeholder="nome@exemplo.com"
              value={campos.email}
              onChange={(e) => alterar("email", e.target.value)}
              onBlur={(e) => validarCampo("email", e.target.value)}
              maxLength={255}
              autoComplete="email"
            />
          </Campo>

          <Campo id="telefone" rotulo="Telefone / WhatsApp" erro={erros.telefone}>
            <Input
              id="telefone"
              type="tel"
              inputMode="tel"
              className={inputBase}
              placeholder="+244 9XX XXX XXX"
              value={campos.telefone}
              onChange={(e) => alterar("telefone", e.target.value)}
              onBlur={(e) => validarCampo("telefone", e.target.value)}
              autoComplete="tel"
            />
          </Campo>

          <Campo
            id="categoria_profissional"
            rotulo="Categoria profissional"
            erro={erros.categoria_profissional}
          >
            <select
              id="categoria_profissional"
              className={`${inputBase} w-full appearance-none border px-3 outline-none`}
              value={campos.categoria_profissional}
              onChange={(e) => alterar("categoria_profissional", e.target.value)}
              onBlur={(e) => validarCampo("categoria_profissional", e.target.value)}
            >
              <option value="">Selecione a sua categoria</option>
              {CATEGORIAS.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </Campo>

          <Campo
            id="instituicao"
            rotulo="Instituição / Hospital / Universidade"
            opcional
            erro={erros.instituicao}
          >
            <Input
              id="instituicao"
              className={inputBase}
              placeholder="Ex.: CHPMT Pedalé"
              value={campos.instituicao}
              onChange={(e) => alterar("instituicao", e.target.value)}
              maxLength={150}
              autoComplete="organization"
            />
          </Campo>

          <Button
            type="submit"
            size="lg"
            disabled={aEnviar}
            className="h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[var(--shadow-elevated)]"
          >
            {aEnviar ? (
              <>
                <Loader2 className="mr-2 size-5 animate-spin" /> A processar inscrição…
              </>
            ) : (
              "Confirmar Inscrição e Gerar Convite"
            )}
          </Button>

          <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" />
            Os seus dados são usados apenas para o credenciamento do evento.
          </p>
        </div>
      </form>

      <Dialog
        open={Boolean(confirmada)}
        onOpenChange={(aberto) => {
          if (!aberto) {
            setConfirmada(null);
            setQr(null);
          }
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-3xl">
          <DialogHeader className="items-center text-center">
            <CheckCircle2 className="animate-pop size-16 text-primary" strokeWidth={1.6} />
            <DialogTitle className="text-2xl font-bold text-foreground">
              Inscrição Confirmada com Sucesso!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Guarde o seu convite com QR Code para apresentar no credenciamento.
            </DialogDescription>
          </DialogHeader>

          {confirmada && (
            <div className="space-y-5">
              <dl className="divide-y divide-border rounded-2xl bg-muted/70 px-4">
                {[
                  ["Participante", confirmada.nome_completo],
                  ["E-mail", confirmada.email],
                  ["Telefone", confirmada.telefone],
                  ["Categoria", confirmada.categoria_profissional],
                  ["Instituição", confirmada.instituicao || "—"],
                ].map(([rotulo, valor]) => (
                  <div key={rotulo} className="flex justify-between gap-4 py-2.5 text-sm">
                    <dt className="text-muted-foreground">{rotulo}</dt>
                    <dd className="text-right font-medium text-foreground">{valor}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-col items-center gap-2 rounded-2xl border border-border p-4">
                {qr ? (
                  <img src={qr} alt="QR Code único da inscrição" width={200} height={200} />
                ) : (
                  <Loader2 className="size-8 animate-spin text-primary" />
                )}
                <p className="text-center text-[11px] tracking-wide text-muted-foreground">
                  {confirmada.qr_code_token}
                </p>
              </div>

              <Button
                onClick={descarregar}
                disabled={aDescarregar || !qr}
                size="lg"
                className="h-13 w-full rounded-xl bg-primary py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {aDescarregar ? (
                  <Loader2 className="mr-2 size-5 animate-spin" />
                ) : (
                  <Download className="mr-2 size-5" />
                )}
                Descarregar Convite em PDF
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Descarregue e guarde o comprovativo: o QR Code é único e será validado à entrada
                das Jornadas.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Campo({
  id,
  rotulo,
  opcional,
  erro,
  children,
}: {
  id: string;
  rotulo: string;
  opcional?: boolean;
  erro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-sm font-semibold text-foreground">
        {rotulo}
        {opcional ? (
          <span className="ml-1 font-normal text-muted-foreground">(opcional)</span>
        ) : (
          <span className="ml-1 text-accent">*</span>
        )}
      </Label>
      {children}
      {erro && <p className="text-xs font-medium text-destructive">{erro}</p>}
    </div>
  );
}
