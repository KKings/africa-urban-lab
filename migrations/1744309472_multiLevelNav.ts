import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Create new models/block models");

  console.log(
    'Create block model "\u27A1\uFE0F Menu Dropdown Item" (`menu_dropdown_item`)',
  );
  await client.itemTypes.create(
    {
      id: "cL9VhvLCQ46YBZJlXTFmjQ",
      name: "\u27A1\uFE0F Menu Dropdown Item",
      api_key: "menu_dropdown_item",
      modular_block: true,
      draft_saving_active: false,
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: "etk9mG0UQriPnFCMXlBBgg",
    },
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Title" (`title`) in block model "\u27A1\uFE0F Menu Dropdown Item" (`menu_dropdown_item`)',
  );
  await client.fields.create("cL9VhvLCQ46YBZJlXTFmjQ", {
    id: "CNR_SLAsQgqfG7DMNeNZ6w",
    label: "Title",
    field_type: "string",
    api_key: "title",
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
    default_value: "",
  });

  console.log(
    'Create Single link field "Points to" (`page`) in block model "\u27A1\uFE0F Menu Dropdown Item" (`menu_dropdown_item`)',
  );
  await client.fields.create("cL9VhvLCQ46YBZJlXTFmjQ", {
    id: "WwmLaUEBQMioV_7Kkc1egQ",
    label: "Points to",
    field_type: "link",
    api_key: "page",
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["2125262"],
      },
      required: {},
    },
    appearance: { addons: [], editor: "link_select", parameters: {} },
  });

  console.log(
    'Create Modular Content (Multiple blocks) field "Dropdown Items" (`dropdown_items`) in block model "\u27A1\uFE0F Menu Dropdown Item" (`menu_dropdown_item`)',
  );
  await client.fields.create("cL9VhvLCQ46YBZJlXTFmjQ", {
    id: "TGXdiL4pRy2wC5dOH-odCw",
    label: "Dropdown Items",
    field_type: "rich_text",
    api_key: "dropdown_items",
    validators: { rich_text_blocks: { item_types: ["2263908"] } },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: false },
    },
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular Content (Multiple blocks) field "Dropdown items" (`items`) in block model "\uD83D\uDD3D Menu Dropdown" (`menu_dropdown`)',
  );
  await client.fields.update("11772654", {
    validators: {
      rich_text_blocks: { item_types: ["2263908", "cL9VhvLCQ46YBZJlXTFmjQ"] },
    },
  });

  console.log("Finalize models/block models");

  console.log(
    'Update block model "\u27A1\uFE0F Menu Dropdown Item" (`menu_dropdown_item`)',
  );

  console.log("Manage schema menu items");

  console.log(
    'Update block schema menu item for block model "\u27A1\uFE0F Menu Dropdown Item" (`menu_dropdown_item`)',
  );
  await client.schemaMenuItems.update("etk9mG0UQriPnFCMXlBBgg", {
    parent: { id: "Ue6fNwXBR3SNXIhLQbXRqA", type: "schema_menu_item" },
  });

  console.log('Update model schema menu item "Research"');
  await client.schemaMenuItems.update("baBbXjdySimdazYxaaGdaA", {
    position: 11,
  });

  console.log('Update block schema menu item "Form blocks"');
  await client.schemaMenuItems.update("EizOsXTsTjqApslkos5xHw", {
    position: 16,
  });

  console.log('Update model schema menu item "News"');
  await client.schemaMenuItems.update("Mpq1S6AJStSheVzX3HjUbA", {
    position: 4,
  });

  console.log('Update model schema menu item "Blog"');
  await client.schemaMenuItems.update("cnRHtKBZRTGrVkJ2K4B2gQ", {
    position: 5,
  });

  console.log(
    'Update block schema menu item for block model "\uD83C\uDFAF Button" (`button`)',
  );
  await client.schemaMenuItems.update("e4UlxKRuT36wRRnWP-U3Ug", {
    position: 26,
  });

  console.log(
    'Update model schema menu item for model "\uD83C\uDFDB\uFE0F Legal Page" (`legal_page`)',
  );
  await client.schemaMenuItems.update("WmJ71hJ8SLWIb9s1hRzPAA", {
    position: 12,
  });

  console.log('Update block schema menu item "Page sections"');
  await client.schemaMenuItems.update("Qw5LYHeeQdOVKIF92SaJ0w", {
    position: 14,
  });

  console.log('Update block schema menu item "Layout & Navigation"');
  await client.schemaMenuItems.update("Ue6fNwXBR3SNXIhLQbXRqA", {
    position: 13,
  });

  console.log('Update block schema menu item "Content blocks"');
  await client.schemaMenuItems.update("DLQ0KW1yQoG5JUmgcquWzA", {
    position: 15,
  });

  console.log(
    'Update model schema menu item for model "\u270D\uFE0F Author" (`author`)',
  );
  await client.schemaMenuItems.update("PXk1tUiJTg--mwzqoXAUyA", {
    position: 3,
  });

  console.log(
    'Update model schema menu item for model "Schema migration" (`schema_migration`)',
  );
  await client.schemaMenuItems.update("AC0l1YlpSGKWLqiiQxXKCg", {
    position: 27,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDCD1 Tab" (`tab`)',
  );
  await client.schemaMenuItems.update("cPVsLSr5SbetvwAnYaVxrQ", {
    position: 25,
  });

  console.log(
    'Update block schema menu item for block model "\uD83C\uDFA5 Hero Video Section" (`hero_video_section`)',
  );
  await client.schemaMenuItems.update("CttT-yQuRjGI-Ra5u82Jtw", {
    position: 28,
  });
}
