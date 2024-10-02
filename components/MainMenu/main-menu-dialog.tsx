"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDialogContext } from "@/components/Dialog/hooks/use-dialog-context";
import clsx from "clsx";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

export const MainMenuDialog = ({ children }: { children: React.ReactNode }) => {
  // NB! NavEvents (set in layout) useDialogContext to handle closing this dialog on route change
  const { isShowing, toggleDialog } = useDialogContext();

  return (
    <Dialog open={isShowing} onOpenChange={toggleDialog}>
      <DialogTrigger className="font-semibold px-w8">
        {isShowing ? <Cross2Icon className="w-[1.5em] h-[1.5em]" /> : <HamburgerMenuIcon className="w-[1.5em] h-[1.5em]" />}
      </DialogTrigger>
      <DialogContent
        overlayClassName="bg-background top-navH"
        className={clsx(
          "fixed inset-0 top-navH bottom-[auto] translate-x-[0] translate-y-[0] max-w-[none] bg-theme-blue text-white",
          "h-[calc(100vh-var(--height-nav))] w-full",
          "duration-[1000ms]",
          "data-[state=open]:!slide-in-from-left-0 data-[state=closed]:!slide-out-to-left-0 data-[state=open]:!zoom-in-100 data-[state=closed]:!zoom-in-100"
        )}
      >
        <DialogHeader className="">{children}</DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
