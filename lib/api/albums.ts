import { supabase } from "../supabase";

export interface Album {
  id: string;
  title: string | null;
  release_date: string | null;
  cover_art_url: string | null;
  description: string | null;
  created_at: string | null;
}

/**
 * Get all albums
 */
export async function getAllAlbums(): Promise<Album[]> {
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .order("title");

  if (error) {
    console.error("Error fetching albums:", error);
    throw error;
  }

  return data || [];
}

/**
 * Get album by ID
 */
export async function getAlbumById(id: string): Promise<Album | null> {
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching album with ID ${id}:`, error);
    throw error;
  }

  return data;
}

/**
 * Get albums by artist ID
 */
export async function getAlbumsByArtistId(artistId: string): Promise<Album[]> {
  const { data, error } = await supabase
    .from("album_artists")
    .select("album_id")
    .eq("artist_id", artistId);

  if (error) {
    console.error(`Error fetching album IDs for artist ${artistId}:`, error);
    throw error;
  }

  const albumIds = data.map((item) => item.album_id);

  if (albumIds.length === 0) {
    return [];
  }

  const { data: albums, error: albumsError } = await supabase
    .from("albums")
    .select("*")
    .in("id", albumIds)
    .order("release_date", { ascending: false });

  if (albumsError) {
    console.error(`Error fetching albums for artist ${artistId}:`, albumsError);
    throw albumsError;
  }

  return albums || [];
}
