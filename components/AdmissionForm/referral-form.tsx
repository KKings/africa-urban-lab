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
} from "@/components/ui/form";
import { Input, labelStyle, Text } from "@/components/ui";
import { type ReferralFormValues, referralSchema } from "./schema";
import { type StepperForm } from "./types";
import { StepperButtons } from "./form-stepper-buttons";

type ReferralFormProps = StepperForm<ReferralFormValues>;

const ReferralForm = ({
  onSubmit,
  className,
  data,
  isFirst,
  isLast,
  onPrevious,
  title,
  description,
}: ReferralFormProps) => {
  const form = useForm({
    defaultValues: data,
    resolver: zodResolver(referralSchema),
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
            name="referralName"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Name of Referral
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
            name="referralTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Title of Referral
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
            name="referralEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Email of Referral
                </FormLabel>
                <FormControl>
                  <Input type="email" {...field} aria-required={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="referralOccupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Occupation of Referral
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
            name="referralCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Company/Institute where referee currently works
                </FormLabel>
                <FormControl>
                  <Input {...field} aria-required={true} />
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

export { ReferralForm };
