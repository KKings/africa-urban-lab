import type { PropsWithChildren } from "react";

export type StepperContent = {
  title?: string | null;
  description?: string | null;
};

export type StepperForm<T> = StepperContent &
  PropsWithChildren & {
    onSubmit: (args?: any) => void;
    data: Partial<T>;
    className?: string;
    isFirst: boolean;
    isLast: boolean;
    onPrevious: () => void;
  };
