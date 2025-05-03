import { supabase } from "../supabase";

export interface Artist {
  id: string;
  name: string | null;
  bio: string | null;
  user_id: string | null;
  cover_art_url: string | null;
  created_at: string | null;
}

/**
 * Get all artists
 */
export async function getAllArtists(): Promise<Artist[]> {
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching artists:", error);
    throw error;
  }

  return data || [];
}

/**
 * Get artist by ID
 */
export async function getArtistById(id: string): Promise<Artist | null> {
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching artist with ID ${id}:`, error);
    throw error;
  }

  return data;
}

/**
 * Get artists for a specific song
 */
export async function getArtistsBySongId(songId: string): Promise<Artist[]> {
  const { data, error } = await supabase
    .from("song_artists")
    .select("artist_id")
    .eq("song_id", songId);

  if (error) {
    console.error(`Error fetching artist IDs for song ${songId}:`, error);
    throw error;
  }

  const artistIds = data.map((item) => item.artist_id);

  if (artistIds.length === 0) {
    return [];
  }

  const { data: artists, error: artistsError } = await supabase
    .from("artists")
    .select("*")
    .in("id", artistIds)
    .order("name");

  if (artistsError) {
    console.error(`Error fetching artists for song ${songId}:`, artistsError);
    throw artistsError;
  }

  return artists || [];
}
