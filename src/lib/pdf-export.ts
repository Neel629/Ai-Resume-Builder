import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export async function exportToPDF(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  // Find all links inside the preview container and calculate relative positions
  // before generating the PDF image snapshot.
  const linkElements = element.querySelectorAll("a[href]");
  const containerRect = element.getBoundingClientRect();
  
  const links = Array.from(linkElements).map((a) => {
    const href = a.getAttribute("href");
    const rect = a.getBoundingClientRect();
    
    return {
      href,
      left: (rect.left - containerRect.left) / containerRect.width,
      top: (rect.top - containerRect.top) / containerRect.height,
      width: rect.width / containerRect.width,
      height: rect.height / containerRect.height,
    };
  });

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

  // Programmatically inject link hotspots into the PDF
  links.forEach((link) => {
    if (link.href && link.href !== "#" && !link.href.startsWith("javascript:")) {
      const x = link.left * pdfWidth;
      const y = link.top * pdfHeight;
      const w = link.width * pdfWidth;
      const h = link.height * pdfHeight;
      
      pdf.link(x, y, w, h, { url: link.href });
    }
  });

  pdf.save(`${(filename || "resume").replace(/[^a-zA-Z0-9]/g, "_")}_resume.pdf`);
}

