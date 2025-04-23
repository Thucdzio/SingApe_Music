export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      album_artists: {
        Row: {
          album_id: string
          artist_id: string
        }
        Insert: {
          album_id: string
          artist_id: string
        }
        Update: {
          album_id?: string
          artist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "album_artists_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "album_artists_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      albums: {
        Row: {
          cover_art_url: string | null
          created_at: string | null
          description: string | null
          id: string
          release_date: string | null
          title: string | null
        }
        Insert: {
          cover_art_url?: string | null
          created_at?: string | null
          description?: string | null
          id: string
          release_date?: string | null
          title?: string | null
        }
        Update: {
          cover_art_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          release_date?: string | null
          title?: string | null
        }
        Relationships: []
      }
      artists: {
        Row: {
          bio: string | null
          cover_art_url: string | null
          created_at: string | null
          id: string
          name: string | null
          user_id: string | null
        }
        Insert: {
          bio?: string | null
          cover_art_url?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Update: {
          bio?: string | null
          cover_art_url?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "artists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      followers: {
        Row: {
          artist_id: string
          followed_at: string | null
          user_id: string
        }
        Insert: {
          artist_id: string
          followed_at?: string | null
          user_id: string
        }
        Update: {
          artist_id?: string
          followed_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "followers_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "followers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      genres: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      liked_songs: {
        Row: {
          liked_at: string | null
          song_id: string
          user_id: string
        }
        Insert: {
          liked_at?: string | null
          song_id: string
          user_id: string
        }
        Update: {
          liked_at?: string | null
          song_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "liked_songs_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "liked_songs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      playlist_songs: {
        Row: {
          added_at: string | null
          playlist_id: string
          position: number | null
          song_id: string
        }
        Insert: {
          added_at?: string | null
          playlist_id: string
          position?: number | null
          song_id: string
        }
        Update: {
          added_at?: string | null
          playlist_id?: string
          position?: number | null
          song_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "playlist_songs_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_songs_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["id"]
          },
        ]
      }
      playlists: {
        Row: {
          cover_art_url: string | null
          created_at: string | null
          description: string | null
          id: string
          title: string | null
          user_id: string | null
        }
        Insert: {
          cover_art_url?: string | null
          created_at?: string | null
          description?: string | null
          id: string
          title?: string | null
          user_id?: string | null
        }
        Update: {
          cover_art_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "playlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      song_artists: {
        Row: {
          artist_id: string
          song_id: string
        }
        Insert: {
          artist_id: string
          song_id: string
        }
        Update: {
          artist_id?: string
          song_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "song_artists_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "song_artists_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["id"]
          },
        ]
      }
      song_genres: {
        Row: {
          genre_id: string
          song_id: string
        }
        Insert: {
          genre_id: string
          song_id: string
        }
        Update: {
          genre_id?: string
          song_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "song_genres_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "song_genres_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["id"]
          },
        ]
      }
      songs: {
        Row: {
          album_id: string | null
          cover_url: string | null
          created_at: string | null
          id: string
          title: string | null
          track_number: number | null
          url: string | null
        }
        Insert: {
          album_id?: string | null
          cover_url?: string | null
          created_at?: string | null
          id?: string
          title?: string | null
          track_number?: number | null
          url?: string | null
        }
        Update: {
          album_id?: string | null
          cover_url?: string | null
          created_at?: string | null
          id?: string
          title?: string | null
          track_number?: number | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "songs_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
