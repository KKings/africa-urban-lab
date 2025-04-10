import { DialogProvider } from "@/components/Dialog/hooks/use-dialog-context";
import { MainMenu, MainMenuMobile } from "@/components/MainMenu";
import { SiteLocale } from "@/graphql/types/graphql";
import { StoryObj, Meta } from "@storybook/react";

const meta: Meta<typeof MainMenu> = {
  title: "Components/MainMenu",
  component: MainMenu,
  args: {
    globalPageProps: {
      params: {
        locale: SiteLocale.En,
      },
    },
    menus: [
      {
        id: "1",
        title: "About",
        path: "/",
      },
      {
        id: "2",
        title: "Staff",
        path: "/",
      },
      {
        id: "4",
        title: "Our Work",
        path: "/",
        submenu: [
          {
            id: "5",
            title: "Training",
            path: "/",
          },
          {
            id: "5",
            title: "Education",
            path: "/",
            submenu: [
              {
                id: "5",
                title: "Professional Diploma in Urban Development",
                path: "/",
              },
            ],
          },
          {
            id: "5",
            title: "Research",
            path: "/",
          },
        ],
      },
      {
        id: "2",
        title: "Blog",
        path: "/",
      },
    ],
  },
  parameters: {
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof MainMenu>;

export const Desktop: Story = {
  render: (args) => (
    <div style={{ width: "100%", display: 'flex', justifyContent: 'start' }}>
      <DialogProvider>
        <MainMenu {...args} />
      </DialogProvider>
    </div>
  ),
};

export const Mobile: Story = {
  render: (args) => (
    <div style={{ width: "100%", display: 'flex', justifyContent: 'start' }}>
      <DialogProvider>
        <MainMenuMobile {...args} />
      </DialogProvider>
    </div>
  ),
};
