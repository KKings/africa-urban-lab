import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

import { FileInput, labelStyle } from "../ui/input";
import { type DocumentsFormValues, documentsSchema } from "./schema";
import { SUPPORTED_DOCUMENTS } from "./constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { type StepperForm } from "./types";
import { StepperButtons } from "./form-stepper-buttons";
import { Text } from "../ui";

type DocumentsFormProps = StepperForm<DocumentsFormValues>;

const DocumentsForm = ({
  onSubmit,
  className,
  data,
  isFirst,
  isLast,
  onPrevious,
  title,
  description,
}: DocumentsFormProps) => {
  const [fileState, setFileState] = useState(data);
  const form = useForm({
    defaultValues: fileState,
    resolver: zodResolver(documentsSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    resetField,
    formState: { isValid },
  } = form;

  return (
    <Form {...form}>
      <div className={clsx(className)}>
        {title && (
          <Text as="h2" size="lead">
            {title}
          </Text>
        )}
        {description && (
          <Text as="p" size="default">
            {description}
          </Text>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Resume/CV
                </FormLabel>
                <FormControl>
                  <FileInput
                    defaultValue={fileState?.resume?.[0]?.name}
                    multiple={false}
                    autoFocus={true}
                    accept={SUPPORTED_DOCUMENTS.join(",")}
                    onOpen={() => {
                      resetField("resume", { defaultValue: null });
                      setFileState({
                        ...fileState,
                        resume: undefined,
                      });
                    }}
                    onChange={(event) => {
                      field.onChange(event?.target?.files);
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    aria-required={true}
                  ></FileInput>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="transcriptsBachelor"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  University Transcript (Bachelors)
                </FormLabel>
                <FormControl>
                  <FileInput
                    defaultValue={fileState?.transcriptsBachelor?.[0]?.name}
                    multiple={false}
                    accept={SUPPORTED_DOCUMENTS.join(",")}
                    onOpen={() => {
                      resetField("transcriptsBachelor", { defaultValue: null });
                      setFileState({
                        ...fileState,
                        transcriptsBachelor: undefined,
                      });
                    }}
                    onChange={(event) => {
                      field.onChange(event?.target?.files);
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    aria-required={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="transcriptsMasters"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={clsx(labelStyle)}>
                  University Transcript (Masters)
                </FormLabel>
                <FormControl>
                  <FileInput
                    defaultValue={fileState?.transcriptsMasters?.[0]?.name}
                    multiple={false}
                    accept={SUPPORTED_DOCUMENTS.join(",")}
                    onOpen={() => {
                      resetField("transcriptsMasters", { defaultValue: null });
                      setFileState({
                        ...fileState,
                        transcriptsMasters: undefined,
                      });
                    }}
                    onChange={(event) => {
                      field.onChange(event?.target?.files);
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="personalStatement"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Personal Statement
                </FormLabel>
                <FormControl>
                  <FileInput
                    defaultValue={fileState?.personalStatement?.[0]?.name}
                    multiple={false}
                    accept={SUPPORTED_DOCUMENTS.join(",")}
                    onOpen={() => {
                      resetField("personalStatement", { defaultValue: null });
                      setFileState({
                        ...fileState,
                        personalStatement: undefined,
                      });
                    }}
                    onChange={(event) => {
                      field.onChange(event?.target?.files);
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    aria-required={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="writingSample"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Writing or Work Sample
                </FormLabel>
                <FormControl>
                  <FileInput
                    defaultValue={fileState?.writingSample?.[0]?.name}
                    multiple={false}
                    accept={SUPPORTED_DOCUMENTS.join(",")}
                    onOpen={() => {
                      resetField("writingSample", { defaultValue: null });
                      setFileState({
                        ...fileState,
                        writingSample: undefined,
                      });
                    }}
                    onChange={(event) => {
                      field.onChange(event?.target?.files);
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    aria-required={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <StepperButtons
            isFirst={isFirst}
            isLast={isLast}
            onPrevious={onPrevious}
            disableNext={!isValid}
          />
        </form>
      </div>
    </Form>
  );
};

export { DocumentsForm };
