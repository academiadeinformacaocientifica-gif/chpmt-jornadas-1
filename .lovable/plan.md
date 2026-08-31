# Remover o selo de aniversário e revalidar inscrição + QR Code

## 1. Retirar o selo "1º Aniversário"
- Remover o selo destacado no hero ("1º Aniversário · 2025 – 2026"), incluindo o ícone associado.
- Manter o restante do hero intacto (título, lema, cartões de data/hora/local, botão de inscrição).
- Confirmar se também deve sair o selo equivalente no topo da página (cabeçalho, versão desktop e faixa mobile) — ver pergunta abaixo; por omissão será removido também, para consistência visual.

## 2. Reativar/validar inscrição e geração do QR Code
Estado atual verificado: a tabela `inscricoes` existe, tem 1 registo gravado, e o código do formulário, da função de servidor e do PDF está presente. Não há evidência de que esteja desligado, por isso o trabalho é de verificação e correção do que falhar:
- Testar o fluxo completo no preview (preencher formulário → gravar → modal de confirmação → QR Code → PDF) com automação de browser e ler os erros de consola/rede.
- Corrigir o que falhar, tipicamente: código de erro de duplicado errado na função de servidor (usa `23505`, o código correto do Postgres é `23505` apenas para unique; validar contra o erro real), dependências de QR/PDF, ou permissões da tabela.
- Confirmar que o token do QR Code é único por inscrição e que aparece no ecrã e no PDF.

## Detalhes técnicos
- Edição em `src/routes/index.tsx` (remoção do selo).
- Verificação em `src/lib/inscricoes.functions.ts` (insert via cliente admin no servidor), `src/components/FormularioInscricao.tsx` e `src/components/ConvitePdf.ts`.
- Sem alterações de esquema previstas; se o teste mostrar falta de restrição de e-mail único, será proposta uma migração para essa restrição.
