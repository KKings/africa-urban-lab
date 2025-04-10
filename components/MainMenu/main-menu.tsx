"use client";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Link } from "../ui/link";
import { Text } from "../ui/text";
import { MainMenuDialog } from "./main-menu-dialog";
import { buildUrl } from "@/utils/globalPageProps";
import { Button } from "../ui";
import { Menu, MenuProps } from "./types";

// Submenu Component
const SubMenu: React.FC<{ submenu: Menu[]; globalPageProps: any }> = ({
  submenu,
  globalPageProps,
}) => {
  const pathname = usePathname();

  return (
    <NavigationMenu.List>
      {submenu.map((submenuItem) => (
        <NavigationMenu.Item key={submenuItem.id} className="relative w-full">
          {submenuItem.submenu && submenuItem.submenu.length > 0 ? (
            <>
              <NavigationMenu.Trigger
                className={clsx(
                  "flex items-center justify-between",
                  "group px-4 w-full flex items-center text-white hover:bg-theme-canvas hover:text-theme-blue",
                  "group-data-[state=open]:bg-theme-canvas group-data-[state=open]:text-theme-blue"
                )}
              >
                <Link
                  href={buildUrl(globalPageProps, submenuItem.path)}
                  className={clsx("py-2")}
                >
                  <Text as="span" size="small">
                    {submenuItem.title}
                  </Text>
                </Link>
                <CaretDownIcon
                  width={20}
                  height={20}
                  className={clsx(
                    "transition-transform ease-in",
                    "group-data-[state=closed]:-rotate-90 group-data-[state=open]:-rotate-90"
                  )}
                  aria-hidden
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="bg-theme-blue w-min-[150px] max-w-[250px] w-max absolute top-0 left-[101%] rounded text-white flex justify-start h-fit mx-auto ease-in duration-900 overflow-hidden shadow">
                <SubMenu
                  submenu={submenuItem.submenu}
                  globalPageProps={globalPageProps}
                />
              </NavigationMenu.Content>
            </>
          ) : (
            <Link
              href={buildUrl(globalPageProps, submenuItem.path)}
              className={clsx(
                submenuItem.path === pathname ? "text-primary" : "",
                "py-2 px-4 block text-white hover:bg-theme-canvas hover:text-theme-blue"
              )}
            >
              <Text as="span" size="small">
                {submenuItem.title}
              </Text>
            </Link>
          )}
        </NavigationMenu.Item>
      ))}
    </NavigationMenu.List>
  );
};

// Navigation Menu Item Component
const MenuItemComponent: React.FC<{
  item: Menu;
  globalPageProps: any;
}> = ({ item, globalPageProps }) => {
  const pathname = usePathname();

  return (
    <NavigationMenu.Item
      key={item.id}
      className="flex items-center justify-end hover:text-primary relative"
    >
      {item.isButton && (
        <Button asChild size="lg" className="text-white">
          <Link href={buildUrl(globalPageProps, item.path)}>
            <Text as="span" weight="semi">
              {item.title}
            </Text>
          </Link>
        </Button>
      )}
      {!item.submenu && !item.isButton && (
        <Link
          href={buildUrl(globalPageProps, item.path)}
          className={clsx({ "text-primary": item.path === pathname })}
        >
          <Text as="span" weight="semi">
            {item.title}
          </Text>
        </Link>
      )}
      {item.submenu && item.submenu.length > 0 && (
        <>
          <NavigationMenu.Trigger id={item.id} className="group w-full" asChild>
            <Text as="span" weight="semi" className="hover:cursor-pointer">
              {item.title}
              <CaretDownIcon
                width={20}
                height={20}
                className="inline ml-2 transition-transform ease-in group-data-[state=open]:-rotate-180"
                aria-hidden
              />
            </Text>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="bg-theme-blue absolute left-0 text-white flex justify-start rounded h-fit top-[100%] right-0 bottom-0 w-max mt-[1em] mx-auto min-w-[150px] ease-in duration-900 shadow">
            <NavigationMenu.Root orientation="vertical" className="w-full">
              <SubMenu
                submenu={item.submenu}
                globalPageProps={globalPageProps}
              />
            </NavigationMenu.Root>
          </NavigationMenu.Content>
        </>
      )}
    </NavigationMenu.Item>
  );
};

// Main Menu Component
export const MainMenu: React.FC<MenuProps> = ({
  globalPageProps,
  menus = [],
}) => {
  const pathname = usePathname();

  return (
    <NavigationMenu.Root
      key={pathname}
      className="z-10 hidden min-[1140px]:block"
    >
      <NavigationMenu.List className="flex items-center justify-end gap-w8 text-foreground">
        {menus.map((menuItem) => (
          <MenuItemComponent
            key={menuItem.id}
            item={menuItem}
            globalPageProps={globalPageProps}
          />
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
