import { Box, HStack, Text, VStack, Image } from "@/components/ui";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import colors from "tailwindcss/colors";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";

const Setting = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  return (
    <VStack className="flex-1 bg-gray-50 p-6 rounded-lg shadow-lg space-y-6">
      {/* Title */}
      <Text className="text-3xl font-bold text-gray-800">Cài đặt</Text>

      {/* Dark Mode Switch */}
      <VStack className="flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <Text className="text-lg font-medium text-gray-700">Chế độ tối</Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode((prev) => !prev)}
        />
      </VStack>

      {/* Notification Switch */}
      <VStack className="flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <Text className="text-lg font-medium text-gray-700">Thông báo</Text>
        <Switch
          value={isNotificationEnabled}
          onValueChange={() => setIsNotificationEnabled((prev) => !prev)}
        />
      </VStack>

      {/* Language Select */}
      <VStack className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <Text className="text-lg font-medium text-gray-700 mb-3">Ngôn ngữ</Text>
        <Select>
          <SelectTrigger
            variant="outline"
            size="md"
            className="border-gray-300 hover:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg"
          >
            <SelectInput placeholder="English" className="text-gray-600" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent className="border border-gray-300 rounded-lg shadow-lg mt-1">
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem
                value="vi"
                className="text-gray-700 hover:bg-gray-100"
                label="Tiếng Việt"
              >
                Tiếng Việt
              </SelectItem>
              <SelectItem
                value="en"
                className="text-gray-700 hover:bg-gray-100"
                label="English"
              >
                English
              </SelectItem>
            </SelectContent>
          </SelectPortal>
        </Select>
      </VStack>
    </VStack>
  );
};

export default Setting;
