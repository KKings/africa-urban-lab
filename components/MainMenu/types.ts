import type { GlobalPageProps } from "@/utils/globalPageProps";

export type Menu = {
  id: string;
  title?: string;
  path?: string;
  submenu?: Menu[];
  isButton?: boolean;
};

export type MenuProps = {
  menus?: Menu[];
  globalPageProps: GlobalPageProps;
};