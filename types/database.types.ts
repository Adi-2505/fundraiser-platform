export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          content: string | null
          created_at: string
          fundraiser_id: string
          id: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          fundraiser_id: string
          id?: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          fundraiser_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_fundraiser_id_fkey"
            columns: ["fundraiser_id"]
            isOneToOne: false
            referencedRelation: "fundraisers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      contributors: {
        Row: {
          amount: number
          created_at: string
          fundraiser_id: string
          id: string
          name: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          fundraiser_id: string
          id?: string
          name?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          fundraiser_id?: string
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contributors_fundraiser_id_fkey"
            columns: ["fundraiser_id"]
            isOneToOne: false
            referencedRelation: "fundraisers"
            referencedColumns: ["id"]
          }
        ]
      }
      fundraisers: {
        Row: {
          amount: number
          category: string | null
          content: string
          donors: number
          created_at: string
          description: string
          id: string
          image_url: string | null
          slug: string
          status: Database["public"]["Enums"]["status"]
          target: number
          title: string
          updated_at: string
          user: string
        }
        Insert: {
          amount?: number
          category?: string | null
          content: string
          donors?: number
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          slug: string
          status?: Database["public"]["Enums"]["status"]
          target?: number
          title: string
          updated_at?: string
          user?: string
        }
        Update: {
          amount?: number
          category?: string | null
          content?: string
          donors?: number
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["status"]
          target?: number
          title?: string
          updated_at?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "fundraisers_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
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
      status: "active" | "inactive"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}





export type FundraisersRow = Database["public"]["Tables"]["fundraisers"]["Row"]
export type usersRow = Database["public"]["Tables"]["users"]["Row"]
export type CommentsRow = Database["public"]["Tables"]["comments"]["Row"]