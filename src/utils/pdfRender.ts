import * as pdfjsLib from 'pdfjs-dist' 
import  * as PDFWorker  from '@/assets/pdf.worker.min.mjs'


// pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/dist/pdf.worker.min', import.meta.url);
(window as any).pdfjsWorker = PDFWorker
export default async function pdfRender() {
  const pdfDoc = await pdfjsLib.getDocument('./sample.pdf').promise
  console.log(pdfDoc)
  const pdfPage =  await pdfDoc.getPage(1); 
  const viewport = pdfPage.getViewport({scale: 1})
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext("2d")
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  if (ctx) {
    await pdfPage.render({
      canvasContext: ctx,
      viewport: viewport,
    }).promise;
  }
  return canvas.toDataURL()
}