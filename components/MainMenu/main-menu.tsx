"use client";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Link } from "../ui/link";
import { Text } from "../ui/text";
import { MainMenuDialog } from "./main-menu-dialog";
import { buildUrl, GlobalPageProps } from "@/utils/globalPageProps";

export type Menu = {
  id: string;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
};

export type MenuProps = {
  menus?: Menu[];
  globalPageProps: GlobalPageProps;
};

export const MainMenu = ({ globalPageProps, menus = []}: MenuProps) => {
  const pathname = usePathname();

  return (
    <NavigationMenu.Root key={pathname} className="z-10 hidden min-[1140px]:block">
      <NavigationMenu.List className="flex items-center justify-end gap-w8 text-foreground">
        {menus.map((item) => (
          <NavigationMenu.Item
            key={item.id}
            className="flex items-center justify-end hover:text-primary relative"
          >
            {(!item.submenu || item.submenu.length === 0) && (
              <Link
                key={item.id}
                href={buildUrl(globalPageProps, item.path)}
                className={clsx(
                  item.path === pathname ? "text-primary" : ""
                )}
              >
                <Text as="span" weight="semi">
                  {item.title}
                </Text>
              </Link>
            )}
            {item.submenu && item.submenu.length > 0 && (
              <>
                <NavigationMenu.Trigger className="group">
                  <Text as="span" weight="semi">
                    {item.title}
                    <CaretDownIcon
                      width={20}
                      height={20}
                      className="inline ml-2 transition-transform ease-in group-data-[state=open]:-rotate-180"
                      aria-hidden
                    />
                  </Text>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="bg-theme-blue text-white absolute flex justify-start rounded h-fit top-[100%] left-0 right-0 bottom-0 w-max mt-[1em] mx-auto min-w-[150px] ease-in duration-900 overflow-hidden shadow">
                  <NavigationMenu.Sub orientation="vertical" className="w-full">
                    <NavigationMenu.List>
                      {item.submenu.map((submenu) => (
                        <NavigationMenu.Item
                          key={`${submenu.id}`}
                        >
                          <Link
                            key={submenu.id}
                            href={buildUrl(globalPageProps, submenu.path)}
                            className={clsx(
                              item.path === pathname ? "text-primary" : "",
                              "py-2 px-4 block text-white hover:bg-theme-canvas hover:text-theme-blue"
                            )}
                          >
                            <Text as="span" size="small">
                              {submenu.title}
                            </Text>
                          </Link>
                        </NavigationMenu.Item>
                      ))}
                    </NavigationMenu.List>
                  </NavigationMenu.Sub>
                </NavigationMenu.Content>
              </>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export const MainMenuMobile = ({ globalPageProps, menus = []}: MenuProps) => {
  const pathname = usePathname();

  return (     
    <MainMenuDialog key={pathname}>
      <NavigationMenu.Root className="w-screen" orientation="vertical">
        <NavigationMenu.List className="flex flex-col text-foreground">
          {menus.map((item, index) => (
            <NavigationMenu.Item
              key={item.title}
              className="flex flex-col hover:text-primary relative w-full"
            >
              {(!item.submenu || item.submenu.length === 0) && (
                <NavigationMenu.Link asChild>
                  <Link
                    key={item.id}
                    href={buildUrl(globalPageProps, item.path)}
                    className={clsx(
                      item.path === pathname ? "text-primary" : "",
                      { 'py-3': index !== 0 },
                      { 'pb-3': index === 0 },
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
                  <NavigationMenu.Trigger className={clsx(
                    'group text-left',
                    item.path === pathname ? "text-primary" : "",
                    { 'py-3': index !== 0 },
                    { 'pb-3': index === 0 },
                  )}>
                    <Text as="span" className="text-base text-white" weight="semi">
                      {item.title}
                      <CaretDownIcon
                        width={20}
                        height={20}
                        className="inline ml-2 transition-transform ease-in group-data-[state=open]:-rotate-180"
                        aria-hidden
                      />
                    </Text>
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className={clsx([
                    "justify-start top-[100%] left-0 right-0 bottom-0",
                    "min-w-[150px] w-max",
                    "bg-theme-blue text-white flex flex-col rounded h-fit ease-in duration-900 overflow-hidden"
                  ])}>
                    <NavigationMenu.Sub orientation="vertical">
                      <NavigationMenu.List>
                        {item.submenu.map((submenu) => (
                          <NavigationMenu.Item
                            key={`${submenu.id}`}
                          >
                            <NavigationMenu.Link asChild>
                              <Link
                                key={submenu.id}
                                href={buildUrl(globalPageProps, submenu.path)}
                                className={clsx(
                                  item.path === pathname
                                    ? "text-primary"
                                    : "",
                                  "py-2 px-4 block text-white"
                                )}
                              >
                                <Text as="span" size="small">
                                  {submenu.title}
                                </Text>
                              </Link>
                            </NavigationMenu.Link>
                          </NavigationMenu.Item>
                        ))}
                      </NavigationMenu.List>
                    </NavigationMenu.Sub>
                  </NavigationMenu.Content>
                </>
              )}
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </MainMenuDialog>
  );
};
