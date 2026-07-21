"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@/components/overlay/modal/Modal";
import { Button } from "@/components/ui/button/Button";

export default function ModalPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Modal</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Modal dialog component for overlaying content
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Modal Examples</h3>
        </CardHeader>
        <CardContent className="pt-6">
          <Modal open={modalOpen} onOpenChange={setModalOpen}>
            <ModalTrigger asChild>
              <Button>Open Modal</Button>
            </ModalTrigger>
            <ModalContent>
              <ModalHeader title="Modal Title">
                <p className="text-sm text-gray-500">This is a modal dialog</p>
              </ModalHeader>
              <ModalBody>
                <p className="text-gray-600 dark:text-gray-400">
                  This is the modal content. You can put any React component or content here.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button variant="solid" onClick={() => setModalOpen(false)}>Confirm</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </CardContent>
      </Card>
    </div>
  );
}
