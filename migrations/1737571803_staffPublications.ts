import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Create new models/block models");

  console.log('Create block model "\uD83D\uDCD1 Tab" (`tab`)');
  await client.itemTypes.create(
    {
      id: "GcSGVxUET2ec-fV4jo3rdA",
      name: "\uD83D\uDCD1 Tab",
      api_key: "tab",
      modular_block: true,
      draft_saving_active: false,
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: "cPVsLSr5SbetvwAnYaVxrQ",
    },
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Tab Name" (`tab_name`) in block model "\uD83D\uDCD1 Tab" (`tab`)',
  );
  await client.fields.create("GcSGVxUET2ec-fV4jo3rdA", {
    id: "N78kplQgRiSfx7a5J9naPg",
    label: "Tab Name",
    field_type: "string",
    api_key: "tab_name",
    validators: { required: {}, length: { min: 1, max: 80 } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
  });

  console.log(
    'Create Multiple-paragraph text field "Tab Content" (`tab_content`) in block model "\uD83D\uDCD1 Tab" (`tab`)',
  );
  await client.fields.create("GcSGVxUET2ec-fV4jo3rdA", {
    id: "fkNCKxsOTK-s7S7BL62Ckg",
    label: "Tab Content",
    field_type: "text",
    api_key: "tab_content",
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "markdown",
      parameters: {
        toolbar: [
          "heading",
          "bold",
          "italic",
          "strikethrough",
          "code",
          "unordered_list",
          "ordered_list",
          "quote",
          "link",
          "image",
          "fullscreen",
        ],
      },
      type: "markdown",
    },
  });

  console.log(
    'Create Modular Content (Multiple blocks) field "Publications" (`publications`) in model "\u270D\uFE0F Author" (`author`)',
  );
  await client.fields.create("2085697", {
    id: "G40N7U4qTnilrDkkFDCyWw",
    label: "Publications",
    field_type: "rich_text",
    api_key: "publications",
    validators: {
      rich_text_blocks: { item_types: ["GcSGVxUET2ec-fV4jo3rdA"] },
      size: { min: 0, max: 5 },
    },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: false },
    },
    fieldset: { id: "813738", type: "fieldset" },
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Single-line string field "Area of interest" (`area_of_interest`) in model "\u270D\uFE0F Author" (`author`)',
  );
  await client.fields.update("10875891", { position: 5 });

  console.log("Destroy models/block models");

  console.log(
    'Delete block model "\uD83D\uDE80 Hero section" (`hero_section`)',
  );
  await client.itemTypes.destroy("2084697", { skip_menu_items_deletion: true });

  console.log(
    'Delete block model "\uD83D\uDCCB Feature list section" (`feature_list_section`)',
  );
  await client.itemTypes.destroy("2084698", { skip_menu_items_deletion: true });

  console.log('Delete block model "\uD83D\uDCF2 CTA App Download" (`app_cta`)');
  await client.itemTypes.destroy("2282426", { skip_menu_items_deletion: true });

  console.log(
    'Delete block model "\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83C\uDFEB Staff" (`staff`)',
  );
  await client.itemTypes.destroy("bd1K95QFT4Kn9aTNdkl2-A", {
    skip_menu_items_deletion: true,
  });

  console.log("Manage schema menu items");

  console.log(
    'Update block schema menu item for block model "\uD83C\uDFAF Button" (`button`)',
  );
  await client.schemaMenuItems.update("e4UlxKRuT36wRRnWP-U3Ug", {
    position: 26,
  });

  console.log(
    'Update model schema menu item for model "Schema migration" (`schema_migration`)',
  );
  await client.schemaMenuItems.update("AC0l1YlpSGKWLqiiQxXKCg", {
    position: 27,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDCD5 PDF block" (`pdf_block`)',
  );
  await client.schemaMenuItems.update("QmgtcLIBRKuTCzhCuI3kKg", {
    position: 4,
  });

  console.log(
    'Update block schema menu item for block model "\uD83C\uDF05 Image block" (`image_block`)',
  );
  await client.schemaMenuItems.update("UfFvNLboSVaWDE8Z9_LD6A", {
    position: 3,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDCD1 Tab" (`tab`)',
  );
  await client.schemaMenuItems.update("cPVsLSr5SbetvwAnYaVxrQ", {
    position: 25,
  });
}
