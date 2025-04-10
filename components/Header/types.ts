type BaseItem = {
  id: string;
  title?: string;
}

type PointsTo = {
  page?: { slug: string };
}

export type MenuItem = BaseItem & PointsTo & {
  __typename: 'MenuItemRecord';
};

export type MenuDropdownRecord = BaseItem & {
  __typename: 'MenuDropdownRecord';
  items: SecondaryMenuItem[];
};

export type MenuDropdownItemRecord = BaseItem & PointsTo &{
  __typename: 'MenuDropdownItemRecord';
  dropdownItems: MenuItem[];
};

export type MenuItemButtonRecord = BaseItem & PointsTo & {
  __typename: 'MenuItemButtonRecord';
};

export type SecondaryMenuItem = MenuDropdownItemRecord | MenuItem;

export type TopLevelMenuItem = MenuDropdownRecord | MenuItemButtonRecord | MenuItem;
