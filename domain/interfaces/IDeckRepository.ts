import type { Deck } from "../entities/Deck";

export interface ApiResponse<T = any> {
    data?: T
    error?: string
    status?: number
}

export interface DeckDTO {
    id: string | null
    created_at: string | undefined
    name: string 
}
export interface IDeckRepository{
    createDeck(deck:Deck): Promise<ApiResponse<{ id: string }>>
    renameDeck(deck:Deck): Promise<ApiResponse>
    deleteDeck(deck_id:string): Promise<ApiResponse>
    getDeckById(deck_id:string): Promise<ApiResponse<DeckDTO[]>>
    getAllDecks(): Promise<ApiResponse<DeckDTO[]>>
}  