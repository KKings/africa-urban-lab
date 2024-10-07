"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthenticationModal from "@/components/Header/AuthenticationModal";
import SuccessPopUp from "@/components/Header/SuccessPopUp";
import type { GlobalPageProps } from "@/utils/globalPageProps";

type Props = {
  globalPageProps: GlobalPageProps;
  isDraft: boolean;
};

export default function DraftModeToggler({ isDraft }: Props) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  async function toggleDraft() {
    if (isDraft) {
      const response = await fetch("/api/draft/disable");

      if (!response.ok) {
        console.error('An error occurred disabling draft mode.')
      }
      document.location.reload();
    } else setModalOpen(true);
  }

  const triggerSuccessToast = () => {
    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
    }, 5000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-8 right-8 z-[99]"
      >
        <AnimatePresence>
          {successToast && (
            <motion.div
              className="absolute bottom-0 right-0 z-50 w-[500px]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.15 }}
            >
              <SuccessPopUp setSuccessToast={setSuccessToast} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              className="absolute bottom-0 right-0 z-50 w-[400px]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.15 }}
            >
              <AuthenticationModal
                setModalOpen={setModalOpen}
                refresh={router.refresh}
                triggerSuccessToast={triggerSuccessToast}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div
          onClick={toggleDraft}
          className="flex cursor-pointer items-center justify-center rounded-md bg-theme-turquoise p-4 font-bold text-white shadow-md transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
        >
          {isDraft ? "Exit Draft Mode" : "Enter Draft Mode"}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
