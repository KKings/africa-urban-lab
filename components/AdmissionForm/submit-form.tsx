import Image from "next/image";
import { useCallback, useState } from "react";
import { Button, Text } from "../ui";
import { StepperButtons } from "./form-stepper-buttons";
import type { FormValues } from "./schema";
import type { StepperForm } from "./types";

import illustration from "@/public/images/admission-checkbox-illustration.png";
import { createDriveLinks } from "./actions/drive-create";
import type { CreateFileRequest } from "@/services/google-drive";
import {
  MIME_TYPE_MAPPINGS,
  type SUPPORTED_DOCUMENTS_TYPES,
} from "./constants";
import { readFileAsBuffer } from "./utils";
import { upload, UploadFileResponse } from "./actions/drive-upload";
import { saveToSheets, SheetValues } from "./actions/sheets-save";
import clsx from "clsx";
import { LoadingIcon } from "../Icons";

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

  return `https://docs.google.com/document/d/${id}/edit`;
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

      setSuccess(appendResult.success || false);
      setPending(false);
      setIdle(true);
    } catch (error) {
      console.error(error);
      setError(true);
    }

    setPending(false);
    setIdle(true);
    setError(false);
  }, []);

  return (
    <div className={clsx(className, "md:max-w-full lg:max-w-[600px]")}>
      <div className="flex flex-col items-center gap-4 rounded-lg shadow-lg p-8">
        {error && !success && (
          <div aria-live="polite">
            <Text size="meta" weight="bold" className="bg-red-400 p-6">
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
