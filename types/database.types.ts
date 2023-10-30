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
          content: string
          created_at: string
          description: string
          id: string
          title: string
          updated_at: string
          user: string
        }
        Insert: {
          content: string
          created_at?: string
          description: string
          id?: string
          title: string
          updated_at?: string
          user?: string
        }
        Update: {
          content?: string
          created_at?: string
          description?: string
          id?: string
          title?: string
          updated_at?: string
          user?: string
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
