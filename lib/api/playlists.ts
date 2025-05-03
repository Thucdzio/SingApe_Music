import { supabase } from "../supabase";
import { Song } from "./songs";
import { Database } from "../types/database.types";

export interface Playlist {
  id: string;
  title: string | null;
  description: string | null;
  user_id: string | null;
  created_at: string | null;
  cover_art_url: string | null;
}

export interface PlaylistSong {
  playlist_id: string;
  song_id: string;
  added_at: string;
  position: number;
}

// Hàm tạo UUID chuẩn cho Supabase
function generateUUID(): string {
  // Tạo UUID v4 (random) theo định dạng: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  // trong đó x là chữ số hex ngẫu nhiên và y là chữ số trong phạm vi 8-B

  // Tạo các số ngẫu nhiên dưới dạng 16 bytes
  const bytes = new Array(16);
  for (let i = 0; i < 16; i++) {
    bytes[i] = Math.floor(Math.random() * 256);
  }

  // Đặt phiên bản UUID v4
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant RFC4122

  // Chuyển đổi bytes thành định dạng UUID
  let result = "";
  const hexChars = "0123456789abcdef";
  for (let i = 0; i < 16; i++) {
    result += hexChars[(bytes[i] >> 4) & 0x0f];
    result += hexChars[bytes[i] & 0x0f];
    if (i === 3 || i === 5 || i === 7 || i === 9) {
      result += "-";
    }
  }

  return result;
}

/**
 * Get all playlists for a user
 */
export async function getUserPlaylists(userId: string): Promise<Playlist[]> {
  const { data, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching playlists for user ${userId}:`, error);
    throw error;
  }

  return data || [];
}

/**
 * Get a playlist by ID
 */
export async function getPlaylistById(id: string): Promise<Playlist | null> {
  const { data, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching playlist with ID ${id}:`, error);
    throw error;
  }

  return data;
}

/**
 * Create a new playlist
 */
export async function createPlaylist(
  userId: string,
  title: string,
  description?: string,
  coverArtUrl?: string
): Promise<Playlist> {
  const newPlaylistId = generateUUID();

  const { data, error } = await supabase
    .from("playlists")
    .insert({
      id: newPlaylistId,
      title,
      description,
      user_id: userId,
      created_at: new Date().toISOString(),
      cover_art_url: coverArtUrl,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating playlist:", error);
    throw error;
  }

  return data;
}

/**
 * Get songs in a playlist
 */
export async function getPlaylistSongs(playlistId: string): Promise<Song[]> {
  const { data, error } = await supabase
    .from("playlist_songs")
    .select("song_id, position, added_at")
    .eq("playlist_id", playlistId)
    .order("position");

  if (error) {
    console.error(`Error fetching songs for playlist ${playlistId}:`, error);
    throw error;
  }

  if (!data || data.length === 0) {
    return [];
  }

  const songIds = data.map((item) => item.song_id);

  const { data: songs, error: songsError } = await supabase
    .from("songs")
    .select("*")
    .in("id", songIds);

  if (songsError) {
    console.error(`Error fetching song details for playlist:`, songsError);
    throw songsError;
  }

  // Arrange songs in the same order as the playlist
  const songMap = new Map(songs.map((song) => [song.id, song]));
  return data
    .map((item) => songMap.get(item.song_id))
    .filter(Boolean) as Song[];
}

/**
 * Add a song to a playlist
 */
export async function addSongToPlaylist(
  playlistId: string,
  songId: string,
  position?: number
): Promise<void> {
  // First, check if the song is already in the playlist
  const { data: existingSong, error: checkError } = await supabase
    .from("playlist_songs")
    .select("*")
    .eq("playlist_id", playlistId)
    .eq("song_id", songId)
    .maybeSingle();

  if (checkError) {
    console.error("Error checking if song is already in playlist:", checkError);
    throw checkError;
  }

  if (existingSong) {
    console.log("Song is already in this playlist");
    return;
  }

  // If no position specified, add to the end
  if (position === undefined) {
    // Get the current highest position
    const { data: maxPositionData, error: maxPositionError } = await supabase
      .from("playlist_songs")
      .select("position")
      .eq("playlist_id", playlistId)
      .order("position", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (maxPositionError) {
      console.error("Error getting max position:", maxPositionError);
      throw maxPositionError;
    }

    position =
      maxPositionData && maxPositionData.position !== null
        ? maxPositionData.position + 1
        : 0;
  }

  // Insert the song into the playlist
  const { error } = await supabase.from("playlist_songs").insert({
    playlist_id: playlistId,
    song_id: songId,
    position,
    added_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Error adding song to playlist:", error);
    throw error;
  }
}

/**
 * Remove a song from a playlist
 */
export async function removeSongFromPlaylist(
  playlistId: string,
  songId: string
): Promise<void> {
  const { error } = await supabase
    .from("playlist_songs")
    .delete()
    .eq("playlist_id", playlistId)
    .eq("song_id", songId);

  if (error) {
    console.error("Error removing song from playlist:", error);
    throw error;
  }
}
