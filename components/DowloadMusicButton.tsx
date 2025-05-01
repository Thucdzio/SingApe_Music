import React, { useState } from "react";
import {
  View,
  Button,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import RNFS from "react-native-fs";
import Feather from "@expo/vector-icons/Feather";
interface MusicDownloaderProps {
  url: string;
  fileName: string;
}
const DownloadButton: React.FC<MusicDownloaderProps> = ({ url, fileName }) => {
  const [downloading, setDownloading] = useState(false);

  const checkPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Permission to save music",
          message: "App cần quyền để lưu file nhạc vào máy của bạn.",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const downloadFile = async () => {
    const hasPermission = await checkPermission();
    if (!hasPermission) {
      Alert.alert(
        "Không có quyền",
        "Không thể lưu file vì không có quyền truy cập bộ nhớ."
      );
      return;
    }

    setDownloading(true);
    const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;

    RNFS.downloadFile({ fromUrl: url, toFile: path })
      .promise.then((res) => {
        if (res.statusCode === 200) {
          Alert.alert("Thành công", `Tải xong file: ${fileName}`);
        } else {
          Alert.alert("Thất bại", "Tải file thất bại.");
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Lỗi", "Có lỗi khi tải file.");
      })
      .finally(() => setDownloading(false));
  };

  return (
    <View>
      <Feather name="download" size={30} color="white" onPress={downloadFile} />
    </View>
  );
};

export default DownloadButton;
