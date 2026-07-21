"use client";
import React from "react";
import ComponentCard from "../../common/ComponentCard";

import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import { useModal } from "@/hooks/useModal";

export default function DefaultModal() {
  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };
  return (
    <div>
      <ComponentCard title="Default Modal">
        <Button size="md" variant="solid" onClick={openModal}>
          Open Modal
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          size="md"
          className="p-6 lg:p-10"
        >
          <h4 className="font-bold text-gray-900 mb-6 text-xl dark:text-white">
            Modal Heading
          </h4>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod est quis mauris lacinia pharetra. Sed a ligula
            ac odio condimentum aliquet a nec nulla. Aliquam bibendum ex sit
            amet ipsum rutrum feugiat ultrices enim quam.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod est quis mauris lacinia pharetra. Sed a ligula
            ac odio.
          </p>
          <div className="flex items-center justify-end w-full gap-3 mt-8">
            <Button size="md" variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button size="md" variant="solid" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </Modal>
      </ComponentCard>
    </div>
  );
}
