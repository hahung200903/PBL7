// components/PDFViewer.jsx
import React, { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/web/pdf_viewer.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PDFViewer = ({ file }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const renderPDF = async () => {
      if (!file) return;

      const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
      const viewer = containerRef.current;
      viewer.innerHTML = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
        viewer.appendChild(canvas);
      }
    };

    renderPDF();
  }, [file]);

  return <div ref={containerRef} style={{ overflow: 'auto', maxHeight: '500px' }} />;
};

export default PDFViewer;