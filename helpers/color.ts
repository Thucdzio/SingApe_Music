import { useColorScheme } from "nativewind";
import colors from "tailwindcss/colors";

export default function getGradient(id: string) {
  const {colorScheme} = useColorScheme();
  

  const gradients: [string, string, ...string[]][] = [
    [colors.amber[700], colors.amber[800], colors.amber[800], colors.black],
    [colors.blue[700], colors.blue[800], colors.blue[800], colors.black],
    [colors.gray[700], colors.gray[800], colors.gray[800], colors.black],
    [colors.yellow[700], colors.yellow[800], colors.yellow[800], colors.black],
  ];
  const gradientsWhite: [string, string, ...string[]][] = [
    [colors.amber[500], colors.amber[400], colors.amber[200], colors.white],
    [colors.blue[500], colors.blue[400], colors.blue[200], colors.white],
    [colors.gray[500], colors.gray[400], colors.gray[200], colors.white],
    [colors.yellow[500], colors.yellow[400], colors.yellow[200], colors.white],
  ];

  
  const index = hashStringToIndex(id, gradients.length);
  return colorScheme === "dark" ? gradients[index] : gradientsWhite[index];
}


function hashStringToIndex(str: string, prefixArrayLength: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0; // unsigned right shift to keep it positive
  }
  return hash % prefixArrayLength;
}