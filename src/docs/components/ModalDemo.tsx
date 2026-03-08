import React, { useState } from "react";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";

interface ModalDemoProps {
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
}

export const ModalDemo: React.FC<ModalDemoProps> = ({
  title = "Sample Modal",
  size = "md",
  showCloseButton = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => setIsOpen(true)}>
        Open {size.toUpperCase()} Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        size={size}
        showCloseButton={showCloseButton}
      >
        <div className="space-y-4 py-4">
          <p className="opacity-70 leading-relaxed">
            This is an interactive demonstration of the Modal component. It
            supports smooth transitions, backdrop blur, and theme-aware styling.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-black/5 dark:border-white/5">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm Action</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
