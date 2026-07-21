"use client";
import React from "react";
import ComponentCard from "../../common/ComponentCard";
import Button from "../../ui/button/Button";
import { Modal } from "../../ui/modal";
import { useModal } from "@/hooks/useModal";

export default function VerticallyCenteredModal() {
  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };
  return (
    <ComponentCard title="Vertically Centered Modal">
      <Button size="md" variant="solid" onClick={openModal}>
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        showCloseButton={false}
        size="md"
        className="p-6 lg:p-10"
      >
        <div className="text-center">
          <h4 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            All Done! Success Confirmed
          </h4>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod est quis mauris lacinia pharetra.
          </p>

          <div className="flex items-center justify-center w-full gap-3 mt-8">
            <Button size="md" variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button size="md" variant="solid" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </ComponentCard>
  );
}
