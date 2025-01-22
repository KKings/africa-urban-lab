import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Create new models/block models");

  console.log(
    'Create block model "\uD83E\uDE9F Split Video Text Section" (`split_video_text_section`)',
  );
  await client.itemTypes.create(
    {
      id: "eby1tdwMQS-DiO-XgI5kdw",
      name: "\uD83E\uDE9F Split Video Text Section",
      api_key: "split_video_text_section",
      modular_block: true,
      draft_saving_active: false,
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: "BV6BnM-dQWmwKz172kfSGQ",
    },
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Title" (`title`) in block model "\uD83E\uDE9F Split Video Text Section" (`split_video_text_section`)',
  );
  await client.fields.create("eby1tdwMQS-DiO-XgI5kdw", {
    id: "LcuKwhAoQqKAwXWBFH_FAw",
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
    'Create Multiple-paragraph text field "Text" (`text`) in block model "\uD83E\uDE9F Split Video Text Section" (`split_video_text_section`)',
  );
  await client.fields.create("eby1tdwMQS-DiO-XgI5kdw", {
    id: "dScDURtcTkycsnKm3gDKbQ",
    label: "Text",
    field_type: "text",
    api_key: "text",
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
    default_value: "",
  });

  console.log(
    'Create Modular Content (Single block) field "Link" (`link`) in block model "\uD83E\uDE9F Split Video Text Section" (`split_video_text_section`)',
  );
  await client.fields.create("eby1tdwMQS-DiO-XgI5kdw", {
    id: "WMP5R0gCSFqbYWq8LRnHRQ",
    label: "Link",
    field_type: "single_block",
    api_key: "link",
    validators: { single_block_blocks: { item_types: ["2109349"] } },
    appearance: {
      addons: [],
      editor: "framed_single_block",
      parameters: { start_collapsed: false },
    },
  });

  console.log(
    'Create Single-line string field "Video URL" (`video_url`) in block model "\uD83E\uDE9F Split Video Text Section" (`split_video_text_section`)',
  );
  await client.fields.create("eby1tdwMQS-DiO-XgI5kdw", {
    id: "He4LGjzOTH6GIpZDCeI0aA",
    label: "Video URL",
    field_type: "string",
    api_key: "video_url",
    hint: "URLs must use https://www.youtube.com",
    validators: { required: {}, format: { predefined_pattern: "url" } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
  });

  console.log(
    'Create Single-line string field "Alignment" (`alignment`) in block model "\uD83E\uDE9F Split Video Text Section" (`split_video_text_section`)',
  );
  await client.fields.create("eby1tdwMQS-DiO-XgI5kdw", {
    id: "O8d9PjeeSgSwM_XIwot6Ow",
    label: "Alignment",
    field_type: "string",
    api_key: "alignment",
    appearance: {
      addons: [],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "Image displayed on left", label: "Left", value: "left" },
          { hint: "Image displayed on right", label: "Right", value: "right" },
        ],
      },
    },
    default_value: "left",
  });

  console.log(
    'Create Single-line string field "Grid" (`grid`) in block model "\uD83E\uDE9F Split Video Text Section" (`split_video_text_section`)',
  );
  await client.fields.create("eby1tdwMQS-DiO-XgI5kdw", {
    id: "A3LIMvZTSr2b0JFforn-xg",
    label: "Grid",
    field_type: "string",
    api_key: "grid",
    hint: "Allows the grid to accommodate larger or smaller images variations",
    appearance: {
      addons: [],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "1/2 Grid", value: "1/2" },
          { hint: "", label: "1/3 Grid", value: "1/3" },
          { hint: "", label: "2/3 Grid", value: "2/3" },
          { hint: "", label: "2/5 Grid", value: "2/5" },
          { hint: "", label: "3/5 Grid", value: "3/5" },
        ],
      },
    },
    default_value: "2/5",
  });

  console.log(
    'Create Color field "BG Color" (`bg_color`) in block model "\uD83E\uDE9F Split Video Text Section" (`split_video_text_section`)',
  );
  await client.fields.create("eby1tdwMQS-DiO-XgI5kdw", {
    id: "PlJndhJ-TSq0GhcuVFfr7A",
    label: "BG Color",
    field_type: "color",
    api_key: "bg_color",
    appearance: {
      addons: [],
      editor: "color_picker",
      parameters: {
        enable_alpha: false,
        preset_colors: [
          "#E0F61D",
          "#4A7DC7",
          "#020817",
          "#EFEFEF",
          "#FD5A47",
          "#383838",
          "#FFFFFF",
        ],
      },
    },
  });

  console.log(
    'Create Color field "Text Color" (`text_color`) in block model "\uD83E\uDE9F Split Video Text Section" (`split_video_text_section`)',
  );
  await client.fields.create("eby1tdwMQS-DiO-XgI5kdw", {
    id: "euNZgAmNRXO0OFMQm-wgcA",
    label: "Text Color",
    field_type: "color",
    api_key: "text_color",
    appearance: {
      addons: [],
      editor: "color_picker",
      parameters: {
        enable_alpha: false,
        preset_colors: [
          "#E0F61D",
          "#4A7DC7",
          "#020817",
          "#EFEFEF",
          "#FD5A47",
          "#383838",
        ],
      },
    },
  });

  console.log(
    'Create Single-line string field "Text Variant" (`text_variant`) in block model "\uD83E\uDE9F Split Video Text Section" (`split_video_text_section`)',
  );
  await client.fields.create("eby1tdwMQS-DiO-XgI5kdw", {
    id: "MdAZucYtQBy0GevIiZbDFQ",
    label: "Text Variant",
    field_type: "string",
    api_key: "text_variant",
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "Default", value: "default" },
          { hint: "", label: "Large", value: "large" },
        ],
      },
    },
    default_value: "default",
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular Content (Multiple blocks) field "Sections" (`sections`) in model "\uD83C\uDFE1 Page" (`page`)',
  );
  await client.fields.update("11086803", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "2204737",
          "WScKGoySSOams8_mMq0Sog",
          "LOkyx7f9QLipPyiaben38Q",
          "bQuAbnQnSy-_BNU32CjYmQ",
          "HJRkczOVSKO6bVgkWq3qaA",
          "GHAPmi3hSaKK_WQQdziuLg",
          "I5SBWnaHRE2k7iFjkbpDNg",
          "LlZbWrFCQt-gF3uYOILa7A",
          "MQs9QTTISQmCgbQZR7E60Q",
          "B6xJsqAiRwmECPkHB52nAQ",
          "cCeg5Nh9ReW5fs9dhjWMkw",
          "aCp3BpIWSeqbjFuySBfxBw",
          "N34J1DBCSaG928I3jaGo2Q",
          "OQmGzidvR_aENUr48N63kw",
          "KK407QHkQVOu5c5lbu7tBw",
          "Ntp0kizPT4GcxQQs0bJZ_A",
          "MFAEHZMFQj-fFKc0RYlFQw",
          "ECINJ0pXThiAMaNzY6tZ2w",
          "AKC-SXtYQ7m4CzUF0ytkww",
          "bFhDkTPmRRSg3xebaZkVYw",
          "eby1tdwMQS-DiO-XgI5kdw",
        ],
      },
    },
  });

  console.log("Manage schema menu items");

  console.log(
    'Update block schema menu item for block model "\uD83E\uDE9F Split Video Text Section" (`split_video_text_section`)',
  );
  await client.schemaMenuItems.update("BV6BnM-dQWmwKz172kfSGQ", {
    position: 15,
    parent: { id: "agr785WyTJef9r-BiHlP7Q", type: "schema_menu_item" },
  });

  console.log('Update block schema menu item "Form blocks"');
  await client.schemaMenuItems.update("EizOsXTsTjqApslkos5xHw", {
    position: 16,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDCCB Feature list section" (`feature_list_section`)',
  );
  await client.schemaMenuItems.update("TpyN5fSNRJ6U_bctGBYpgw", {
    position: 17,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDE80 Hero section" (`hero_section`)',
  );
  await client.schemaMenuItems.update("VsRb1yyyT5S8iEhHc5kkVA", {
    position: 24,
  });

  console.log(
    'Update block schema menu item for block model "\uD83C\uDFAF Button" (`button`)',
  );
  await client.schemaMenuItems.update("e4UlxKRuT36wRRnWP-U3Ug", {
    position: 25,
  });

  console.log('Update block schema menu item "Content blocks"');
  await client.schemaMenuItems.update("DLQ0KW1yQoG5JUmgcquWzA", {
    position: 15,
  });

  console.log(
    'Update model schema menu item for model "Schema migration" (`schema_migration`)',
  );
  await client.schemaMenuItems.update("AC0l1YlpSGKWLqiiQxXKCg", {
    position: 26,
  });
}
