import { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { transcribeSpeech } from "@/functions/transcribeSpeech";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { recordSpeech } from "@/functions/recordSpeech";
import { HStack, Spinner, Text, VStack } from "../components/ui";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { trackTitleFilter } from "@/helpers/filter";
import TrackPlayer from "react-native-track-player";
import Library from "../assets/data/library.json";

export default function Voice() {
  const [transcribedSpeech, setTranscribedSpeech] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRecordingRef = useRef(new Audio.Recording());
  const webAudioPermissionsRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    console.log("isPlaying changed:", isPlaying);
  }, [isPlaying]);

  const startRecording = async () => {
    setIsRecording(true);
    await recordSpeech(
      audioRecordingRef,
      setIsRecording,
      !!webAudioPermissionsRef.current
    );
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setIsTranscribing(true);

    try {
      const speechTranscript = await transcribeSpeech(audioRecordingRef);
      setTranscribedSpeech(speechTranscript || "");

      const song = Library.find(trackTitleFilter(speechTranscript));
      console.log("SONG :", song);
      if (song) {
        setIsPlaying(true);
        await TrackPlayer.reset();
        await TrackPlayer.add(song);
        await TrackPlayer.play();

        router.back();
      } else {
        setIsPlaying(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsTranscribing(false);
    }
    console.log("Found ", isPlaying);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-5 py-4">
        <VStack className="flex-1 items-center justify-center gap-20">
          <MaterialIcons
            name="cancel"
            size={40}
            color="black"
            onPress={() => {
              router.back();
            }}
            style={{ position: "absolute", top: 40, left: 20 }}
          />
          <VStack className="w-full h-72  p-5 rounded-md mb-5 justify-start items-start">
            {isTranscribing ? (
              <Spinner size="small" color="black" />
            ) : (
              <Text
                className={`text-lg ${
                  transcribedSpeech ? "text-black" : "text-gray-500"
                }`}
              >
                {transcribedSpeech || "Thử nói gì đó ... "}
              </Text>
            )}
            {isPlaying && transcribedSpeech ? (
              <Text className="text-green-500 mt-5">
                Đang mở bài hát: "{transcribedSpeech}"
              </Text>
            ) : !isPlaying && transcribedSpeech ? (
              <Text className="text-red-500 mt-5">
                Không tìm thấy bài hát với tên: "{transcribedSpeech}"
              </Text>
            ) : null}
          </VStack>

          <TouchableOpacity
            className={`w-[75px] h-[75px] bg-red-600 rounded-full items-center justify-center mt-24 ${
              isRecording || isTranscribing ? "opacity-50" : "opacity-100"
            }`}
            onPressIn={startRecording}
            onPressOut={stopRecording}
            disabled={isRecording || isTranscribing}
          >
            {isRecording ? (
              <Spinner size="small" color="white" />
            ) : (
              <FontAwesome name="microphone" size={40} color="white" />
            )}
          </TouchableOpacity>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
