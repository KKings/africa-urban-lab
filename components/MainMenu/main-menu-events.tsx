"use client";

import { useDialogContext } from "@/components/Dialog/hooks/use-dialog-context";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function ManinMenuEvents() {
  const { closeDialog } = useDialogContext();
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    console.log('events', {
      current: prevPathnameRef.current,
      latest: pathname,
    })


    // Compare the previous pathname with the current one
    if (prevPathnameRef.current !== pathname) {
      closeDialog();
    }

    // Update the ref to the current pathname
    prevPathnameRef.current = pathname;
  }, [pathname]);

  return null;
}
