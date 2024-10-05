"use client";

import { useCallback, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type {
  DocumentCallback,
} from "react-pdf/dist/cjs/shared/types";
import { PdfViewerControls } from "./PdfViewerControls";
import { Size, useResizeObserver } from "@/hooks/useResizeObserver";
import { cn } from "../utils";

export type PdfViewerProps = JSX.IntrinsicElements["div"] & {
  source: string;
};

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`,
  import.meta.url
).toString();

enum Status {
  Loading = "loading",
  Loaded = "loaded",
  Error = "error",
}

const PdfViewer = ({
  source,
  className,
  ...props
}: PdfViewerProps) => {
  const [pdfState, setPdfState] = useState(Status.Loading);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [renderedPage, setRenderedPage] = useState<number>();
  const containerRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(0);

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

  const handleResize = useCallback((entry: Size) => {
    const { width } = entry;
    if (width) {
      setPageWidth(width);
    }
  }, []);

  useResizeObserver({
    onResize: handleResize,
    ref: containerRef,
  });

  const isLoading = renderedPage !== currentPage;

  return (
    <div className={cn([
      "w-full block",
      className
    ])} 
    {...props} 
    ref={containerRef}
    >
      <Document
        className="PDFDocument relative group"
        file={source}
        onLoadSuccess={onLoadSuccessHandler}
        onLoadError={onLoadErrorHandler}
      >
      {isLoading && renderedPage ? (
          <Page
            key={renderedPage}
            className="prevPage !absolute z-0 shadow-md" 
            pageNumber={renderedPage}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            width={pageWidth}
          />
        ) : null}
        <Page
          key={currentPage}
          className="shadow-md"
          pageNumber={currentPage}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          onRenderSuccess={callback}
          width={pageWidth}
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
