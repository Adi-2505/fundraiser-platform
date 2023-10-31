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
      fundraisers: {
        Row: {
          amount: number
          content: string
          created_at: string
          description: string
          id: string
          target: number
          title: string
          updated_at: string
          user: string
        }
        Insert: {
          amount?: number
          content: string
          created_at?: string
          description: string
          id?: string
          target?: number
          title: string
          updated_at?: string
          user?: string
        }
        Update: {
          amount?: number
          content?: string
          created_at?: string
          description?: string
          id?: string
          target?: number
          title?: string
          updated_at?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "fundraisers_user_fkey"
            columns: ["user"]
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}


export type FundraisersRow = Database["public"]["Tables"]["fundraisers"]["Row"]
export type usersRow = Database["public"]["Tables"]["users"]["Row"]