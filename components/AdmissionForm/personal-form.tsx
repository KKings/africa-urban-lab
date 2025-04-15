import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import clsx from "clsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input, labelStyle } from "../ui/input";
import { type PersonalFormValues, personalSchema } from "./schema";
import type { StepperForm } from "./types";
import { StepperButtons } from "./form-stepper-buttons";
import { Separator, Text } from "../ui";
import { Radio, RadioGroupIndicator, RadioGroupItem } from "../ui/radio";
import { MultiSelect } from "../ui/multi-select";

type PersonalFormProps = StepperForm<PersonalFormValues>;

const PersonalForm = ({
  onSubmit,
  className,
  data,
  isFirst,
  isLast,
  title,
  description,
  onPrevious,
}: PersonalFormProps) => {
  const form = useForm({
    defaultValues: data,
    resolver: zodResolver(personalSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid, errors },
  } = form;

  console.log(errors);

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
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  First Name
                </FormLabel>
                <FormControl>
                  <Input {...field} aria-required={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input {...field} aria-required={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input {...field} aria-required={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Date of Birth
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    min="1924-01-01"
                    max="2014-12-31"
                    aria-required={true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Nationality
                </FormLabel>
                <FormControl>
                  <Input {...field} aria-required={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="countryOfResidence"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Country of Residence
                </FormLabel>
                <FormControl>
                  <Input {...field} className="relative" aria-required={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yearlyIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Yearly Income (USD)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    {...form.register("yearlyIncome", { valueAsNumber: true })}
                    aria-required={true}
                    min={0}
                    step={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="!my-6" />
          <FormField
            control={form.control}
            name="applicantFullDiploma"
            defaultValue="yes"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Are you applying for the Full Diploma?
                </FormLabel>
                <Radio
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <RadioGroupItem value="yes" id="yes" labelText="Yes">
                    <RadioGroupIndicator />
                  </RadioGroupItem>

                  <RadioGroupItem value="no" id="no" labelText="No">
                    <RadioGroupIndicator />
                  </RadioGroupItem>
                </Radio>
                <Text size="meta" className="text-muted-foreground" as="p">
                  Full Diploma includes the Capstone Project plus the four
                  courses — Urban Planning, Urban Economics, Urban Governance,
                  and Urban Finance. Further details on the Diploma program are{" "}
                  <Link
                    href={"/professional-diploma-in-urban-development"}
                    className="text-theme-blue"
                  >
                    here
                  </Link>
                  . Scholarships are only available for full Diploma applicants.
                </Text>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("applicantFullDiploma") === "no" && (
            <FormField
              control={form.control}
              name="applicantCourses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    required
                    aria-required={true}
                    className={clsx(labelStyle)}
                  >
                    Which specific courses are you applying for? Select all that apply 
                  </FormLabel>
                  <MultiSelect
                    options={[
                      { label: "Urban Planning", value: "Urban Planning" },
                      { label: "Urban Economics", value: "Urban Economics" },
                      { label: "Urban Governance", value: "Urban Governance" },
                      { label: "Urban Finance", value: "Urban Finance" },
                    ]}
                    maxCount={2}
                    placeholder="Select courses"
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? []}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

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

export { PersonalForm };
