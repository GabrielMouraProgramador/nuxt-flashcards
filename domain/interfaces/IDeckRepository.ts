import type { Deck } from "../entities/Deck";

export interface ApiResponse<T = any> {
    data?: T
    error?: string
    status?: number
}

export interface IDeckRepository{
    createDeck(deck:Deck): Promise<ApiResponse<{ id: string }>>
    renameDeck(deck:Deck): Promise<ApiResponse>
    deleteDeck(deck_id:string): Promise<ApiResponse>
    getDeckById(deck_id:string): Promise<ApiResponse<Deck[]>>
    getAllDecks(): Promise<ApiResponse<Deck[]>>
}  