"use client";

import type { CommonLayoutQuery } from "@/graphql/types/graphql";
import type { GlobalPageProps } from "@/utils/globalPageProps";
import { buildUrl } from "@/utils/globalPageProps";
import Image from "next/image";
import Link from "next/link";
import { type Menu, MainMenu, MainMenuMobile } from "../MainMenu/main-menu";
import { usePathname } from "next/navigation";

type Props = {
  globalPageProps: GlobalPageProps;
  data: CommonLayoutQuery;
};

const Header = ({ globalPageProps, data }: Props) => {
  const pathname = usePathname();
  const menuData: Menu[] = [];

  data.layout?.menu.map((item) => {
    if (item.__typename === "MenuDropdownRecord") {
      const dropdownItem = item;
      menuData.push({
        id: "1",
        title: dropdownItem.title || "Other Items",
        isButton: false,
        submenu: dropdownItem.items.map((item) => {
          return {
            id: item.id,
            title: item.title,
            path: `/${item.page.slug}`,
            isButton: false,
          };
        }),
      });
    } else if (item.__typename === "MenuItemButtonRecord") {
      const menuItem = item;
      menuData.push({
        id: menuItem.id,
        title: menuItem.title,
        path: `/${menuItem.page.slug}`,
        isButton: true,
      });
    } else {
      const menuItem = item;
      menuData.push({
        id: menuItem.id,
        title: menuItem.title,
        path: `/${menuItem.page.slug}`,
        isButton: false,
      });
    }
  });

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
