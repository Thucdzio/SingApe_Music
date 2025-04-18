import React, { useState } from "react";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Input,
  Modal,
  Text,
} from "@/components/ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import {
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
} from "./ui/actionsheet";
import {
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "./ui/modal";
import { InputField } from "./ui/input";
import { useToast } from "./ui/toast";
import { Track } from "react-native-track-player";
import { ButtonText } from "./ui/button";

type Playlist = {
  id: string;
  name: string;
  songs: Track[];
};

type Props = {
  // currentSong: Track;
  // playlists: Playlist[];
  // onAddToPlaylist: (playlistId: string, song: Track) => void;
  // onCreatePlaylist: (name: string, initialSong: Track) => void;
};

export const AddToPlaylist: React.FC<Props> = ({}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const toast = useToast();

  // const handleAdd = (playlistId: string) => {
  //   onAddToPlaylist(playlistId, currentSong);
  //   setIsSheetOpen(false);

  //   toast.show({
  //     placement: "top",
  //     render: () => (
  //       <Box>
  //         <Text>Đã thêm vào playlist</Text>
  //       </Box>
  //     ),
  //   });
  // };

  // const handleCreate = () => {
  //   if (newPlaylistName.trim() === "") {
  //     toast.show({
  //       placement: "top",
  //       render: () => (
  //         <Box>
  //           <Text>Tên playlist không được để trống</Text>
  //         </Box>
  //       ),
  //     });
  //     return;
  //   }

  //   onCreatePlaylist(newPlaylistName.trim(), currentSong);
  //   setIsModalOpen(false);
  //   setIsSheetOpen(false);
  //   setNewPlaylistName("");

  //   toast.show({
  //     placement: "top",
  //     render: () => (
  //       <Box>
  //         <Text>Đã tạo playlist mới</Text>
  //       </Box>
  //     ),
  //   });
  // };

  return (
    <View>
      <HStack space="md" className="px-4 pt-6 justify-between items-center">
        <MaterialCommunityIcons
          name="music-note-plus"
          size={30}
          color="white"
        />
        <MaterialCommunityIcons
          name="download-circle-outline"
          size={30}
          color="white"
        />
        <MaterialCommunityIcons name="playlist-music" size={30} color="white" />
      </HStack>
      <Actionsheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetItem
            onPress={() => setIsModalOpen(true)}
          ></ActionsheetItem>

          {/* {playlists.length === 0 ? (
            <Text className="text-center text-gray-500 mt-2">
              Chưa có playlist nào
            </Text>
          ) : (
            playlists.map((playlist) => (
              <ActionsheetItem
                key={playlist.id}
                // onPress={() => handleAdd(playlist.id)}
              >
                {playlist.name}
              </ActionsheetItem>
            ))
          )} */}
        </ActionsheetContent>
      </Actionsheet>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Text>Tạo Playlist Mới</Text>
          </ModalHeader>
          <ModalBody>
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                placeholder="Nhập tên playlist"
                value={newPlaylistName}
                onChangeText={setNewPlaylistName}
              />
            </Input>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onPress={() => setIsModalOpen(false)}>
              <ButtonText> Hủy</ButtonText>
            </Button>
            <Button className="ml-2">
              <ButtonText>Tạo</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
};
