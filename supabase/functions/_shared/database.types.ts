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
      courses: {
        Row: {
          department: string | null
          id: string
          name: string | null
        }
        Insert: {
          department?: string | null
          id: string
          name?: string | null
        }
        Update: {
          department?: string | null
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_department_fkey"
            columns: ["department"]
            referencedRelation: "departments"
            referencedColumns: ["id"]
          }
        ]
      }
      departments: {
        Row: {
          id: string
          name: string | null
          university: string | null
        }
        Insert: {
          id: string
          name?: string | null
          university?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          university?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "departments_university_fkey"
            columns: ["university"]
            referencedRelation: "university"
            referencedColumns: ["id"]
          }
        ]
      }
      enrollments: {
        Row: {
          course: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          course?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          course?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_fkey"
            columns: ["course"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "uni_users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      post_types: {
        Row: {
          name: string
        }
        Insert: {
          name: string
        }
        Update: {
          name?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          content: string | null
          course: string | null
          date_posted: string | null
          department: string | null
          embedding: string | null
          id: string
          post_type: string | null
          subtitle: string | null
          title: string | null
          university: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          course?: string | null
          date_posted?: string | null
          department?: string | null
          embedding?: string | null
          id?: string
          post_type?: string | null
          subtitle?: string | null
          title?: string | null
          university?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          course?: string | null
          date_posted?: string | null
          department?: string | null
          embedding?: string | null
          id?: string
          post_type?: string | null
          subtitle?: string | null
          title?: string | null
          university?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_course_fkey"
            columns: ["course"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_department_fkey"
            columns: ["department"]
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_post_type_fkey"
            columns: ["post_type"]
            referencedRelation: "post_types"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "posts_university_fkey"
            columns: ["university"]
            referencedRelation: "university"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "uni_users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      uni_users: {
        Row: {
          bio: string | null
          email: string | null
          full_name: string | null
          is_first_time: boolean | null
          is_verified: boolean | null
          iss: string | null
          metadata: Json | null
          profile_pic: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          bio?: string | null
          email?: string | null
          full_name?: string | null
          is_first_time?: boolean | null
          is_verified?: boolean | null
          iss?: string | null
          metadata?: Json | null
          profile_pic?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          bio?: string | null
          email?: string | null
          full_name?: string | null
          is_first_time?: boolean | null
          is_verified?: boolean | null
          iss?: string | null
          metadata?: Json | null
          profile_pic?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "uni_users_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      university: {
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_post: {
        Args: {
          p_content: string
          p_title: string
          p_subtitle: string
          p_post_type: string
          p_content_embedding: string
          p_course: string
          p_department: string
          p_uni: string
          p_user_id: string
        }
        Returns: undefined
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
