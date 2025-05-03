import { supabase } from "../supabase";

export interface Song {
  id: string;
  title: string | null;
  url: string | null;
  album_id: string | null;
  track_number: number | null;
  created_at: string | null;
  cover_url: string | null;
}

/**
 * Get all songs
 */
export async function getAllSongs(): Promise<Song[]> {
  try {
    console.log("Fetching all songs...");
    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .order("title");

    if (error) {
      console.error("Error fetching songs:", error);
      throw error;
    }

    console.log(`Songs fetched successfully. Count: ${data?.length || 0}`);
    return data || [];
  } catch (err) {
    console.error("Unexpected error in getAllSongs:", err);
    return [];
  }
}

/**
 * Get song by ID
 */
export async function getSongById(id: string): Promise<Song | null> {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching song with ID ${id}:`, error);
    throw error;
  }

  return data;
}

/**
 * Get songs by artist ID
 */
export async function getSongsByArtistId(artistId: string): Promise<Song[]> {
  try {
    console.log(`Fetching songs for artist ID: ${artistId}`);
    const { data, error } = await supabase
      .from("song_artists")
      .select("song_id")
      .eq("artist_id", artistId);

    if (error) {
      console.error(`Error fetching song IDs for artist ${artistId}:`, error);
      throw error;
    }

    const songIds = data.map((item) => item.song_id);
    console.log(`Found ${songIds.length} song IDs for artist ${artistId}`);

    if (songIds.length === 0) {
      return [];
    }

    const { data: songs, error: songsError } = await supabase
      .from("songs")
      .select("*")
      .in("id", songIds)
      .order("title");

    if (songsError) {
      console.error(`Error fetching songs for artist ${artistId}:`, songsError);
      throw songsError;
    }

    console.log(
      `Successfully fetched ${songs?.length || 0} songs for artist ${artistId}`
    );
    return songs || [];
  } catch (err) {
    console.error(
      `Unexpected error in getSongsByArtistId for artist ${artistId}:`,
      err
    );
    return [];
  }
}

/**
 * Get songs by album ID
 */
export async function getSongsByAlbumId(albumId: string): Promise<Song[]> {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("album_id", albumId)
    .order("track_number");

  if (error) {
    console.error(`Error fetching songs for album ${albumId}:`, error);
    throw error;
  }

  return data || [];
}
