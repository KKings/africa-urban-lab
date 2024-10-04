import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

type PdfViewerControlsProps = {
  current: number;
  total: number;
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export const PdfViewerControls = ({ current, total, setCurrentPage}: PdfViewerControlsProps) => {
  return (
    <div className={clsx([
      "pdf-controls",
      "absolute bottom-[5%] left-[50%] z-10 bg-white",
      "transition-opacity shadow-md rounded-sm shadow-gray-300",
      "opacity-0 group-hover:opacity-100"
    ])} style={{ transform: 'translateX(-50%)'}}>
      <button 
        className="w-[44px] h-[44px] enabled:hover:bg-gray-100" 
        type="button" 
        disabled={current <= 1} 
        onClick={() => setCurrentPage(current - 1)}
      >
        ‹
      </button>
      <span className="px-4">{current} of {total}</span>
      <button 
        className="w-[44px] h-[44px] enabled:hover:bg-gray-100" 
        type="button" 
        onClick={() => setCurrentPage(current + 1)} 
        disabled={current >= total}>
        ›
      </button>
    </div>
  )
};
