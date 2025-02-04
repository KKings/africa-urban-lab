import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input, TextArea, labelStyle } from "../ui/input";
import clsx from "clsx";
import { type ExperienceFormValues, experienceSchema } from "./schema";
import type { StepperForm } from "./types";
import { StepperButtons } from "./form-stepper-buttons";
import { Text } from "../ui";

type ExperienceFormProps = StepperForm<ExperienceFormValues>;

const ExperienceForm = ({
  onSubmit,
  className,
  data,
  isFirst,
  isLast,
  onPrevious,
  title,
  description,
}: ExperienceFormProps) => {
  const form = useForm({
    defaultValues: data,
    resolver: zodResolver(experienceSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
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
            name="totalYearsOfRelevantExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Total Years of Relevant Work Experience
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    autoFocus={true}
                    {...field}
                    {...form.register("totalYearsOfRelevantExperience", {
                      valueAsNumber: true,
                    })}
                    aria-required={true}
                    min={0}
                    max={100}
                    step={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentJob"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Current Job Title, Employer, and Sector
                </FormLabel>
                <FormControl>
                  <TextArea {...field} rows={2} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobResponsibilities"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  List Your Responsibilities at Your Current Job
                </FormLabel>
                <FormControl>
                  <TextArea {...field} rows={6} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={clsx(labelStyle)}>
                  Please Share any Additional Professional Experience You Would
                  Like us to Consider
                </FormLabel>
                <FormControl>
                  <TextArea {...field} rows={6} />
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

export { ExperienceForm };
