import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import { supabase } from "../supabase";
import { UploadSong } from "./upload_songs.api";

// Define types for callbacks
type UploadCallbacks = {
  onStart?: () => void;
  onSuccess?: (song: UploadSong) => void;
  onError?: (error: any) => void;
};

const uploadMusic = async (callbacks?: UploadCallbacks) => {
  try {
    // Notify upload is starting
    callbacks?.onStart?.();

    // 1. Người dùng chọn file nhạc
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.audio],
    });

    const file = result[0];

    // Ensure filename is available
    if (!file.name) {
      const error = new Error("File name is missing");
      callbacks?.onError?.(error);
      throw error;
    }

    // 2. Lấy thông tin user hiện tại
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      const error = new Error("User not authenticated");
      callbacks?.onError?.(error);
      throw error;
    }

    const userId = user.id;
    const fileExt = file.name.split(".").pop() || "mp3";
    const fileName = `${Date.now()}.${fileExt}`;
    const filePathInBucket = `${userId}/${fileName}`;

    // 3. Đọc file thành base64 rồi chuyển thành Uint8Array
    const base64String = await RNFS.readFile(file.uri, "base64");
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // 4. Upload lên Supabase Storage bucket 'usermusic'
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("usermusic")
      .upload(filePathInBucket, byteArray, {
        contentType: file.type || "audio/mpeg",
        upsert: true,
      });

    if (uploadError) {
      callbacks?.onError?.(uploadError);
      throw uploadError;
    }

    console.log("Upload success:", uploadData);

    // 5. Lấy public URL
    const { data: publicUrlData } = supabase.storage
      .from("usermusic")
      .getPublicUrl(filePathInBucket);

    const publicUrl = publicUrlData?.publicUrl;

    if (!publicUrl) {
      const error = new Error("Failed to get public URL");
      callbacks?.onError?.(error);
      throw error;
    }

    // 6. Lưu metadata vào bảng 'songs'
    const songData = {
      user_id: userId,
      title: file.name,
      url: publicUrl,
      upload_at: new Date().toISOString(),
    };

    const { data: insertData, error: insertError } = await supabase
      .from("upload_songs")
      .insert([songData])
      .select("*")
      .single();

    if (insertError) {
      callbacks?.onError?.(insertError);
      throw insertError;
    } else {
      console.log("Song metadata saved successfully:", insertData);
      // Notify success with the complete song data
      callbacks?.onSuccess?.(insertData as UploadSong);
    }
    return insertData as UploadSong;
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log("User cancelled picker");
    } else {
      console.error("Upload failed:", err);
      callbacks?.onError?.(err);
    }
    return null;
  }
};

export default uploadMusic;
