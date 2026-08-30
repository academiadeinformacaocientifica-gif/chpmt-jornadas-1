import { EVENTO } from "@/lib/inscricao-schema";

export type InscricaoConfirmada = {
  id: string;
  nome_completo: string;
  email: string;
  telefone: string;
  categoria_profissional: string;
  instituicao: string | null;
  qr_code_token: string;
};

const GREEN = "#48695E";
const RED = "#8A3338";
const DARK = "#2B3330";

export async function gerarQrDataUrl(token: string) {
  const QRCode = (await import("qrcode")).default;
  return QRCode.toDataURL(token, {
    width: 512,
    margin: 1,
    color: { dark: GREEN, light: "#FFFFFF" },
  });
}

export async function descarregarConvitePdf(inscricao: InscricaoConfirmada, qrDataUrl: string) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const width = doc.internal.pageSize.getWidth();

  doc.setFillColor(GREEN);
  doc.rect(0, 0, width, 120, "F");
  doc.setTextColor("#FFFFFF");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("COMPLEXO HOSPITALAR PEDRO MARIA TONHA", 40, 52);
  doc.text('"PEDALE" - CHPMT', 40, 74);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Comprovativo de Inscricao / Convite Individual", 40, 98);

  doc.setFillColor(RED);
  doc.rect(0, 120, width, 6, "F");

  doc.setTextColor(DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.text("1as JORNADAS CIENTIFICAS DO CHPMT", 40, 170);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.setTextColor(RED);
  doc.text(`"${EVENTO.lema}"`, 40, 192);

  doc.setTextColor(DARK);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const linhas = [
    ["Data", EVENTO.data],
    ["Horario", EVENTO.hora],
    ["Local", 'Complexo Hospitalar Pedro Maria Tonha "Pedale" (CHPMT), Luanda'],
    ["Participante", inscricao.nome_completo],
    ["E-mail", inscricao.email],
    ["Telefone", inscricao.telefone],
    ["Categoria", inscricao.categoria_profissional],
    ["Instituicao", inscricao.instituicao || "-"],
  ];
  let y = 232;
  linhas.forEach(([rotulo, valor]) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${rotulo}:`, 40, y);
    doc.setFont("helvetica", "normal");
    doc.text(doc.splitTextToSize(String(valor), width - 200), 150, y);
    y += 26;
  });

  doc.addImage(qrDataUrl, "PNG", width / 2 - 90, y + 16, 180, 180);
  doc.setFontSize(9);
  doc.setTextColor("#6B7671");
  doc.text("Apresente este QR Code a entrada para validacao da sua presenca.", width / 2, y + 216, {
    align: "center",
  });
  doc.setFontSize(8);
  doc.text(`Codigo: ${inscricao.qr_code_token}`, width / 2, y + 232, { align: "center" });

  doc.save(`convite-jornadas-chpmt-${inscricao.nome_completo.replace(/\s+/g, "-").toLowerCase()}.pdf`);
}
