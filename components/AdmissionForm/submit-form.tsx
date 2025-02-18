import Image from "next/image";
import { useCallback, useState } from "react";
import { Button, Text } from "../ui";
import clsx from "clsx";
import { StepperButtons } from "./form-stepper-buttons";
import type { FormValues } from "./schema";
import type { StepperForm } from "./types";

import illustration from "@/public/images/admission-checkbox-illustration.png";
import {
  MIME_TYPE_MAPPINGS,
  type SUPPORTED_DOCUMENTS_TYPES,
} from "./constants";
import { upload, UploadFileResponse } from "./actions/drive-upload";
import { saveToSheets, SheetValues } from "./actions/sheets-save";
import { LoadingIcon } from "../Icons";
import { addContacts } from "./actions/mailchimp-add";
import { sendReferenceEmail } from "./actions/mandrill-send";

type SubmitFormProps = StepperForm<FormValues>;

const toFormData = (
  identifier: string,
  type: string,
  file?: File
): FormData | undefined => {
  if (!file) {
    return;
  }

  const extension = file.name.split(".").pop() ?? "";
  const mimeType = MIME_TYPE_MAPPINGS.get(
    extension
  ) as SUPPORTED_DOCUMENTS_TYPES;
  const name = `${identifier}-${type}.${extension}`;

  const data = new FormData();
  data.append("file", file, file.name);
  data.append("mimeType", mimeType);
  data.append("name", name);

  return data;
};

const toDriveLink = (id?: string): string => {
  if (!id) {
    return "";
  }

  return `https://drive.google.com/file/d/${id}/view`;
};

const uploadPromise = (formData?: FormData): Promise<UploadFileResponse> => {
  if (!formData) {
    return Promise.resolve({ success: true, id: "" });
  }

  return upload(formData);
};

const uploadFiles = async (
  identifier: string,
  resume?: FileList,
  transcriptsBachelor?: FileList,
  transcriptsMasters?: FileList,
  personalStatement?: FileList,
  writingSample?: FileList
) => {
  const uploadResults = await Promise.all([
    uploadPromise(toFormData(identifier, "Resume", (resume as FileList)?.[0])),
    uploadPromise(
      toFormData(
        identifier,
        "Transcript Bachelors",
        (transcriptsBachelor as FileList)[0]
      )
    ),
    uploadPromise(
      toFormData(
        identifier,
        "Transcript Masters",
        (transcriptsMasters as FileList)?.[0]
      )
    ),
    uploadPromise(
      toFormData(
        identifier,
        "Personal Statement",
        (personalStatement as FileList)?.[0]
      )
    ),
    uploadPromise(
      toFormData(identifier, "Writing Sample", (writingSample as FileList)?.[0])
    ),
  ]);

  const resumeLink = toDriveLink(uploadResults[0].id);
  const transcriptsBachelorLink = toDriveLink(uploadResults[1].id);
  const transcriptsMastersLink = toDriveLink(uploadResults[2].id);
  const personalStatementLink = toDriveLink(uploadResults[3].id);
  const writingSampleLink = toDriveLink(uploadResults[4].id);

  return [
    resumeLink,
    transcriptsBachelorLink,
    transcriptsMastersLink,
    personalStatementLink,
    writingSampleLink,
  ];
};

const SubmitForm = ({
  className,
  data,
  isFirst,
  onPrevious,
  title,
  description,
}: SubmitFormProps) => {
  const [pending, setPending] = useState(false);
  const [idle, setIdle] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const {
    resume,
    transcriptsBachelor,
    transcriptsMasters,
    personalStatement,
    writingSample,
    ...formValues
  } = data;

  
  /**
   * Handles the form submission process.
   * 
   * This function performs the following steps:
   * 1. Sets the form state to pending and not idle.
   * 2. Generates an identifier based on the form values.
   * 3. Uploads the provided files and retrieves their links.
   * 4. Constructs the sheet data with the form values and uploaded file links.
   * 5. Saves the sheet data to Google Sheets.
   * 6. Adds the contacts using the sheet data to Mailchimp.
   * 7. Sets the success state based on the result of the sheet data append operation.
   * 8. Handles any errors that occur during the process.
   * 9. Resets the form state to not pending and idle.
   * 
   * @async
   * @function handleOnSubmit
   * @returns {Promise<void>} A promise that resolves when the form submission process is complete.
   */
  const handleOnSubmit = useCallback(async () => {
    setPending(true);
    setIdle(false);
    setError(false);

    const identifier = `${formValues.firstName}-${formValues.lastName}`.replace(
      /[^0-9a-z\-]/gi,
      ""
    );
    try {
      const [
        resumeLink,
        transcriptsBachelorLink,
        transcriptsMastersLink,
        personalStatementLink,
        writingSampleLink,
      ] = await uploadFiles(
        identifier,
        resume,
        transcriptsBachelor,
        transcriptsMasters,
        personalStatement,
        writingSample
      );

      const sheetData = {
        ...formValues,
        resume: resumeLink,
        transcriptsBachelor: transcriptsBachelorLink,
        transcriptsMasters: transcriptsMastersLink,
        personalStatement: personalStatementLink,
        writingSample: writingSampleLink,
      } as SheetValues;

      const appendResult = await saveToSheets(sheetData);

      await addContacts({
        ...sheetData
      });

      await sendReferenceEmail({
        ...sheetData
      });

      setSuccess(appendResult.success || false);
    } catch (error) {
      console.error('Error occurred processing the request.');
      setSuccess(false);
      setError(true);
    }
    finally {
      setPending(false);
      setIdle(true);
    }
  }, [formValues, personalStatement, resume, transcriptsBachelor, transcriptsMasters, writingSample]);

  return (
    <div className={clsx(className, "md:max-w-full lg:max-w-[600px]")}>
      <div className="flex flex-col items-center gap-4 rounded-lg shadow-lg p-8">
        {error && !success && (
          <div aria-live="polite" className="w-full">
            <Text size="meta" weight="bold" className="bg-red-400 p-4">
              An error occurred processing your request. Please try again later.
            </Text>
          </div>
        )}
        <Image
          src={illustration}
          alt="Admission Checkbox Illustration"
          className={clsx({ "-hue-rotate-90": success })}
        />
        <Text as="h2" size="lead" weight="bold">
          {success ? "Your application has been submitted!" : title}
        </Text>
        <Text as="p">
          {success
            ? "A member of our team will review your application."
            : description}
        </Text>

        {!success && (
          <Button
            type="button"
            variant="default"
            disabled={pending}
            className="text-white"
            onClick={handleOnSubmit}
          >
            <Text
              size="meta"
              caps
              className="flex flex-row gap-2 justify-center"
            >
              {pending ? "Submitting" : "Submit"}
              {pending && <LoadingIcon className="text-white" />}
            </Text>
          </Button>
        )}
      </div>

      {idle && !success && (
        <StepperButtons
          isFirst={isFirst}
          isLast={true}
          onPrevious={onPrevious}
          disableNext={true}
          showNext={false}
        />
      )}
    </div>
  );
};

export { SubmitForm };
