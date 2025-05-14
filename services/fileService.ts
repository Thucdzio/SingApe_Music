import { MyTrack } from '@/types/zing.types';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Track } from 'react-native-track-player';

const HISTORY_FILE = FileSystem.documentDirectory + 'listeningHistory.json';

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

export async function saveListeningHistory(track: Track) {
  const historyFileUri = HISTORY_FILE;
  let history = [];

  try {
    const fileContent = await FileSystem.readAsStringAsync(historyFileUri);
    history = JSON.parse(fileContent);
  } catch (error) {
    console.log('No existing history file found, creating a new one.');
  }
  history = history.filter((item: any) => item.track.url !== track.url); 
  history.unshift({ track, timestamp: new Date().toISOString() });
  history = history.slice(0, 50);
  await FileSystem.writeAsStringAsync(historyFileUri, JSON.stringify(history));
}

export async function getListeningHistory(): Promise<Array<{ track: Track; timestamp: string }>> {
  try {
    const fileInfo = await FileSystem.getInfoAsync(HISTORY_FILE);
    if (!fileInfo.exists) return [];
    const raw = await FileSystem.readAsStringAsync(HISTORY_FILE, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading history:', e);
    return [];
  }
}