import { CardsDbSupabase } from "~/domain/repository/CardsDbSupabase";



export function useCard() {
  return new CardsDbSupabase()
}
  