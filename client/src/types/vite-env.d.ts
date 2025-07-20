/// <reference types="vite/client" />
// This provides types for the Vite-injected env variables on import.meta.env
// See https://vite.dev/guide/features.html#client-types

export type Anecdotes = {
  id: number;
  title: string;
  content: string;
};
