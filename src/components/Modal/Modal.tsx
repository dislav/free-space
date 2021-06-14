import React from 'react';
import {
  Modal as ChakraModal,
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

interface IModal extends ModalProps {
  title: string;
  onSuccess?: () => void;
  successText?: string;
  isLoading?: boolean;
}

const Modal: React.FC<IModal> = ({
  title,
  children,
  onClose,
  onSuccess,
  successText,
  isLoading,
  ...props
}) => {
  return (
    <ChakraModal {...props} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button mr={'16px'} onClick={onClose}>
            Отмена
          </Button>
          {successText && (
            <Button
              colorScheme={'red'}
              onClick={onSuccess}
              isLoading={isLoading}
            >
              {successText}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
