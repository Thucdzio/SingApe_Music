import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '@/components/ui/card';
import { Button, ButtonIcon } from '@/components/ui/button';
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from './ui/modal';
import { Heading } from 'lucide-react-native';
import { CloseIcon, Icon } from './ui/icon';

interface ThemeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

export const ThemeModal = ({isOpen, onClose}: ThemeModalProps) => {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="bg-background-200 rounded-lg shadow-lg"
        >
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <Heading className="text-primary-500">
                        Chọn chủ đề
                    </Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} className="text-primary-500" />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <Card className="flex-row items-center justify-between p-4 mb-2 bg-background-200">
                        <Text className="text-base text-primary-500">Chủ đề sáng</Text>
                        <ButtonIcon as={Heading} className="text-primary-500" />
                    </Card>
                    <Card className="flex-row items-center justify-between p-4 mb-2 bg-background-200">
                        <Text className="text-base text-primary-500">Chủ đề tối</Text>
                        <ButtonIcon as={Heading} className="text-primary-500" />
                    </Card>
                    <Card className="flex-row items-center justify-between p-4 mb-2 bg-background-200">
                        <Text className="text-base text-primary-500">Chủ đề hệ thống</Text>
                        <ButtonIcon as={Heading} className="text-primary-500" />
                    </Card>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
