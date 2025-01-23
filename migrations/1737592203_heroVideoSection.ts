import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Create new models/block models");

  console.log(
    'Create block model "\uD83C\uDFA5 Hero Video Section" (`hero_video_section`)',
  );
  await client.itemTypes.create(
    {
      id: "f22ODKZrT8mcLqsu_erqEA",
      name: "\uD83C\uDFA5 Hero Video Section",
      api_key: "hero_video_section",
      modular_block: true,
      draft_saving_active: false,
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: "CttT-yQuRjGI-Ra5u82Jtw",
    },
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Video Url" (`video_url`) in block model "\uD83C\uDFA5 Hero Video Section" (`hero_video_section`)',
  );
  await client.fields.create("f22ODKZrT8mcLqsu_erqEA", {
    id: "SKUiIGM4Rr-s4NnIZ7cFZQ",
    label: "Video Url",
    field_type: "string",
    api_key: "video_url",
    validators: { required: {}, format: { predefined_pattern: "url" } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
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
          "f22ODKZrT8mcLqsu_erqEA",
        ],
      },
    },
  });

  console.log("Destroy models/block models");

  console.log(
    'Delete block model "\uD83D\uDCF9 Video Section" (`video_section`)',
  );
  await client.itemTypes.destroy("2085165", { skip_menu_items_deletion: true });

  console.log(
    'Delete block model "\uD83D\uDCF0 Featured posts section" (`featured_posts_section`)',
  );
  await client.itemTypes.destroy("2085691", { skip_menu_items_deletion: true });

  console.log(
    'Delete block model "\uD83D\uDCC4 Detail section" (`detail_section`)',
  );
  await client.itemTypes.destroy("2085695", { skip_menu_items_deletion: true });

  console.log(
    'Delete block model "\uD83D\uDCDA All Posts Section" (`all_posts_section`)',
  );
  await client.itemTypes.destroy("2185423", { skip_menu_items_deletion: true });

  console.log("Manage schema menu items");

  console.log(
    'Update block schema menu item for block model "\uD83D\uDD04 Redirect Section" (`redirect_section`)',
  );
  await client.schemaMenuItems.update("PlKuGJipSFmaD7p3SDtqBA", {
    position: 17,
  });
}
