export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  discord: {
    Tables: {
      embed: {
        Row: {
          author_icon_url: string | null
          author_name: string | null
          author_proxy_icon_url: string | null
          author_url: string | null
          channel_id: string
          color: number | null
          created_at: string
          description: string | null
          fields: Json | null
          footer_icon_url: string | null
          footer_proxy_icon_url: string | null
          footer_text: string | null
          id: string
          image_height: number | null
          image_proxy_url: string | null
          image_url: string | null
          image_width: number | null
          message_id: string | null
          name: string
          provider_name: string | null
          provider_url: string | null
          thumbnail_height: number | null
          thumbnail_proxy_url: string | null
          thumbnail_url: string | null
          thumbnail_width: number | null
          timestamp: string | null
          title: string | null
          updated_at: string
          url: string | null
          video_height: number | null
          video_proxy_url: string | null
          video_url: string | null
          video_width: number | null
        }
        Insert: {
          author_icon_url?: string | null
          author_name?: string | null
          author_proxy_icon_url?: string | null
          author_url?: string | null
          channel_id: string
          color?: number | null
          created_at?: string
          description?: string | null
          fields?: Json | null
          footer_icon_url?: string | null
          footer_proxy_icon_url?: string | null
          footer_text?: string | null
          id?: string
          image_height?: number | null
          image_proxy_url?: string | null
          image_url?: string | null
          image_width?: number | null
          message_id?: string | null
          name?: string
          provider_name?: string | null
          provider_url?: string | null
          thumbnail_height?: number | null
          thumbnail_proxy_url?: string | null
          thumbnail_url?: string | null
          thumbnail_width?: number | null
          timestamp?: string | null
          title?: string | null
          updated_at?: string
          url?: string | null
          video_height?: number | null
          video_proxy_url?: string | null
          video_url?: string | null
          video_width?: number | null
        }
        Update: {
          author_icon_url?: string | null
          author_name?: string | null
          author_proxy_icon_url?: string | null
          author_url?: string | null
          channel_id?: string
          color?: number | null
          created_at?: string
          description?: string | null
          fields?: Json | null
          footer_icon_url?: string | null
          footer_proxy_icon_url?: string | null
          footer_text?: string | null
          id?: string
          image_height?: number | null
          image_proxy_url?: string | null
          image_url?: string | null
          image_width?: number | null
          message_id?: string | null
          name?: string
          provider_name?: string | null
          provider_url?: string | null
          thumbnail_height?: number | null
          thumbnail_proxy_url?: string | null
          thumbnail_url?: string | null
          thumbnail_width?: number | null
          timestamp?: string | null
          title?: string | null
          updated_at?: string
          url?: string | null
          video_height?: number | null
          video_proxy_url?: string | null
          video_url?: string | null
          video_width?: number | null
        }
        Relationships: []
      }
      log: {
        Row: {
          category: string
          context: Json | null
          id: string
          level: string
          message: string
          timestamp: string
        }
        Insert: {
          category: string
          context?: Json | null
          id?: string
          level: string
          message: string
          timestamp: string
        }
        Update: {
          category?: string
          context?: Json | null
          id?: string
          level?: string
          message?: string
          timestamp?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
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
  public: {
    Tables: {
      profile: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_username_fkey"
            columns: ["id", "username"]
            isOneToOne: false
            referencedRelation: "account"
            referencedColumns: ["id", "username"]
          },
          {
            foreignKeyName: "profile_id_username_fkey"
            columns: ["id", "username"]
            isOneToOne: false
            referencedRelation: "account_view"
            referencedColumns: ["id", "username"]
          }
        ]
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

