// components/AlertModalProvider.tsx
import { ErrorModal } from "@/components/modals/ErrorModal";
import { NormalModal } from "@/components/modals/NormalModal";
import { Button, Icon, Modal, Text } from "@/components/ui";
import { ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CloseIcon } from "@/components/ui/icon";
import {
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import React, { createContext, useContext, useState } from "react";

interface AlertModalContextType {
  show: (
    title: string,
    message: string, 
    type: "error" | "normal",
    confirmText?: string,
    cancelText?: string,
    onConfirm?: () => void
  ) => void;
  hide: () => void;
}

const AlertModalContext = createContext<AlertModalContextType | undefined>(
  undefined
);

export const useAlertModal = () => {
  const context = useContext(AlertModalContext);
  if (!context)
    throw new Error("useAlertModal must be used within AlertModalProvider");
  return context;
};

export const AlertModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [confirmText, setConfirmText] = useState("OK");
  const [cancelText, setCancelText] = useState("Cancel");
  const [type, setType] = useState<"error" | "normal">("normal");
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>();

  const show = (
    title: string,
    message: string,
    type: "error" | "normal" = "normal",
    confirmText: string = "OK",
    cancelText: string = "Cancel",
    onConfirm?: () => void
  ) => {
    setTitle(title);
    setMessage(message);
    setConfirmText(confirmText);
    setCancelText(cancelText);
    setType(type);
    setOnConfirm(() => onConfirm);
    setVisible(true);
  };

  const hide = () => setVisible(false);

  const handleConfirm = () => {
    hide();
    onConfirm?.();
  };

  const renderModal = () => {
    switch (type) {
      case "error":
        return (
          <ErrorModal
            visible={visible}
            title={title}
            message={message}
            confirmText={confirmText}
            cancelText={cancelText}
            onConfirm={handleConfirm}
            onClose={hide}
          />
        );
      case "normal":
        return (
          <NormalModal
            visible={visible}
            title={title}
            message={message}
            confirmText={confirmText}
            cancelText={cancelText}
            onConfirm={handleConfirm}
            onCancel={hide}
            onClose={hide}
          />
        );
      default:
        return null;
    }
  }

  return (
    <AlertModalContext.Provider value={{ show, hide }}>
      {children}
      {renderModal()}
    </AlertModalContext.Provider>
  );
};
