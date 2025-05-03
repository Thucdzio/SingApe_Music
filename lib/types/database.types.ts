export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      albums: {
        Row: {
          id: string;
          title: string | null;
          release_date: string | null;
          cover_art_url: string | null;
          description: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          title?: string | null;
          release_date?: string | null;
          cover_art_url?: string | null;
          description?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string | null;
          release_date?: string | null;
          cover_art_url?: string | null;
          description?: string | null;
          created_at?: string | null;
        };
      };
      album_artists: {
        Row: {
          album_id: string;
          artist_id: string;
        };
        Insert: {
          album_id: string;
          artist_id: string;
        };
        Update: {
          album_id?: string;
          artist_id?: string;
        };
      };
      artists: {
        Row: {
          id: string;
          name: string | null;
          bio: string | null;
          user_id: string | null;
          cover_art_url: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
          bio?: string | null;
          user_id?: string | null;
          cover_art_url?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          bio?: string | null;
          user_id?: string | null;
          cover_art_url?: string | null;
          created_at?: string | null;
        };
      };
      liked_songs: {
        Row: {
          user_id: string;
          song_id: string;
          liked_at: string;
        };
        Insert: {
          user_id: string;
          song_id: string;
          liked_at?: string;
        };
        Update: {
          user_id?: string;
          song_id?: string;
          liked_at?: string;
        };
      };
      playlists: {
        Row: {
          id: string;
          title: string | null;
          description: string | null;
          user_id: string | null;
          created_at: string | null;
          cover_art_url: string | null;
        };
        Insert: {
          id?: string;
          title?: string | null;
          description?: string | null;
          user_id?: string;
          created_at?: string;
          cover_art_url?: string | null;
        };
        Update: {
          id?: string;
          title?: string | null;
          description?: string | null;
          user_id?: string | null;
          created_at?: string | null;
          cover_art_url?: string | null;
        };
      };
      playlist_songs: {
        Row: {
          playlist_id: string;
          song_id: string;
          added_at: string;
          position: number;
        };
        Insert: {
          playlist_id: string;
          song_id: string;
          added_at?: string;
          position?: number;
        };
        Update: {
          playlist_id?: string;
          song_id?: string;
          added_at?: string;
          position?: number;
        };
      };
      songs: {
        Row: {
          id: string;
          title: string | null;
          url: string | null;
          album_id: string | null;
          track_number: number | null;
          created_at: string | null;
          cover_url: string | null;
        };
        Insert: {
          id?: string;
          title?: string | null;
          url?: string | null;
          album_id?: string | null;
          track_number?: number | null;
          created_at?: string | null;
          cover_url?: string | null;
        };
        Update: {
          id?: string;
          title?: string | null;
          url?: string | null;
          album_id?: string | null;
          track_number?: number | null;
          created_at?: string | null;
          cover_url?: string | null;
        };
      };
      song_artists: {
        Row: {
          song_id: string;
          artist_id: string;
        };
        Insert: {
          song_id: string;
          artist_id: string;
        };
        Update: {
          song_id?: string;
          artist_id?: string;
        };
      };
      song_genres: {
        Row: {
          song_id: string;
          genre_id: string;
        };
        Insert: {
          song_id: string;
          genre_id: string;
        };
        Update: {
          song_id?: string;
          genre_id?: string;
        };
      };
      genres: {
        Row: {
          id: string;
          name: string | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
        };
      };
      users: {
        Row: {
          id: string;
          created_at: string | null;
          display_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          email: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          email?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          email?: string | null;
        };
      };
      followers: {
        Row: {
          user_id: string;
          artist_id: string;
          followed_at: string;
        };
        Insert: {
          user_id: string;
          artist_id: string;
          followed_at?: string;
        };
        Update: {
          user_id?: string;
          artist_id?: string;
          followed_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
