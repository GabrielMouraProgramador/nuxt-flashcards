import { StorageSupabase } from "~/domain/repository/StorageSupabase";


export function useStorage() {
  return new StorageSupabase()
}