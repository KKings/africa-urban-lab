import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (client: Client) {
  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single asset field "Image" (`image`) in block model "\uD83D\uDCF0 Featured Content" (`featured_content`)',
  );
  await client.fields.create("Mx_27rG_QKaymf0fBxbs6Q", {
    id: "eH4gmJifR_Gf0b3IdCi37g",
    label: "Image",
    field_type: "file",
    api_key: "image",
    validators: {
      extension: { extensions: [], predefined_list: "transformable_image" },
    },
    appearance: { addons: [], editor: "file", parameters: {} },
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Single asset field "Image" (`image`) in block model "\uD83D\uDCF0 Featured Content" (`featured_content`)',
  );
  await client.fields.update("eH4gmJifR_Gf0b3IdCi37g", { position: 1 });

  console.log("Finalize models/block models");

  console.log(
    'Update block model "\uD83D\uDCF0 Featured Content" (`featured_content`)',
  );
}
