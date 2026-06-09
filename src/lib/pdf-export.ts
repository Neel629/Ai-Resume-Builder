export async function exportToPDF(elementId: string, filename: string) {
  // Dynamic import to avoid SSR issues
  const html2pdf = (await import("html2pdf.js")).default;

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  const opt = {
    margin: 0,
    filename: `${filename.replace(/[^a-zA-Z0-9]/g, "_")}_resume.pdf`,
    image: { type: "jpeg" as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
      windowWidth: 794,
      onclone: (clonedDoc: Document) => {
        const el = clonedDoc.getElementById(elementId);
        if (el) {
          el.style.width = "794px";
          el.style.minHeight = "1123px";
          el.style.transform = "none";
          el.classList.remove("shadow-2xl", "shadow-black/10", "rounded-lg", "overflow-hidden");
        }
      }
    },
    jsPDF: {
      unit: "mm" as const,
      format: "a4" as const,
      orientation: "portrait" as const,
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await html2pdf().set(opt as any).from(element).save();
}
