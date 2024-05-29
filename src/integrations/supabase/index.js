import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

EventSignup // table: event_signups
    id: string (uuid)
    event_id: number
    name: string
    email: string
    created_at: string (timestamp without time zone)

Event // table: events
    id: number
    created_at: string (timestamp with time zone)
    name: string
    date: string (date)
    description: string
    venue_id: number
    is_pinned: boolean
    image_url: string
    pdf_url: string
    latitude: number
    longitude: number

Comment // table: comments
    id: number
    created_at: string (timestamp with time zone)
    content: string
    event_id: number

Venue // table: venues
    id: number
    name: string
    location: string
    description: string
    created_at: string (timestamp with time zone)
    updated_at: string (timestamp with time zone)
*/

// Hooks for EventSignup
export const useEventSignups = () => useQuery({
    queryKey: ['event_signups'],
    queryFn: () => fromSupabase(supabase.from('event_signups').select('*')),
});
export const useAddEventSignup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newSignup) => fromSupabase(supabase.from('event_signups').insert([newSignup])),
        onSuccess: () => {
            queryClient.invalidateQueries('event_signups');
        },
    });
};

export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('events').select('*')),
});
export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('events').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (event) => fromSupabase(supabase.from('events').update(event).eq('id', event.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

// Hooks for Comment
export const useComments = () => useQuery({
    queryKey: ['comments'],
    queryFn: () => fromSupabase(supabase.from('comments').select('*')),
});
export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newComment) => fromSupabase(supabase.from('comments').insert([newComment])),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

// Hooks for Venue
export const useVenues = () => useQuery({
    queryKey: ['venues'],
    queryFn: () => fromSupabase(supabase.from('venues').select('*')),
});
export const useAddVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newVenue) => fromSupabase(supabase.from('venues').insert([newVenue])),
        onSuccess: () => {
            queryClient.invalidateQueries('venues');
        },
    });
};

// Authentication hooks
export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ email, password }) => {
            const { error, user } = await supabase.auth.signIn({ email, password });
            if (error) throw new Error(error.message);
            return user;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        },
    });
};

export const useRegister = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ email, password }) => {
            const { error, user } = await supabase.auth.signUp({ email, password });
            if (error) throw new Error(error.message);
            return user;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) throw new Error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        },
    });
};

export const useSession = () => useQuery({
    queryKey: ['session'],
    queryFn: async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw new Error(error.message);
        return data.session;
    },
});