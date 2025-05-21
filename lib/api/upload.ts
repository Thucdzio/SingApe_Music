import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import { supabase } from "../supabase";

const uploadMusic = async () => {
  try {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.audio],
    });

    const file = result[0];

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not authenticated");
      return;
    }

    const userId = user.id;
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePathInBucket = `${userId}/${fileName}`;

    // Read file as base64
    const base64String = await RNFS.readFile(file.uri, "base64");

    // Convert base64 to Uint8Array
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from("usermusic")
      .upload(filePathInBucket, byteArray, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error("Upload error:", error);
    } else {
      console.log("Upload success:", data);
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log("User cancelled picker");
    } else {
      console.error("Upload failed:", err);
    }
  }
};

export default uploadMusic;
