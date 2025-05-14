import { supabase, Song } from "../supabase";

export type Genre = {
  id: string;
  name: string | null;
};

export const getAllGenres = async (): Promise<Genre[]> => {
  const { data, error } = await supabase.from("genres").select("*");
  if (error) throw error;
  return data || [];
};

export const getGenreById = async (id: string): Promise<Genre | null> => {
  const { data, error } = await supabase
    .from("genres")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

export const getSongsByGenreId = async (genreId: string): Promise<Song[]> => {
  const { data, error } = await supabase
    .from("song_genres")
    .select("song_id, songs(*)")
    .eq("genre_id", genreId);
  if (error) throw error;
  return (data || []).map((row: any) => row.songs).filter(Boolean);
};
