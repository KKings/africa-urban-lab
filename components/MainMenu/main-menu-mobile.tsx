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
import type { Menu, MenuProps } from "./types";

// Submenu Component
const SubMenu: React.FC<{
  submenu: Menu[];
  globalPageProps: any;
  basePath: string;
  className?: string;
}> = ({ submenu, globalPageProps, basePath, className }) => {
  const pathname = usePathname();
  return (
    <NavigationMenu.List className={className}>
      {submenu.map((submenuItem) => (
        <NavigationMenu.Item key={submenuItem.id}>
          {submenuItem.submenu && submenuItem.submenu.length > 0 ? (
            <>
              <NavigationMenu.Trigger
                className={clsx(
                  "flex items-center justify-between",
                  "group pl-2 w-full text-white"
                )}
              >
                <Link
                  href={buildUrl(globalPageProps, submenuItem.path)}
                  className={clsx(
                    submenuItem.path === pathname ? "text-primary" : "",
                    "py-2"
                  )}
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
                    "group-data-[state=open]:-rotate-180"
                  )}
                  aria-hidden
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content
                className={clsx(
                  "flex justify-start h-fit mx-auto w-full",
                  "bg-theme-blue text-whiteease-in duration-900 overflow-hidden"
                )}
              >
                <SubMenu
                  submenu={submenuItem.submenu}
                  globalPageProps={globalPageProps}
                  basePath={basePath}
                  className="w-full px-2"
                />
              </NavigationMenu.Content>
            </>
          ) : (
            <NavigationMenu.Link asChild>
              <Link
                href={buildUrl(globalPageProps, submenuItem.path)}
                className={clsx(
                  basePath === submenuItem.path ? "text-primary" : "",
                  "py-2 px-2 block text-white"
                )}
              >
                <Text as="span" size="small">
                  {submenuItem.title}
                </Text>
              </Link>
            </NavigationMenu.Link>
          )}
        </NavigationMenu.Item>
      ))}
    </NavigationMenu.List>
  );
};

// Main Menu Item Component
const MenuItemComponent: React.FC<{
  item: Menu;
  globalPageProps: any;
  index: number;
  basePath: string;
}> = ({ item, globalPageProps, index, basePath }) => {
  const pathname = usePathname();

  return (
    <NavigationMenu.Item className="flex flex-col hover:text-primary relative w-full">
      {item.isButton && (
        <NavigationMenu.Link asChild>
          <Button asChild size="lg" className="text-white">
            <Link href={buildUrl(globalPageProps, item.path)}>
              <Text as="span" weight="semi">
                {item.title}
              </Text>
            </Link>
          </Button>
        </NavigationMenu.Link>
      )}
      {(!item.submenu || item.submenu.length === 0) && !item.isButton && (
        <NavigationMenu.Link asChild>
          <Link
            href={buildUrl(globalPageProps, item.path)}
            className={clsx(
              basePath === item.path ? "text-primary" : "",
              { "py-3": index !== 0 },
              { "pb-3": index === 0 }
            )}
          >
            <Text as="span" weight="semi" className="text-white">
              {item.title}
            </Text>
          </Link>
        </NavigationMenu.Link>
      )}
      {item.submenu && item.submenu.length > 0 && (
        <>
          <NavigationMenu.Trigger
            id={item.id}
            asChild
            className={clsx(
              "group text-left flex justify-between",
              basePath === item.path ? "text-primary" : "",
              { "py-3": index !== 0 },
              { "pb-3": index === 0 }
            )}
          >
            <Text as="span" className="text-base text-white" weight="semi">
              {item.title}
              <CaretDownIcon
                width={20}
                height={20}
                className="transition-transform ease-in group-data-[state=open]:-rotate-180"
                aria-hidden
              />
            </Text>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className={clsx(
              "w-full",
              "justify-start rounded h-fit ease-in duration-900 overflow-hidden",
              "bg-theme-blue text-white"
            )}
          >
            <NavigationMenu.Root orientation="vertical">
              <SubMenu
                submenu={item.submenu}
                globalPageProps={globalPageProps}
                basePath={pathname}
              />
            </NavigationMenu.Root>
          </NavigationMenu.Content>
        </>
      )}
    </NavigationMenu.Item>
  );
};

// Main Mobile Menu Component
export const MainMenuMobile: React.FC<MenuProps> = ({
  globalPageProps,
  menus = [],
}) => {
  const pathname = usePathname();

  return (
    <MainMenuDialog
      key={pathname}
      className="overflow-y-scroll overflow-x-hidden block"
    >
      <NavigationMenu.Root orientation="vertical">
        <NavigationMenu.List className="flex flex-col text-foreground">
          {menus.map((menuItem, index) => (
            <MenuItemComponent
              key={menuItem.id}
              item={menuItem}
              index={index}
              globalPageProps={globalPageProps}
              basePath={pathname}
            />
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </MainMenuDialog>
  );
};
