import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export async function downloadMusic(url: string, filename: string) {
  const localUri = FileSystem.documentDirectory + filename;
  const { uri, status } = await FileSystem.downloadAsync(url, localUri);
  if (status !== 200) {
    throw new Error(`Download failed: ${status}`);
  }
  return uri;
}

export function downloadWithProgress(
  url: string,
  filename: string,
  onProgress: (progress: number) => void
) {
  const localUri = FileSystem.documentDirectory + filename;
  const callback = ({ totalBytesWritten, totalBytesExpectedToWrite }: { totalBytesWritten: number; totalBytesExpectedToWrite: number }) => {
    onProgress(totalBytesWritten / totalBytesExpectedToWrite);
  };
  const resumable = FileSystem.createDownloadResumable(
    url,
    localUri,
    {},
    callback
  );
  return resumable.downloadAsync().then((result) => {
      if (!result) {
        throw new Error('Download result is undefined');
      }
      console.log('Finished downloading to', result.uri);
      return result.uri;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });;
}

export async function saveToLibrary(uri: string, albumName = 'MyMusic') {
  const asset = await MediaLibrary.createAssetAsync(uri);
  await MediaLibrary.createAlbumAsync(albumName, asset, false);
  return asset;
}
