import { Database } from '@/types/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';



export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies })
);

export async function getSession() {
  cookies().getAll()
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
      .select('*');

    const {data: user} =  await supabase
    .from('fundraisers')
    .select(`
      id,
      users (
        full_name
      )
    `)
    return {fundraisers, user};
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}


export async function getFundraisersByUserId(id: string) {
  const supabase = createServerSupabaseClient();
  try {
    const { data: fundraiser } = await supabase
      .from('fundraisers')
      .select('*')
      .eq('user', id)
    return fundraiser;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getFundraiserById(id: string) {
  const supabase = createServerSupabaseClient();
  try {
    const { data: fundraiser } = await supabase
      .from('fundraisers')
      .select('*')
      .eq('id', id)
      .single()
    return fundraiser;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getFundraiserBySlug(slug: string) {
  const supabase = createServerSupabaseClient();
  try {
    const { data: fundraiser } = await supabase
      .from('fundraisers')
      .select('*')
      .eq('slug', slug)
      .single()
    return fundraiser;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

