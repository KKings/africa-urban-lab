"use client";

import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

interface DialogContextType {
  isShowing: boolean;
  toggleDialog: () => void;
  openDialog: () => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProviderProps {
  children: ReactNode;
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);

  const toggleDialog = (open: boolean = !isShowing) => {
    setIsShowing(open);
  };

  const openDialog = () => {
    toggleDialog(true);
  };

  const closeDialog = () => {
    toggleDialog(false);
  };

  return (
    <DialogContext.Provider
      value={{ isShowing, toggleDialog, openDialog, closeDialog }}
    >
      <p className="text-destructive">{isShowing}</p>
      {children}
    </DialogContext.Provider>
  );
};

export function useDialogContext(): DialogContextType {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
}
