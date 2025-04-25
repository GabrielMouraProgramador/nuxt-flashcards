import type { Card } from "../entities/Card";

export interface ApiResponse<T = any> {
    data?: T
    error?: string
    status?: number
}

export interface ICardRepository{
    createCard(card:Card): Promise<ApiResponse<{ id: string }>>
    updateCard(card:Card): Promise<ApiResponse>
    deleteCard(card_id: string): Promise<ApiResponse>
    updateDifficultyCard(card:Card): Promise<ApiResponse>
    getCardsToday(deck_id:string): Promise<ApiResponse<Card[]>>
    getCardsAlreadyStudied(deck_id:string): Promise<ApiResponse<Card[]>>
    getCardsByDeckId(deck_id:string): Promise<ApiResponse<Card[]>>
}  