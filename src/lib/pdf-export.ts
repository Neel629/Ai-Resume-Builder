export async function exportToPDF(elementId: string, filename: string) {
  // Dynamic import to avoid SSR issues
  const html2pdf = (await import("html2pdf.js")).default;

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  // Clone the element to apply print-specific styling without modifying the screen preview
  const printElement = element.cloneNode(true) as HTMLElement;
  printElement.style.width = "794px"; // Standard A4 width at 96 DPI (210mm)
  printElement.style.minHeight = "1123px"; // Standard A4 height (297mm)
  printElement.style.position = "absolute";
  printElement.style.left = "-9999px";
  printElement.style.top = "-9999px";
  
  // Remove screen-only visual styles like shadows and rounded corners
  printElement.classList.remove("shadow-2xl", "shadow-black/10", "rounded-lg", "overflow-hidden");
  
  document.body.appendChild(printElement);

  // Wait 200ms to ensure all cloned images/fonts/layouts have settled in the DOM
  await new Promise((resolve) => setTimeout(resolve, 200));

  const opt = {
    margin: 0,
    filename: `${filename.replace(/[^a-zA-Z0-9]/g, "_")}_resume.pdf`,
    image: { type: "jpeg" as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
    },
    jsPDF: {
      unit: "mm" as const,
      format: "a4" as const,
      orientation: "portrait" as const,
    },
  };

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await html2pdf().set(opt as any).from(printElement).save();
  } finally {
    document.body.removeChild(printElement);
  }
}
