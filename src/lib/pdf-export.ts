import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

async function generatePDF(elementId: string, isBase64: boolean, filename?: string): Promise<string> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  // We use html-to-image because it uses the browser's native SVG foreignObject 
  // rendering. This natively supports all modern CSS features (like Tailwind v4's 
  // oklab/oklch colors) without crashing, unlike html2canvas.
  const dataUrl = await toPng(element, {
    quality: isBase64 ? 0.85 : 0.98,
    pixelRatio: isBase64 ? 1.5 : 2,
    style: {
      transform: "none",
      width: "794px",
      minHeight: "1123px",
      boxShadow: "none",
      borderRadius: "0",
      overflow: "visible",
    },
  });

  const pdf = new jsPDF({
    unit: "mm",
    format: "a4",
    orientation: "portrait",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
  const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

  pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

  if (isBase64) {
    // Return data URI string for backend emailing (kept small to avoid Vercel 4.5MB limit)
    return pdf.output("datauristring");
  } else {
    // Trigger download prompt in browser
    pdf.save(`${(filename || "resume").replace(/[^a-zA-Z0-9]/g, "_")}_resume.pdf`);
    return "";
  }
}

export async function exportToPDF(elementId: string, filename: string) {
  await generatePDF(elementId, false, filename);
}

export async function exportToPDFBase64(elementId: string): Promise<string> {
  return await generatePDF(elementId, true);
}
