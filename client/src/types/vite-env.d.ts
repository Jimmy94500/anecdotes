/// <reference types="vite/client" />
// This provides types for the Vite-injected env variables on import.meta.env
// See https://vite.dev/guide/features.html#client-types

export type Anecdotes = {
  profilPicture: string;
  genre: string;
  created_at: string;
  pseudo: string;
  anecdoteProps: Anecdotes;
  key: number;
  id: number;
  title: string;
  content: string;
};

export type User = {
  id: number;
  pseudo: string;
  email: string;
  password: string;
  profilPicture: string;
};
