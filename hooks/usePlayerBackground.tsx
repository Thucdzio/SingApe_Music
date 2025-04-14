import { useEffect, useState } from "react";
import { Image, Platform } from "react-native";
import { getColors, ImageColorsResult } from "react-native-image-colors";
import { colors as appColors } from "@/constants/tokens";

export const usePlayerBackground = (image: string | number) => {
  const [imageColors, setImageColors] = useState({
    background: appColors.background,
    primary: appColors.background,
  });

  useEffect(() => {
    let uri: string | undefined;

    if (typeof image === "string") {
      uri = image;
    } else {
      const resolved = Image.resolveAssetSource(image);
      uri = resolved?.uri;
    }

    if (!uri) {
      console.warn("⚠️ Không lấy được URI từ ảnh:", image);
      return;
    }

    const fetchColors = async () => {
      try {
        const result: ImageColorsResult = await getColors(uri!, {
          fallback: appColors.background,
          cache: true,
          key: uri,
        });

        if (result.platform === "android") {
          setImageColors({
            background: result.dominant ?? appColors.background,
            primary: result.average ?? appColors.background,
          });
        }
      } catch (err) {
        console.warn(" Lỗi khi lấy màu ảnh:", err);
      }
    };

    fetchColors();
  }, [image]);

  return { imageColors };
};
