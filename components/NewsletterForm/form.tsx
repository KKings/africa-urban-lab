"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { FormEvent, useCallback, useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { Text, textVariants } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignupAction } from "./signup-action";
import { RequestSchema, type SignupSchema } from "./schema";
import {
  EducationalBackground,
  HowDidYouHearAboutUsOptions,
  ReasonForInterestOptions,
} from "./constants";
import { ReactElement } from "react-markdown/lib/react-markdown";

export type NewsletterFromProps = {
  successMessage?: ReactElement;
};

export function NewsletterForm({ successMessage }: NewsletterFromProps) {
  const [state, formAction] = useFormState(SignupAction, {});

  const form = useForm<SignupSchema>({
    resolver: zodResolver(RequestSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      country: "",
      reasonForInterest: "",
      educationalBackground: "",
      howDidYouHearAboutUs: "",
      ...((!state.success && state?.error?.fields) ?? {}),
    },
  });

  const {
    formState: { isDirty, isValid },
  } = form;

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // state.success = false;
      // delete state.error;

      form.handleSubmit(() => {
        formAction(new FormData(formRef.current!));
      })(event);
    },
    [form, formAction]
  );

  const formRef = useRef<HTMLFormElement>(null);

  // show a confirmation message after submission
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!pending && state.success) {
      form.reset({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        country: "",
        reasonForInterest: "",
        educationalBackground: "",
        howDidYouHearAboutUs: "",
      });
      window.scrollTo({ top: formRef?.current?.clientTop });
    }
  }, [pending, state.success, form]);

  return (
    <>
      {!state.success && state.error && (
        <div aria-live="polite" className="pt-w4 pb-w8">
          <Text size="meta" weight="bold" className="bg-red-400 p-6">
            {state?.error?.detail?.message?.includes("Member Exists")
              ? "This email address has already been subscribed, please try a different email address."
              : state?.error?.detail?.detail ||
                "An error occurred processing your request. Please try again later."}
          </Text>
        </div>
      )}

      {!pending && state?.success && (
        <div className="py-6 space-y-w4 flex flex-col items-center">
          {successMessage || (
            <Text size="large" weight="extra" align="center">
              Thank you for your interest.
              <br />
              <span className="font-medium italic">
                Stay tuned for updates.
              </span>
            </Text>
          )}
        </div>
      )}

      <Form {...form}>
        <form
          className="space-y-w4"
          action={formAction}
          ref={formRef}
          onSubmit={onSubmit}
          key={state.id}
        >
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Phone number
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder=""
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
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Country
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} aria-required={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* There are nuances in using Radix Select with react-hook-form! Take care to check this markup and use fo field on <Select>. The Shadcn working example does not work here, you must also spread field before onValueChange. See Select in React hook form example at: https://ui.shadcn.com/docs/components/select */}
          <FormField
            control={form.control}
            name="reasonForInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel 
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Reason for interest
                </FormLabel>
                <Select
                  value={field.value}
                  name={field.name}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select a Reason"
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ReasonForInterestOptions.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="educationalBackground"
            render={({ field }) => (
              <FormItem>
                <FormLabel 
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  Highest Educational background
                </FormLabel>
                <Select
                  value={field.value}
                  name={field.name}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select an option"
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {EducationalBackground.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="howDidYouHearAboutUs"
            render={({ field }) => (
              <FormItem>
                <FormLabel 
                  required
                  aria-required={true}
                  className={clsx(labelStyle)}
                >
                  How did you hear about us?
                </FormLabel>
                <Select
                  value={field.value}
                  name={field.name}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select a Channel"
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {HowDidYouHearAboutUsOptions.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-w4 space-y-w4">
            <div className="flex justify-end">
              <SubmitButton disabled={!isDirty || !isValid} />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}

const labelStyle = [textVariants({ size: "meta", caps: true }), "text-meta"];

const SubmitButton = ({ disabled }: { disabled?: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="ghost"
      disabled={pending || disabled}
      className="border border-current"
    >
      <Text size="meta" caps>
        {pending ? "Submitting…" : "Submit"}
      </Text>
    </Button>
  );
};
