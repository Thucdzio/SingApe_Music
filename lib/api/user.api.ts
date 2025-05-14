import {
  supabase,
  User,
  UserInsert,
  UserUpdate,
  Song,
  Playlist,
} from "../supabase";

export const getUserById = async (id: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

export const getUserLikedSongs = async (userId: string): Promise<Song[]> => {
  const { data, error } = await supabase
    .from("liked_songs")
    .select("song_id, songs(*)")
    .eq("user_id", userId);
  if (error) throw error;
  return (data || []).map((row: any) => row.songs).filter(Boolean);
};

export const getUserPlaylists = async (userId: string): Promise<Playlist[]> => {
  const { data, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;
  return data || [];
};

export const createUser = async (user: UserInsert): Promise<User> => {
  const { data, error } = await supabase
    .from("users")
    .insert([user])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateUser = async (
  id: string,
  user: UserUpdate
): Promise<User> => {
  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from("users").delete().eq("id", id);
  if (error) throw error;
  return true;
};
