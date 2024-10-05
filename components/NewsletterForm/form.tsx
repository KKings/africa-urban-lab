"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { FormEvent, useCallback, useRef } from "react";
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

export function NewsletterForm() {
  const [state, formAction] = useFormState(SignupAction, {});

  console.log('fields', {
    ...state?.error?.fields
  })

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
      // spread any prior values that contain errors to show the user
      ...(state?.error?.fields ?? {}),
    },
  });

  const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formAction(new FormData(formRef.current!));
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  // show a confirmation message after submission
  const { pending } = useFormStatus();

  return (
    <>
      {!state.success && state.error && (
        <div aria-live="polite" className="pt-w4 pb-w8">
          <Text size="meta" weight="bold" className="bg-red-400 p-6">
            {state?.error?.detail?.message?.includes("Member Exists")
              ? "This email address has already been subscribed, please try a different email address."
              : (state?.error?.detail?.detail || 'An error occurred processing your request. Please try again later.' )
            }
          </Text>
        </div>
      )}

      {!pending && state?.success && (
        <div className="pt-w4 space-y-w4">
          <Text size="large" weight="extra" align="center">
            Thank you for your interest.
            <br />
            <span className="font-medium italic">Stay tuned for updates.</span>
          </Text>
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
                <FormLabel className={clsx(labelStyle)}>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel className={clsx(labelStyle)}>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel className={clsx(labelStyle)}>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel className={clsx(labelStyle)}>Phone number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="" {...field} />
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
                <FormLabel className={clsx(labelStyle)}>Country</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
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
                <FormLabel className={clsx(labelStyle)}>
                  Reason for interest
                </FormLabel>
                <Select {...field} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Reason" />
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
                <FormLabel className={clsx(labelStyle)}>
                  Highest Educational background
                </FormLabel>
                <Select {...field} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
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
                <FormLabel className={clsx(labelStyle)}>
                  How did you hear about us?
                </FormLabel>
                <Select {...field} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Channel" />
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
              <SubmitButton disabled={pending} />
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
