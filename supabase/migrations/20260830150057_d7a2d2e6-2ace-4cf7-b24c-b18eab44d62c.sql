CREATE TABLE public.inscricoes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_completo text NOT NULL,
  email text NOT NULL UNIQUE,
  telefone text NOT NULL,
  categoria_profissional text NOT NULL,
  instituicao text,
  qr_code_token uuid NOT NULL DEFAULT gen_random_uuid(),
  status_presenca boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.inscricoes TO service_role;

ALTER TABLE public.inscricoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages inscricoes" ON public.inscricoes FOR ALL TO service_role USING (true) WITH CHECK (true);