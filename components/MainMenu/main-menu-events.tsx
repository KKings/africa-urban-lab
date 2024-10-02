"use client";

import { useDialogContext } from "@/components/Dialog/hooks/use-dialog-context";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

// NavEvents are set in layout to handle closing on route change
// https://nextjs.org/docs/app/api-reference/functions/use-router#router-events
export function NavEvents() {
  const { closeDialog } = useDialogContext();
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    // Compare the previous pathname with the current one
    if (prevPathnameRef.current !== pathname) {
      closeDialog();
    }
    // Update the ref to the current pathname
    prevPathnameRef.current = pathname;
  }, [pathname, closeDialog]);

  return null;
}
