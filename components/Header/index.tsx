"use client";

import type { CommonLayoutQuery } from "@/graphql/types/graphql";
import type { GlobalPageProps } from "@/utils/globalPageProps";
import { buildUrl } from "@/utils/globalPageProps";
import Image from "next/image";
import Link from "next/link";
import { MainMenu, MainMenuMobile, type Menu } from "../MainMenu";
import { usePathname } from "next/navigation";
import type { SecondaryMenuItem, MenuItem, TopLevelMenuItem } from "./types";

type Props = {
  globalPageProps: GlobalPageProps;
  data: CommonLayoutQuery;
};
const transformDropdownItem = (item: SecondaryMenuItem): Menu => {
  const submenu =
    item.__typename === 'MenuDropdownItemRecord'
      ? item.dropdownItems.map((subItem) => ({
          id: subItem.id,
          title: subItem.title,
          path: `/${subItem.page?.slug ?? ''}`,
          isButton: true,
        }))
      : [];

  return {
    id: item.id,
    path: `/${item.page?.slug ?? ''}`,
    title: item.title,
    isButton: false,
    submenu,
  };
};

const transformMenuItem = (menuItem: TopLevelMenuItem): Menu =>{
  if (menuItem.__typename === 'MenuDropdownRecord') {
    const dropdownItem = menuItem;
    return {
      id: dropdownItem.id,
      title: dropdownItem.title || 'Other',
      isButton: false,
      submenu: dropdownItem.items.map(transformDropdownItem),
    };
  }

  const baseItem = {
    id: menuItem.id,
    title: menuItem.title,
    path: `/${menuItem.page?.slug ?? ''}`,
  };

  if (menuItem.__typename === 'MenuItemButtonRecord') {
    return {
      ...baseItem,
      isButton: true,
    };
  }

  return {
    ...baseItem,
    isButton: false,
  };
};

const generateMenuData = (layout: CommonLayoutQuery['layout']): Menu[] => {
  if (!layout?.menu) {
    return [];
  }

  return layout.menu.map(transformMenuItem);
};

const Header = ({ globalPageProps, data }: Props) => {
  const pathname = usePathname();
  const menuData = generateMenuData(data.layout);

  return (
    <header className="sticky top-0 w-full bg-background z-50 drop-shadow-sm">
      <div className="container h-navH flex items-center justify-between">
        <Link
          href={buildUrl(globalPageProps, "/")}
          className="h-navH flex items-center"
        >
          {data.layout?.logo.url && (
            <Image
              src={data.layout.logo.url}
              alt={data.layout.logo.alt || "logo"}
              width={data.layout.logo.width ?? 140}
              height={data.layout.logo.height ?? 30}
              className="dark:hidden w-[200px] max-w-[130px] h-auto"
            />
          )}
        </Link>
        <div className="relative flex justify-end z-[1]">
          <MainMenu
            key={pathname}
            globalPageProps={globalPageProps}
            menus={menuData}
          />
        </div>
        <div className="relative flex justify-end z-50 min-[1140px]:hidden">
          <MainMenuMobile
            key={pathname}
            globalPageProps={globalPageProps}
            menus={menuData}
          />
          <hr />
        </div>
      </div>
    </header>
  );
};

export default Header;
