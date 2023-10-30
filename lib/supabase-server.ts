import { Database } from '@/types/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies })
);

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getUserDetails() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: userDetails } = await supabase
      .from('users')
      .select('*')
      .single();
    return userDetails;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getFundraisers() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: fundraisers } = await supabase
      .from('fundraisers')
      .select('*')
      .single();

    const {data: user} =  await supabase
    .from('fundraisers')
    .select(`
      full_name,
      users (
        user
      )
    `)
    return fundraisers;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

