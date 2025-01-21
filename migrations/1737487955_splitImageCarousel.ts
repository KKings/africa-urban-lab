import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Asset gallery field "Image(s)" (`image`) in block model "\uD83E\uDE9F Split Image Text Section" (`split_image_text_section`)',
  );
  await client.fields.update("UtmGYNlIQ22XWEtPbJblSw", {
    field_type: "gallery",
  });
  await client.fields.update("UtmGYNlIQ22XWEtPbJblSw", {
    label: "Image(s)",
    hint: "If selecting multiple images, a carousel will be shown",
    appearance: { addons: [], editor: "gallery", parameters: {} },
  });
}
