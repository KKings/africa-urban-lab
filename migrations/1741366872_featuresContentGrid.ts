import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Grid" (`grid`) in block model "Featured Content Section" (`featured_content_section`)',
  );
  await client.fields.create("cCeg5Nh9ReW5fs9dhjWMkw", {
    id: "ITRWePveRH-BHo7fEAaPcQ",
    label: "Grid",
    field_type: "string",
    api_key: "grid",
    appearance: {
      addons: [],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "2 Column Grid", label: "2 Columns", value: "two" },
          { hint: "3 Column Grid", label: "3 Columns", value: "three" },
          { hint: "4 Column Grid", label: "4 Columns", value: "four" },
          { hint: "5 Column Grid", label: "5 Columns", value: "five" },
        ],
      },
    },
    default_value: "three",
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Single-line string field "Grid" (`grid`) in block model "Featured Content Section" (`featured_content_section`)',
  );
  await client.fields.update("ITRWePveRH-BHo7fEAaPcQ", { position: 3 });

  console.log(
    'Update Modular Content (Multiple blocks) field "Features" (`features`) in block model "Featured Content Section" (`featured_content_section`)',
  );
  await client.fields.update("Kt0Pgr58Sgu1JewJIeXLOw", {
    validators: {
      rich_text_blocks: { item_types: ["Mx_27rG_QKaymf0fBxbs6Q"] },
      size: { min: 1, max: 10 },
    },
  });
}
