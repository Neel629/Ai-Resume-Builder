import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export async function exportToPDF(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  // We use html-to-image because it uses the browser's native SVG foreignObject 
  // rendering. This natively supports all modern CSS features (like Tailwind v4's 
  // oklab/oklch colors) without crashing, unlike html2canvas.
  const dataUrl = await toPng(element, {
    quality: 0.98,
    pixelRatio: 2,
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
  pdf.save(`${(filename || "resume").replace(/[^a-zA-Z0-9]/g, "_")}_resume.pdf`);
}
