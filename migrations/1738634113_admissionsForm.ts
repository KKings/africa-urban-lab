import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Create new models/block models");

  console.log(
    'Create block model "Admission Form Section" (`admission_form_section`)',
  );
  await client.itemTypes.create(
    {
      id: "Dv3xhBXYQIOwyRV0xisZQA",
      name: "Admission Form Section",
      api_key: "admission_form_section",
      modular_block: true,
      draft_saving_active: false,
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: "b67bGq3LQEiLQQNvYmUw2A",
    },
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Personal Info Title" (`personal_info_title`) in block model "Admission Form Section" (`admission_form_section`)',
  );
  await client.fields.create("Dv3xhBXYQIOwyRV0xisZQA", {
    id: "K2GAKz_hQjGj08uMk2VpZA",
    label: "Personal Info Title",
    field_type: "string",
    api_key: "personal_info_title",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
  });

  console.log(
    'Create Single-line string field "Personal Info Description" (`personal_info_description`) in block model "Admission Form Section" (`admission_form_section`)',
  );
  await client.fields.create("Dv3xhBXYQIOwyRV0xisZQA", {
    id: "HfWWdcsKTFeBxkH0hq9E-g",
    label: "Personal Info Description",
    field_type: "string",
    api_key: "personal_info_description",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
  });

  console.log(
    'Create Single-line string field "Experience Title" (`experience_title`) in block model "Admission Form Section" (`admission_form_section`)',
  );
  await client.fields.create("Dv3xhBXYQIOwyRV0xisZQA", {
    id: "e32Cd9MOTNKLO6SBtVRYzw",
    label: "Experience Title",
    field_type: "string",
    api_key: "experience_title",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
  });

  console.log(
    'Create Single-line string field "Experience Description" (`experience_description`) in block model "Admission Form Section" (`admission_form_section`)',
  );
  await client.fields.create("Dv3xhBXYQIOwyRV0xisZQA", {
    id: "XT2iwVgsQyi8yXXP9m81jw",
    label: "Experience Description",
    field_type: "string",
    api_key: "experience_description",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
  });

  console.log(
    'Create Single-line string field "Referral Title" (`referral_title`) in block model "Admission Form Section" (`admission_form_section`)',
  );
  await client.fields.create("Dv3xhBXYQIOwyRV0xisZQA", {
    id: "Z29Q49NmSbWC2XNY54nsyA",
    label: "Referral Title",
    field_type: "string",
    api_key: "referral_title",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
  });

  console.log(
    'Create Single-line string field "Referral Description" (`referral_description`) in block model "Admission Form Section" (`admission_form_section`)',
  );
  await client.fields.create("Dv3xhBXYQIOwyRV0xisZQA", {
    id: "Et_TCtlnTxul0Bfyy4Wouw",
    label: "Referral Description",
    field_type: "string",
    api_key: "referral_description",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
  });

  console.log(
    'Create Single-line string field "Documents Title" (`documents_title`) in block model "Admission Form Section" (`admission_form_section`)',
  );
  await client.fields.create("Dv3xhBXYQIOwyRV0xisZQA", {
    id: "a0SE-PeBSw2ehL2ZPkjolw",
    label: "Documents Title",
    field_type: "string",
    api_key: "documents_title",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
  });

  console.log(
    'Create Single-line string field "Documents Description" (`documents_description`) in block model "Admission Form Section" (`admission_form_section`)',
  );
  await client.fields.create("Dv3xhBXYQIOwyRV0xisZQA", {
    id: "WBWBts_dRMCxPHxhDbs6Pw",
    label: "Documents Description",
    field_type: "string",
    api_key: "documents_description",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
  });

  console.log(
    'Create Single-line string field "Submit Title" (`submit_title`) in block model "Admission Form Section" (`admission_form_section`)',
  );
  await client.fields.create("Dv3xhBXYQIOwyRV0xisZQA", {
    id: "dNjUH2ssTd2R0zljGPxb6g",
    label: "Submit Title",
    field_type: "string",
    api_key: "submit_title",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
  });

  console.log(
    'Create Single-line string field "Submit Description" (`submit_description`) in block model "Admission Form Section" (`admission_form_section`)',
  );
  await client.fields.create("Dv3xhBXYQIOwyRV0xisZQA", {
    id: "EapGUwaBQ1qvKzpLMReVEA",
    label: "Submit Description",
    field_type: "string",
    api_key: "submit_description",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
  });

  console.log(
    'Create Color field "BG Color" (`bg_color`) in block model "Admission Form Section" (`admission_form_section`)',
  );
  await client.fields.create("Dv3xhBXYQIOwyRV0xisZQA", {
    id: "EWu2I4DtScSZel77Px6Mrw",
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
    'Create Color field "Text Color" (`text_color`) in block model "Admission Form Section" (`admission_form_section`)',
  );
  await client.fields.create("Dv3xhBXYQIOwyRV0xisZQA", {
    id: "TLcaMCo8TiSz-r5kWCmQaA",
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
          "#FFFFFF",
        ],
      },
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
          "Dv3xhBXYQIOwyRV0xisZQA",
        ],
      },
    },
  });

  console.log("Manage schema menu items");

  console.log(
    'Update block schema menu item for block model "Admission Form Section" (`admission_form_section`)',
  );
  await client.schemaMenuItems.update("b67bGq3LQEiLQQNvYmUw2A", {
    position: 0,
    parent: { id: "EizOsXTsTjqApslkos5xHw", type: "schema_menu_item" },
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
