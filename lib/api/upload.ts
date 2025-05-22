import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import { supabase } from "../supabase";

const uploadMusic = async () => {
  try {
    // 1. Người dùng chọn file nhạc
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.audio],
    });

    const file = result[0];

    // 2. Lấy thông tin user hiện tại
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
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return;
    }

    console.log("Upload success:", uploadData);

    // 5. Lấy public URL
    const { data: publicUrlData } = supabase.storage
      .from("usermusic")
      .getPublicUrl(filePathInBucket);

    const publicUrl = publicUrlData?.publicUrl;

    if (!publicUrl) {
      console.error("Failed to get public URL");
      return;
    }

    // 6. Lưu metadata vào bảng 'songs'
    const { error: insertError } = await supabase.from("upload_songs").insert([
      {
        user_id: userId,
        title: file.name,
        url: publicUrl,
        upload_at: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      console.error("Insert song error:", insertError);
    } else {
      console.log("Song metadata saved successfully.");
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
