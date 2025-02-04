"use client";

import React, { useEffect } from "react";
import { z } from "zod";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { useFormState } from "react-dom";
import { defineStepper } from "@stepperize/react";
import { Text, Separator } from "@/components/ui";
import { saveToSheets } from "./actions/sheets-save";
import { ReactElement } from "react-markdown/lib/react-markdown";
import {
  type FormValues,
  personalSchema,
  documentsSchema,
  experienceSchema,
  referralSchema,
} from "./schema";
import { DocumentsForm } from "./documents-form";
import { SubmitForm } from "./submit-form";
import { PersonalForm } from "./personal-form";
import { ExperienceForm } from "./experience-form";
import { ReferralForm } from "./referral-form";
import { StepperContent } from "./types";

export type AdmissionFormProps = {
  personalInfoTitle?: string | null;
  personalInfoDescription?: string | null;
  referralTitle?: string | null;
  referralDescription?: string | null;
  experienceTitle?: string | null;
  experienceDescription?: string | null;
  documentsTitle?: string | null;
  documentsDescription?: string | null;
  submitTitle?: string | null;
  submitDescription?: string | null;
};

const { useStepper, steps, utils } = defineStepper(
  {
    id: "peronsal",
    label: "Personal Info",
    schema: personalSchema,
    component: PersonalForm,
  },
  {
    id: "experience",
    label: "Experience",
    schema: experienceSchema,
    component: ExperienceForm,
  },
  {
    id: "referral",
    label: "Referral",
    schema: referralSchema,
    component: ReferralForm,
  },
  {
    id: "documents",
    label: "Documents",
    schema: documentsSchema,
    component: DocumentsForm,
  },
  {
    id: "submit",
    label: "Submit",
    schema: z.object({}),
    component: SubmitForm,
  }
);

export function AdmissionForm({ 
  personalInfoTitle,
  personalInfoDescription,
  referralTitle,
  referralDescription,
  experienceTitle,
  experienceDescription,
  documentsTitle,
  documentsDescription,
  submitTitle,
  submitDescription,
 }: AdmissionFormProps) {
  const stepper = useStepper();
  const [formData, setFormData] = useState<Partial<FormValues>>({});

  const content: StepperContent[] = [
    { title: personalInfoTitle, description: personalInfoDescription },
    { title: experienceTitle, description: experienceDescription },
    { title: referralTitle, description: referralDescription },
    { title: documentsTitle, description: documentsDescription },
    { title: submitTitle, description: submitDescription },
  ];

  const handleStepSubmit = useCallback(
    async (stepData: z.infer<typeof stepper.current.schema>) => {
      console.log("stepData", stepData);
      console.log("formData", formData);

      setFormData({
        ...formData,
        ...stepData,
      });
      stepper.next();
    },
    [stepper, setFormData]
  );

  const handleFinalSubmit = useCallback(
    async (_: z.infer<typeof stepper.current.schema>) => {
      setFormData({});
    },
    [setFormData]
  );

  const currentIndex = utils.getIndex(stepper.current.id);
  const CurrentStepComponent = stepper.current.component;

  return (
    <div className="space-y-w12">
      <nav
        aria-label="Admission Submission Steps"
        className="group my-4 flex justify-center w-full sm:w-auto"
      >
        <ol
          className="flex items-center justify-between gap-2 w-full sm:w-auto"
          aria-orientation="horizontal"
        >
          {stepper.all.map((step, index, array) => (
            <React.Fragment key={step.id}>
              <li className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <span
                  role="tab"
                  aria-current={
                    stepper.current.id === step.id ? "step" : undefined
                  }
                  aria-posinset={index + 1}
                  aria-setsize={steps.length}
                  aria-selected={stepper.current.id === step.id}
                  className={clsx(
                    { "bg-theme-grey text-white": index < currentIndex },
                    { "bg-white border-2 text-": index > currentIndex },
                    { "bg-theme-blue text-white": index === currentIndex },
                    "flex size-10 items-center justify-center rounded-full"
                  )}
                >
                  {index + 1}
                </span>
                <Text size="meta" weight="bold" className="hidden md:block">
                  {step.label}
                </Text>
              </li>
              {index < array.length - 1 && (
                <Separator
                  className={clsx(
                    "flex-1 min-w-2 md:min-w-4",
                    { "bg-theme-grey": index < currentIndex },
                    { "bg-theme-grey/70": index >= currentIndex }
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
      <div className="flex flew-col justify-center w-full">
        <CurrentStepComponent
          onSubmit={stepper.isLast ? handleFinalSubmit : handleStepSubmit}
          data={formData}
          className="space-y-4 w-full lg:max-w-[600px]"
          isFirst={stepper.isFirst}
          isLast={stepper.isLast}
          onPrevious={stepper.prev}
          title={content[currentIndex]?.title}
          description={content[currentIndex]?.description}
        />
      </div>
    </div>
  );
}
