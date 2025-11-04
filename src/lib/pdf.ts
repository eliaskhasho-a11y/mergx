let html2pdfLoaded = false;
function loadHtml2Pdf(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (html2pdfLoaded) return resolve();
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = () => { html2pdfLoaded = true; resolve(); };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export async function exportTextAsPDF(filename: string, content: string) {
  await loadHtml2Pdf();
  const container = document.createElement('div');
  container.style.padding = '18px';
  container.style.fontFamily = 'system-ui,-apple-system,Segoe UI,Roboto,sans-serif';
  container.style.color = '#111827';
  container.innerHTML = content.replace(/\n/g, '<br/>');
  document.body.appendChild(container);
  // @ts-ignore
  await window.html2pdf().set({
    margin: 10, filename: filename.endsWith('.pdf') ? filename : `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).from(container).save();
  document.body.removeChild(container);
}

export async function exportElementAsPDF(filename: string, el: HTMLElement) {
  await loadHtml2Pdf();
  // @ts-ignore
  await window.html2pdf().set({
    margin: 10, filename: filename.endsWith('.pdf') ? filename : `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).from(el).save();
}
