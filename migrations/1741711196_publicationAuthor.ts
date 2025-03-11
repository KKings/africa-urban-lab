import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Single link field "Author" (`author`) in model "\uD83E\uDDFE Publication" (`publication`)',
  );
  await client.fields.update("K-I_qM98RoKZiVQPkpr5Ug", {
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["2085697"],
      },
    },
  });
}
