import { Button, Icon, Modal, Text } from "../ui";
import { ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { CloseIcon } from "../ui/icon";
import { ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "../ui/modal";

interface NormalModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

export const NormalModal = ({
  visible,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  onClose,
}: NormalModalProps & {}) => {
  return (
    <Modal
      isOpen={visible}
      onClose={() => {
        onClose();
      }}
      size="md"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            {title}
          </Heading>
          <ModalCloseButton>
            <Icon
              as={CloseIcon}
              size="md"
              className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
            />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text size="sm" className="text-typography-500">
            {message}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            action="secondary"
            onPress={() => { 
              onCancel();
            }}
          >
            <ButtonText>{cancelText}</ButtonText>
          </Button>
          <Button
            onPress={() => {
              onConfirm();
            }}
          >
            <ButtonText>{confirmText}</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
