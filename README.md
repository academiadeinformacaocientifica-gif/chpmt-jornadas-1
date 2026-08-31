# Jornadas Científicas Pedalé

.

 

# PROMPT MESTRE PARA O LOVABLE

Crie uma Landing Page moderna, profissional, de alta conversão e totalmente responsiva (mobile-first) para um evento científico hospitalar de alto nível, integrada ao backend Supabase.

---

### 1. IDENTIDADE VISUAL & PALETA DE CORES OFICIAL (CHPMT PEDALÉ)
Aplique rigorosamente a paleta extraída da identidade oficial do Complexo Hospitalar:
- **Verde Hospitalar Principal (`#48695E`):** Utilizado para o cabeçalho, botões de ação primária (CTA), ícones em destaque, títulos principais e realces visuais.
- **Vermelho Bordô / Acento (`#8A3338`):** Utilizado para badges de aniversário/evento, destaques de data/hora, linhas de acento e estados de erro/alerta.
- **Fundo da Página (`#FFFFFF` e `#F4F6F5`):** Alternância entre branco puro e cinza-claro hospitalar para separar secções com clareza.
- **Texto Principal (`#2B3330`):** Cinza-escuro para garantir alto contraste e excelente legibilidade.
- **Tipografia & Ícones:** Usar font sans-serif limpa (ex: Inter ou Plus Jakarta Sans) e ícones da biblioteca `lucide-react`.

Configure o Tailwind CSS com estas cores personalizadas:
```javascript
colors: {
  chpmt: {
    green: '#48695E',
    red: '#8A3338',
    bg: '#F4F6F5',
    dark: '#2B3330',
  }
}


2. ESTRUTURA DA LANDING PAGE

A. Navbar / Cabeçalho Superior

Logótipo/Texto institucional: "COMPLEXO HOSPITALAR PEDRO MARIA TONHA 'PEDALÉ'"

Badge em destaque no canto superior: "1º Aniversário CHPMT" em fundo vermelho bordô (#8A3338) com texto branco.

Botão "Garantir Vaga" com scroll suave até ao formulário.

B. Hero Section (Início de Alto Impacto)

Título Principal: "1ª JORNADAS CIENTÍFICAS DO COMPLEXO HOSPITALAR PEDRO MARIA TONHA 'PEDALÉ'"

Lema (Destaque em itálico/bold): "Um ano a transformar a saúde em Angola"

Cards Informativos (Com ícones Lucide):

📅 Data: 27 de Setembro de 2026

⏰ Horário: 08:00 AM

📍 Local: Complexo Hospitalar Pedro Maria Tonha "Pedalé" (CHPMT)

Botão CTA Principal: "Realizar Inscrição Individual" (Botão em tom verde #48695E com animação suave no hover).

C. Secção "Sobre o Evento & Público-Alvo"

Texto breve celebrando o 1º ano de excelência, inovação e compromisso com a saúde em Angola.

Grade/Tags visuais organizadas para o Público-Alvo:

🩺 Médicos

💉 Enfermeiros

💊 Farmacêuticos

🔬 Técnicos de Diagnósticos e Terapêuticas

🎓 Docentes e Estudantes

🏥 Gestores Hospitalares e Gestores

D. Formulário de Inscrição Individual

Card centralizado, limpo e com sombra suave. Campos obrigatórios com validação em tempo real:

Nome Completo (Input text)

E-mail (Input email - validação de formato e verificação de duplicado)

Telefone / WhatsApp (Input tel com máscara para código +244 de Angola)

Categoria Profissional (Select Dropdown com as opções do público-alvo: Médico(a), Enfermeiro(a), Farmacêutico(a), Técnico(a) de Diagnóstico, Docente/Estudante, Gestor(a), Outro)

Instituição / Hospital / Universidade (Input text - opcional)

Botão de Submissão: "Confirmar Inscrição e Gerar Convite" (com estado de carregamento / spinner).

E. Modal / Ecrã de Confirmação & Download do Convite

Após submissão bem-sucedida:

Animação de sucesso (Checkmark verde).

Mensagem: "Inscrição Confirmada com Sucesso!"

Resumo dos dados do participante.

Exibição do QR Code Único: Gerado dinamicamente no frontend com base no qr_code_token (UUID) vindo do Supabase.

Botão Principal: "Descarregar Convite em PDF" (dispara o download do comprovativo em formato PDF contendo o QR Code e as informações do evento).

Nota informativa: "Uma cópia do comprovativo com o seu QR Code também foi enviada para o e-mail cadastrado."

3. INTEGRAÇÃO COM BACKEND (SUPABASE)

Configure a conexão com a tabela inscricoes no Supabase com os campos:

id (uuid, primary key)

nome_completo (text)

email (text, unique)

telefone (text)

categoria_profissional (text)

instituicao (text)

qr_code_token (uuid, gerado automaticamente no backend)

status_presenca (boolean, default false)

created_at (timestamp)

Tratamento de Erros: Se o Supabase retornar erro de e-mail duplicado (código 23505), exiba uma mensagem Toast amigável: "Este e-mail já se encontra inscrito nas Jornadas Científicas. Verifique a sua caixa de entrada."

eof

O ficheiro com o prompt atualizado está pronto. Ele já contém a paleta de cores oficial extraída da foto do CHPMT, a estrutura responsiva completa, o formulário de inscrição individual e a lógica de geração e download do comprovativo em PDF com QR code via Supabase.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8531c469-a089-41f3-bae8-d256f13fb283).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
