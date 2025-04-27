import { DeckDbSupabase } from "~/domain/repository/DeckDbSupabase"




export function useDeck() {
    return new DeckDbSupabase()
  }
  