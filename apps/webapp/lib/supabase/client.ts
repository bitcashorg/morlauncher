import { useMemo } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@repo/supabase'
import { appConfig } from '../config'

export function getSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

export function useSupabaseClient() {
  return useMemo(getSupabaseBrowserClient, [])
}
