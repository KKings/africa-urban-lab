"use client";

import "./polyfill";
import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type {
  DocumentCallback,
  Options,
} from "react-pdf/dist/cjs/shared/types";
import { PdfViewerControls } from "./PdfViewerControls";

export type PdfViewerProps = JSX.IntrinsicElements["div"] & {
  source: string;
};

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

enum Status {
  Loading = "loading",
  Loaded = "loaded",
  Error = "error",
}

const PdfViewer = ({
  source,
  ...props
}: PdfViewerProps) => {
  const [pdfState, setPdfState] = useState(Status.Loading);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [renderedPage, setRenderedPage] = useState<number>();

  const onLoadSuccessHandler = useCallback(({ numPages }: DocumentCallback) => {
    setTotalPages(numPages);
    setPdfState(Status.Loaded);
  }, []);

  const onLoadErrorHandler = useCallback((error: Error) => {
    setPdfState(Status.Error);
    console.log("PdfViewer", {
      ...error,
    });
  }, []);

  const callback = useCallback(() => {
    setRenderedPage(currentPage)
  }, [currentPage])

  const isLoading = renderedPage !== currentPage;

  return (
    <div {...props}>
      <Document
        className="PDFDocument relative group"
        file={source}
        onLoadSuccess={onLoadSuccessHandler}
        onLoadError={onLoadErrorHandler}
      >
        {/* { (isLoading && renderedPage) && 
          <Page
            key={renderedPage}
            pageNumber={renderedPage}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className="PDFPage !absolute z-1"
          />
        }

        <Page
          key={currentPage}
          pageNumber={currentPage}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          onRenderSuccess={() => setRenderedPage(currentPage)}
        /> */}

        {isLoading && renderedPage ? (
          <Page
            key={renderedPage}
            className="prevPage !absolute z-0 shadow-md" 
            pageNumber={renderedPage}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        ) : null}
        <Page
          key={currentPage}
          className="shadow-md"
          pageNumber={currentPage}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          onRenderSuccess={callback}
        />

        <PdfViewerControls
          current={currentPage}
          total={totalPages || 0}
          setCurrentPage={setCurrentPage}
        />
      </Document>
      { pdfState === Status.Error && <p>PDF failed to load...</p>}
    </div>
  );
};

export default PdfViewer;
