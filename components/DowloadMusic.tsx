import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Alert, Platform } from "react-native";

export const downloadSong = async (url: string, fileName: string) => {
  try {
    if (!url.startsWith("https://")) {
      Alert.alert("Lỗi", "URL không hợp lệ");
      return;
    }

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Lỗi", "Bạn cần cấp quyền để lưu tệp");
      return;
    }

    const fileUri = FileSystem.documentDirectory + fileName + ".mp3";

    // Tải file về bộ nhớ app trước
    const downloadedFile = await FileSystem.downloadAsync(url, fileUri);

    if (!downloadedFile?.uri) {
      Alert.alert("Lỗi", "Không thể tải file");
      return;
    }

    // Lưu vào thư viện phương tiện của máy
    const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);

    if (Platform.OS === "android") {
      // Lưu vào thư mục Download
      const album = await MediaLibrary.getAlbumAsync("Download");
      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      } else {
        const newAlbum = await MediaLibrary.createAlbumAsync(
          "Download",
          asset,
          false
        );
      }
    }

    Alert.alert("Thành công", "Đã lưu bài hát vào thư mục Download");
  } catch (error) {
    console.error("Download error:", error);
    Alert.alert("Lỗi", "Không thể tải bài hát");
  }
};
