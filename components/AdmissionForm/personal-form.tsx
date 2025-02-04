import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Text } from "../ui";

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
                  <Input autoFocus={true} {...field} aria-required={true} />
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
