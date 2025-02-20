import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Create new models/block models");

  console.log(
    'Create model "\uD83D\uDC68\u200D\uD83C\uDF93 Research" (`research`)',
  );
  await client.itemTypes.create(
    {
      id: "IWN8zBqhQoOBOPP7OST6SQ",
      name: "\uD83D\uDC68\u200D\uD83C\uDF93 Research",
      api_key: "research",
      draft_mode_active: true,
      draft_saving_active: false,
      collection_appearance: "table",
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: "XBaXMgbYSp2xnGBzFZoeow",
    },
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create fieldset "\uD83C\uDF9E\uFE0F Media" in model "\uD83D\uDC68\u200D\uD83C\uDF93 Research" (`research`)',
  );
  await client.fieldsets.create("IWN8zBqhQoOBOPP7OST6SQ", {
    id: "NPBMJO1CTbq8FYkFyAY6lQ",
    title: "\uD83C\uDF9E\uFE0F Media",
    collapsible: true,
  });

  console.log(
    'Create fieldset "\uD83D\uDCCA SEO & Readability" in model "\uD83D\uDC68\u200D\uD83C\uDF93 Research" (`research`)',
  );
  await client.fieldsets.create("IWN8zBqhQoOBOPP7OST6SQ", {
    id: "KXsfLGhlSi-eZl-eofjHbQ",
    title: "\uD83D\uDCCA SEO & Readability",
    collapsible: true,
    start_collapsed: true,
  });

  console.log(
    'Create Single asset field "Promo image" (`promo_image`) in model "\uD83D\uDC68\u200D\uD83C\uDF93 Research" (`research`)',
  );
  await client.fields.create("IWN8zBqhQoOBOPP7OST6SQ", {
    id: "OB5yx1o2TNStJljFl9al_A",
    label: "Promo image",
    field_type: "file",
    api_key: "promo_image",
    validators: {
      extension: { extensions: [], predefined_list: "transformable_image" },
    },
    appearance: { addons: [], editor: "file", parameters: {} },
    fieldset: { id: "NPBMJO1CTbq8FYkFyAY6lQ", type: "fieldset" },
  });

  console.log(
    'Create SEO meta tags field "SEO Tags" (`seo_tags`) in model "\uD83D\uDC68\u200D\uD83C\uDF93 Research" (`research`)',
  );
  await client.fields.create("IWN8zBqhQoOBOPP7OST6SQ", {
    id: "Jckhpnv9TWCcw-EJgNHVMw",
    label: "SEO Tags",
    field_type: "seo",
    api_key: "seo_tags",
    localized: true,
    validators: {
      required_seo_fields: {
        title: true,
        description: false,
        image: false,
        twitter_card: false,
      },
      title_length: { max: 75 },
      description_length: { max: 160 },
    },
    appearance: {
      addons: [],
      editor: "seo",
      parameters: {
        fields: ["title", "description", "image", "twitter_card"],
        previews: ["google", "twitter", "facebook"],
      },
    },
    default_value: { en: null },
    fieldset: { id: "KXsfLGhlSi-eZl-eofjHbQ", type: "fieldset" },
  });

  console.log(
    'Create Single-line string field "Title" (`title`) in model "\uD83D\uDC68\u200D\uD83C\uDF93 Research" (`research`)',
  );
  await client.fields.create("IWN8zBqhQoOBOPP7OST6SQ", {
    id: "MdfORl-gR0qU89q1xYnJ9g",
    label: "Title",
    field_type: "string",
    api_key: "title",
    localized: true,
    validators: { required: {}, unique: {} },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: true, placeholder: null },
      type: "title",
    },
    default_value: { en: "" },
  });

  console.log(
    'Create Structured text field "Content" (`content`) in model "\uD83D\uDC68\u200D\uD83C\uDF93 Research" (`research`)',
  );
  await client.fields.create("IWN8zBqhQoOBOPP7OST6SQ", {
    id: "XTdTakXnR1i3h1DoqLlSsw",
    label: "Content",
    field_type: "structured_text",
    api_key: "content",
    localized: true,
    validators: {
      required: {},
      structured_text_blocks: {
        item_types: ["2085698", "2109349", "b_hmlcAERaeNHwlZ0t08jg"],
      },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["IWN8zBqhQoOBOPP7OST6SQ"],
      },
    },
    appearance: {
      addons: [],
      editor: "structured_text",
      parameters: {
        marks: [
          "strong",
          "emphasis",
          "underline",
          "strikethrough",
          "highlight",
        ],
        nodes: ["blockquote", "heading", "link", "list"],
        heading_levels: [1, 2, 3, 4, 5, 6],
        blocks_start_collapsed: true,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
    default_value: { en: null },
  });

  console.log(
    'Create JSON field "SEO Analysis" (`seo_analysis`) in model "\uD83D\uDC68\u200D\uD83C\uDF93 Research" (`research`)',
  );
  await client.fields.create("IWN8zBqhQoOBOPP7OST6SQ", {
    id: "IqOHh3I8R9emTFfyW6aOyA",
    label: "SEO Analysis",
    field_type: "json",
    api_key: "seo_analysis",
    appearance: { addons: [], editor: "json", parameters: {} },
    fieldset: { id: "KXsfLGhlSi-eZl-eofjHbQ", type: "fieldset" },
  });

  console.log(
    'Create Slug field "Slug" (`slug`) in model "\uD83D\uDC68\u200D\uD83C\uDF93 Research" (`research`)',
  );
  await client.fields.create("IWN8zBqhQoOBOPP7OST6SQ", {
    id: "MuAexX4rSUeD91_moJ8W7A",
    label: "Slug",
    field_type: "slug",
    api_key: "slug",
    validators: {
      slug_title_field: { title_field_id: "MdfORl-gR0qU89q1xYnJ9g" },
      slug_format: { predefined_pattern: "webpage_slug" },
      required: {},
      unique: {},
    },
    appearance: {
      addons: [],
      editor: "slug",
      parameters: {
        url_prefix: "https://www.aul.city/research/",
        placeholder: null,
      },
    },
    fieldset: { id: "KXsfLGhlSi-eZl-eofjHbQ", type: "fieldset" },
  });

  console.log("Finalize models/block models");

  console.log(
    'Update model "\uD83D\uDC68\u200D\uD83C\uDF93 Research" (`research`)',
  );
  await client.itemTypes.update("IWN8zBqhQoOBOPP7OST6SQ", {
    title_field: { id: "MdfORl-gR0qU89q1xYnJ9g", type: "field" },
    image_preview_field: { id: "OB5yx1o2TNStJljFl9al_A", type: "field" },
  });

  console.log("Manage model filters");

  console.log(
    'Create filter "\uD83D\uDEA7 Drafts only" of model "\uD83D\uDC68\u200D\uD83C\uDF93 Research" (`research`)',
  );
  await client.itemTypeFilters.create({
    id: "dOxyZ2W0RxOu_dLgUuO5EQ",
    name: "\uD83D\uDEA7 Drafts only",
    filter: { fields: { _status: { eq: "draft" } } },
    columns: [
      { name: "_preview", width: 0.6 },
      { name: "_status", width: 0.2 },
      { name: "_updated_at", width: 0.2 },
    ],
    order_by: null,
    shared: true,
    item_type: { id: "IWN8zBqhQoOBOPP7OST6SQ", type: "item_type" },
  });

  console.log("Manage menu items");

  console.log('Create menu item "Research"');
  await client.menuItems.create({
    id: "L9wFgka-Tgybhbvkhpu9Og",
    label: "Research",
  });

  console.log('Create menu item "\uD83D\uDC68\u200D\uD83C\uDF93 All Research"');
  await client.menuItems.create({
    id: "JdQfNYqoQBGAevLndxQpgQ",
    label: "\uD83D\uDC68\u200D\uD83C\uDF93 All Research",
    item_type: { id: "IWN8zBqhQoOBOPP7OST6SQ", type: "item_type" },
    parent: { id: "L9wFgka-Tgybhbvkhpu9Og", type: "menu_item" },
  });

  console.log('Create menu item "\uD83D\uDEA7 Drafts only"');
  await client.menuItems.create({
    id: "fVriqbBmQl6PNxvLQ165gg",
    label: "\uD83D\uDEA7 Drafts only",
    item_type: { id: "IWN8zBqhQoOBOPP7OST6SQ", type: "item_type" },
    item_type_filter: {
      id: "dOxyZ2W0RxOu_dLgUuO5EQ",
      type: "item_type_filter",
    },
    parent: { id: "L9wFgka-Tgybhbvkhpu9Og", type: "menu_item" },
  });

  console.log('Update menu item "Research"');
  await client.menuItems.update("L9wFgka-Tgybhbvkhpu9Og", { position: 8 });

  console.log("Manage schema menu items");

  console.log(
    'Update model schema menu item for model "\uD83D\uDC68\u200D\uD83C\uDF93 Research" (`research`)',
  );
  await client.schemaMenuItems.update("XBaXMgbYSp2xnGBzFZoeow", {
    position: 0,
    parent: { id: "baBbXjdySimdazYxaaGdaA", type: "schema_menu_item" },
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
    'Update model schema menu item for model "\uD83C\uDFE1 Page" (`page`)',
  );
  await client.schemaMenuItems.update("P86vtW2gRIqlFcNdew-uqg", {
    position: 2,
  });

  console.log(
    'Update model schema menu item for model "\uD83E\uDDE9 Layout" (`layout`)',
  );
  await client.schemaMenuItems.update("JIv9dy6MRFe5TFRfwSktDA", {
    position: 1,
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
