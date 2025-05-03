import { supabase } from "../supabase";
import { Song } from "./songs";

export interface LikedSong {
  user_id: string;
  song_id: string;
  liked_at: string;
}

/**
 * Get all liked songs for a user
 */
export async function getLikedSongs(userId: string): Promise<Song[]> {
  // First get all the song IDs that the user has liked
  const { data: likedData, error: likedError } = await supabase
    .from("liked_songs")
    .select("song_id, liked_at")
    .eq("user_id", userId)
    .order("liked_at", { ascending: false });

  if (likedError) {
    console.error(`Error fetching liked songs for user ${userId}:`, likedError);
    throw likedError;
  }

  if (!likedData || likedData.length === 0) {
    return [];
  }

  const songIds = likedData.map((item) => item.song_id);

  // Then fetch the actual song data
  const { data: songs, error: songsError } = await supabase
    .from("songs")
    .select("*")
    .in("id", songIds);

  if (songsError) {
    console.error(`Error fetching song details for liked songs:`, songsError);
    throw songsError;
  }

  // Sort the songs to match the order of the liked songs
  const songMap = new Map(songs.map((song) => [song.id, song]));
  return songIds.map((id) => songMap.get(id)).filter(Boolean) as Song[];
}

/**
 * Like a song for a user
 */
export async function likeSong(userId: string, songId: string): Promise<void> {
  // Check if song exists first
  const { data: songData, error: songError } = await supabase
    .from("songs")
    .select("id")
    .eq("id", songId)
    .single();

  if (songError || !songData) {
    console.error(`Error: Song with ID ${songId} not found`, songError);
    throw new Error(`Song with ID ${songId} not found`);
  }

  // Check if already liked to avoid duplicate entries
  const { data: existingLike, error: likeCheckError } = await supabase
    .from("liked_songs")
    .select("*")
    .eq("user_id", userId)
    .eq("song_id", songId)
    .maybeSingle();

  if (likeCheckError) {
    console.error("Error checking existing like:", likeCheckError);
    throw likeCheckError;
  }

  // If already liked, just return
  if (existingLike) {
    return;
  }

  // Insert the new like
  const { error } = await supabase.from("liked_songs").insert({
    user_id: userId,
    song_id: songId,
    liked_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Error liking song:", error);
    throw error;
  }
}

/**
 * Unlike a song for a user
 */
export async function unlikeSong(
  userId: string,
  songId: string
): Promise<void> {
  const { error } = await supabase
    .from("liked_songs")
    .delete()
    .eq("user_id", userId)
    .eq("song_id", songId);

  if (error) {
    console.error("Error unliking song:", error);
    throw error;
  }
}

/**
 * Check if a song is liked by a user
 */
export async function isLikedByUser(
  userId: string,
  songId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("liked_songs")
    .select("*")
    .eq("user_id", userId)
    .eq("song_id", songId)
    .maybeSingle();

  if (error) {
    console.error("Error checking if song is liked:", error);
    throw error;
  }

  return !!data;
}
