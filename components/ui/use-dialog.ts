import { useState } from "react";

// Helper hook to show/hide a Radix dialog
export const useDialog = () => {
  const [isShowing, setIsShowing] = useState(false);

  // `open` is an implicit Radix dialog prop
  const toggleDialog = (open: boolean = !isShowing) => {
    setIsShowing(open);
  };

  const openDialog = () => {
    toggleDialog(true);
  };

  const closeDialog = () => {
    toggleDialog(false);
  };

  return {
    isShowing,
    toggleDialog,
    openDialog,
    closeDialog,
  };
};
